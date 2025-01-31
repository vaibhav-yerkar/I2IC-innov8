import express from "express";
import StudentRegistration from "../models/studentRegistrationSchema.js";
import mongoose from "mongoose";
import { Event } from "../models/Event.js";

const router = express.Router();
// POST route to handle student registration
router.post("/register", async (req, res) => {
  try {
    const { eventId, name, phone, email, department, academicYear, userId } =
      req.body;
    // Validate required fields
    console.log("Request Body:", req.body);
    if (!eventId || !name || !phone || !email || !department || !academicYear) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Save data in MongoDB
    const newRegistration = new StudentRegistration({
      eventId,
      name,
      phone,
      email,
      department,
      academicYear,
    });

    await newRegistration.save();

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        $inc: { attending: 1 },
        $addToSet: {
          registeredUsers: {
            userId: userId,
            registrationId: newRegistration._id,
          },
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      message: "Registration successful!",
      registration: newRegistration,
      event: updatedEvent,
    });
  } catch (error) {
    console.error("Error registering student:", error);
    res.status(500).json({ message: "Server error, please try again." });
  }
});

// Add unregister route
router.post("/unregister", async (req, res) => {
  try {
    const { eventId, userId } = req.body;

    const event = await Event.findById(eventId);
    const registration = event.registeredUsers.find(
      (reg) => reg.userId === userId
    );

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    // Remove registration and update counts
    await Event.findByIdAndUpdate(eventId, {
      $inc: { attending: -1 },
      $pull: { registeredUsers: { userId } },
    });

    // Delete registration record
    await StudentRegistration.findByIdAndDelete(registration.registrationId);

    res.status(200).json({ message: "Unregistered successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
