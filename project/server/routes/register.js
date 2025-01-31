import express from 'express';
import StudentRegistration from '../models/studentRegistrationSchema.js';


const router = express.Router();
// POST route to handle student registration
router.post("/register", async (req, res) => {
  try {
    const { eventId, name, phone, email, department, academicYear } = req.body;
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

    res.status(200).json({ message: "Registration successful!" });
  } catch (error) {
    console.error("Error registering student:", error);
    res.status(500).json({ message: "Server error, please try again." });
  }
});


export default router;