const mongoose = require("mongoose");

const DeviceTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    platform: {
      type: String,
      enum: ["ios"],
      default: "ios",
    },
    userId: {
      type: String,
      default: "dad",
      trim: true,
    },
    language: {
      type: String,
      enum: ["en", "fr"],
      default: "fr",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DeviceToken", DeviceTokenSchema);