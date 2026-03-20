const mongoose = require("mongoose");

const DeviceTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    platform: {
      type: String,
      enum: ["ios"],
      default: "ios",
    },
    userId: {
      type: String,
      default: "dad",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DeviceToken", DeviceTokenSchema);