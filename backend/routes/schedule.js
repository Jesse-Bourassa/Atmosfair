const express  = require("express");
const Schedule = require("../models/Schedule");
const router   = express.Router();

/* ───── Config ───── */
const SERVICE_DURATIONS = {
  repair:       3,   // hrs
  maintenance:  3,
  installation: 8
};

/* ───── Helpers ───── */
// “09:30 AM” → “09:30”   |   “12:00 PM” → “12:00”   |   “12:00 AM” → “00:00”
function to24(t12) {
  const [hm, ampm] = t12.split(" ");
  let [h, m] = hm.split(":");
  if (ampm === "PM" && h !== "12") h = (+h + 12).toString().padStart(2, "0");
  if (ampm === "AM" && h === "12") h = "00";
  return `${h}:${m}`;
}
const toDate   = (date, hhmm) => new Date(`${date}T${hhmm}:00`);
const overlap  = (aStart, aEnd, bStart, bEnd) => aStart < bEnd && aEnd > bStart;

/* ───── POST /api/schedule ───── */
router.post("/", async (req, res) => {
  const { userId, type, date, time } = req.body;
  if (!userId || !type || !date || !time)
    return res.status(400).json({ message: "Missing required fields" });

  const duration = SERVICE_DURATIONS[type];
  if (!duration) return res.status(400).json({ message: "Invalid service type" });

  try {
    const start24 = to24(time);                 // e.g. “09:30”
    const startDT = toDate(date, start24);
    const endDT   = new Date(startDT);
    endDT.setHours(endDT.getHours() + duration);

    /* pull day's bookings and test overlap */
    const sameDay = await Schedule.find({ date });

    const conflict = sameDay.some(b => {
      const bStartDT = toDate(date, b.time);        // b.time already 24‑h
      const bEndDT   = new Date(bStartDT);
      bEndDT.setHours(bEndDT.getHours() + b.duration);
      return overlap(startDT, endDT, bStartDT, bEndDT);
    });

    if (conflict)
      return res.status(409).json({ message: "This time slot is already booked" });

    /* save */
    const newSchedule = await Schedule.create({
      userId,
      type,
      date,
      time: start24,
      duration
    });

    res.status(201).json({ message: "Appointment booked", schedule: newSchedule });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ───── GET /api/schedule/available-slots ───── */
router.get("/available-slots", async (req, res) => {
  const { date, type } = req.query;
  if (!date || !type)   return res.status(400).json({ message: "Date and type are required" });

  const duration = SERVICE_DURATIONS[type];
  if (!duration) return res.status(400).json({ message: "Invalid service type" });

  const slots12 = [
    "09:00 AM","09:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM",
    "12:00 PM","12:30 PM","1:00 PM","1:30 PM","2:00 PM","2:30 PM",
    "3:00 PM","3:30 PM","4:00 PM","4:30 PM","5:00 PM"
  ];

  try {
    const booked = await Schedule.find({ date });

    /* build available list */
    const available = slots12.filter(s12 => {
      const s24   = to24(s12);
      const sDT   = toDate(date, s24);
      const sEnd  = new Date(sDT);
      sEnd.setHours(sEnd.getHours() + duration);

      return !booked.some(b => {
        const bStart = toDate(date, b.time);
        const bEnd   = new Date(bStart);
        bEnd.setHours(bEnd.getHours() + b.duration);
        return overlap(sDT, sEnd, bStart, bEnd);
      });
    });

    res.status(200).json(available);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/", async (req, res) => {
  try {
    // ▸ tweak query / sorting to suit your UI
    const schedules = await Schedule.find().sort({ date: 1, time: 1 });
    res.json(schedules);           // 200 OK, JSON array
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ───── GET /api/schedule/:id ───── */
router.get("/", async (req, res) => {
  const { userId } = req.query;
  const filter = userId ? { userId } : {};
  try {
    const schedules = await Schedule.find(filter).sort({ date: 1, time: 1 });
    res.json(schedules);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
