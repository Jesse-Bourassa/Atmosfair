const express = require("express");
const router = express.Router();
const { notifyDadDevices } = require("../utils/notifyDevices");

router.post("/test", async (req, res) => {
  try {
    const fakeSchedule = {
      name: "Test Client",
      type: "repair",
      date: "2026-03-20",
      time: "10:00",
    };

    await notifyDadDevices(fakeSchedule);

    res.status(200).json({ message: "Test push sent." });
  } catch (error) {
    console.error("Test push error:", error);
    res.status(500).json({ message: "Failed to send test push." });
  }
});

module.exports = router;