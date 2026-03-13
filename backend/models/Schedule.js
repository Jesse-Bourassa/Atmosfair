const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    notes: { type: String, default: "", trim: true },

    type: { type: String, required: true }, // repair | maintenance | installation
    equipmentType: { type: String, default: "", trim: true },

    date: { type: String, required: true }, // YYYY-MM-DD
    time: { type: String, required: true }, // 24h format: HH:mm
    duration: { type: Number, required: true },

    status: {
      type: String,
      enum: ["new", "confirmed", "completed", "cancelled"],
      default: "new",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Schedule", scheduleSchema);