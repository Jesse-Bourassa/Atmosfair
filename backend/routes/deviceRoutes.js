const express = require("express");
const router = express.Router();
const DeviceToken = require("../models/DeviceToken");

function normalizeLanguage(language) {
  return language === "en" ? "en" : "fr";
}

router.post("/register", async (req, res) => {
  try {
    const { token, platform, userId, language } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Device token is required." });
    }

    const saved = await DeviceToken.findOneAndUpdate(
      { token },
      {
        token,
        platform: platform || "ios",
        userId: userId || "dad",
        language: normalizeLanguage(language),
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      message: "Device token registered successfully.",
      device: saved,
    });
  } catch (error) {
    console.error("Device registration error:", error);
    res.status(500).json({ message: "Failed to register device token." });
  }
});

module.exports = router;