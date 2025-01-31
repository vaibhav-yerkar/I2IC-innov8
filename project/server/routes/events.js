import express from "express";
import { Event } from "../models/Event.js";

export const router = express.Router();

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find()
      .populate("proposedBy")
      .select(
        "title eventType location description startDate startTime attending registeredUsers"
      );
    if (!events) {
      return res.status(404).json({ message: "No events found" });
    }
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new event
router.post("/", async (req, res) => {
  let event = new Event(req.body);
  event.attending = 0;
  console.log(event);
  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.log(error);
    res.status(402).json({ message: error.message });
  }
});

// Get event by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).select(
      "title startDate startTime location description attending registeredUsers"
    );
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// RSVP to an event
router.post("/:id/rsvp", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const participantIndex = event.participants.findIndex(
      (p) => p.user.toString() === req.body.userId
    );

    if (participantIndex > -1) {
      event.participants[participantIndex].status = req.body.status;
    } else {
      event.participants.push({
        user: req.body.userId,
        status: req.body.status,
      });
    }

    await event.save();
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
export default router;
