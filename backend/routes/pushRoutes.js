const express = require("express");
const router = express.Router();
const { notifyDadDevices } = require("../utils/notifyDevices");

router.post("/test", async (req, res) => {
  try {
    await notifyDadDevices(
      "Test notification",
      "Push notifications are working."
    );

    res.status(200).json({ message: "Test push sent." });
  } catch (error) {
    console.error("Test push error:", error);
    res.status(500).json({ message: "Failed to send test push." });
  }
});

module.exports = router;