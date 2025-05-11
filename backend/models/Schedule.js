const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true }, // e.g. HVAC, Heat Pump
  date: { type: String, required: true }, // format: YYYY-MM-DD
  time: { type: String, required: true }, // format: "1:30 PM"
  duration: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Schedule", scheduleSchema);