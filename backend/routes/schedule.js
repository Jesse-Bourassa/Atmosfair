const express = require("express");
const Schedule = require("../models/Schedule");

const router = express.Router();

// POST /api/schedule — book appointment
router.post("/", async (req, res) => {
  const { userId, type, date, time } = req.body;

  if (!userId || !type || !date || !time)
    return res.status(400).json({ message: "Missing required fields" });

  try {
    const exists = await Schedule.findOne({ date, time });
    if (exists)
      return res.status(409).json({ message: "This time slot is already booked" });

    const newSchedule = new Schedule({ userId, type, date, time });
    await newSchedule.save();

    res.status(201).json({ message: "Appointment booked", schedule: newSchedule });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/schedule?date=YYYY-MM-DD — check booked slots
router.get("/", async (req, res) => {
    const { date } = req.query;
  
    try {
      let query = {};
      if (date) {
        query.date = date;
      }
  
      const booked = await Schedule.find(query);
      res.status(200).json(booked);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports = router;