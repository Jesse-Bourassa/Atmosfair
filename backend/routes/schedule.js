const express = require("express");
const Schedule = require("../models/Schedule");
const router = express.Router();
const sendBookingConfirmation = require("../utils/sendEmail");
const { notifyDadDevices } = require("../utils/notifyDevices");
/* ───── Config ───── */
const SERVICE_DURATIONS = {
  repair: 3,        // hours
  maintenance: 3,
  installation: 8,
};

/* ───── Helpers ───── */
// "09:30 AM" -> "09:30"
// "12:00 PM" -> "12:00"
// "12:00 AM" -> "00:00"
function to24(t12) {
  const [hm, ampm] = t12.split(" ");
  let [h, m] = hm.split(":");

  if (ampm === "PM" && h !== "12") h = (+h + 12).toString().padStart(2, "0");
  if (ampm === "AM" && h === "12") h = "00";

  return `${h}:${m}`;
}

const toDate = (date, hhmm) => new Date(`${date}T${hhmm}:00`);
const overlap = (aStart, aEnd, bStart, bEnd) => aStart < bEnd && aEnd > bStart;

/* ───── POST /api/schedule ───── */
router.post("/", async (req, res) => {
  const {
    name,
    phone,
    email,
    address,
    notes,
    type,
    equipmentType,
    date,
    time,
  } = req.body;

  if (!name || !phone || !email || !address || !type || !date || !time) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const duration = SERVICE_DURATIONS[type];
  if (!duration) {
    return res.status(400).json({ message: "Invalid service type" });
  }

  try {
    const start24 = time.includes("AM") || time.includes("PM") ? to24(time) : time;
    const startDT = toDate(date, start24);
    const endDT = new Date(startDT);
    endDT.setHours(endDT.getHours() + duration);

    const sameDay = await Schedule.find({ date });

    const conflict = sameDay.some((booking) => {
      const bookingStartDT = toDate(date, booking.time);
      const bookingEndDT = new Date(bookingStartDT);
      bookingEndDT.setHours(bookingEndDT.getHours() + booking.duration);

      return overlap(startDT, endDT, bookingStartDT, bookingEndDT);
    });

    if (conflict) {
      return res
        .status(409)
        .json({ message: "This time slot is already booked" });
    }

    const newSchedule = await Schedule.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
      notes: notes ? notes.trim() : "",
      type,
      equipmentType: equipmentType ? equipmentType.trim() : "",
      date,
      time: start24,
      duration,
      status: "new",
    });

    try {
  await sendBookingConfirmation(newSchedule);
} catch (emailErr) {
  console.error("Booking confirmation email failed:", emailErr);
}

    try {
      await notifyDadDevices(
        "New Service Request 🔧",
        `${newSchedule.name} booked ${newSchedule.type} on ${newSchedule.date} at ${newSchedule.time}`
      );
    } catch (pushErr) {
      console.error("Push notification failed:", pushErr);
    }

    res.status(201).json({
      message: "Appointment booked",
      schedule: newSchedule,
    });
  } catch (err) {
    console.error("POST /api/schedule error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ───── GET /api/schedule/available-slots ───── */
router.get("/available-slots", async (req, res) => {
  const { date, type } = req.query;

  if (!date || !type) {
    return res.status(400).json({ message: "Date and type are required" });
  }

  const duration = SERVICE_DURATIONS[type];
  if (!duration) {
    return res.status(400).json({ message: "Invalid service type" });
  }

  const slots12 = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
  ];

  try {
    const booked = await Schedule.find({ date });

    const available = slots12.filter((slot12) => {
      const slot24 = to24(slot12);
      const slotStartDT = toDate(date, slot24);
      const slotEndDT = new Date(slotStartDT);
      slotEndDT.setHours(slotEndDT.getHours() + duration);

      return !booked.some((booking) => {
        const bookingStartDT = toDate(date, booking.time);
        const bookingEndDT = new Date(bookingStartDT);
        bookingEndDT.setHours(bookingEndDT.getHours() + booking.duration);

        return overlap(slotStartDT, slotEndDT, bookingStartDT, bookingEndDT);
      });
    });

    res.status(200).json(available);
  } catch (err) {
    console.error("GET /available-slots error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ───── GET /api/schedule ───── */
router.get("/", async (req, res) => {
  try {
    const { status, type } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;

    const schedules = await Schedule.find(filter).sort({ date: 1, time: 1 });
    res.json(schedules);
  } catch (err) {
    console.error("GET /api/schedule error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ───── GET /api/schedule/:id ───── */
router.get("/:id", async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);

    if (!schedule) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(schedule);
  } catch (err) {
    console.error("GET /api/schedule/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;