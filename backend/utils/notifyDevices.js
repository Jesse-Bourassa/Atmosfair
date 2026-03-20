const DeviceToken = require("../models/DeviceToken");
const { sendPush } = require("./sendPush");

async function notifyDadDevices(title, body) {
  const devices = await DeviceToken.find({ userId: "dad", platform: "ios" });

  for (const device of devices) {
    try {
      await sendPush(device.token, title, body);
    } catch (error) {
      console.error(`Failed to send push to device ${device.token}:`, error.message);
    }
  }
}

module.exports = { notifyDadDevices };