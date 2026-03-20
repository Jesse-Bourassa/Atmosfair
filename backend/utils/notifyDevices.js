const DeviceToken = require("../models/DeviceToken");
const { sendPush } = require("./sendPush");

const SERVICE_LABELS = {
  en: {
    repair: "repair",
    maintenance: "maintenance",
    installation: "installation",
  },
  fr: {
    repair: "réparation",
    maintenance: "entretien",
    installation: "installation",
  },
};

function normalizeLanguage(language) {
  return language === "en" ? "en" : "fr";
}

function getServiceLabel(type, language) {
  return SERVICE_LABELS[language]?.[type] || type;
}

function buildPushNotification(schedule, language) {
  const lang = normalizeLanguage(language);
  const serviceLabel = getServiceLabel(schedule.type, lang);

  if (lang === "fr") {
    return {
      title: "Nouvelle demande de service 🔧",
      body: `${schedule.name} a réservé une ${serviceLabel} le ${schedule.date} à ${schedule.time}`,
    };
  }

  return {
    title: "New Service Request 🔧",
    body: `${schedule.name} booked a ${serviceLabel} on ${schedule.date} at ${schedule.time}`,
  };
}

async function notifyDadDevices(schedule) {
  const devices = await DeviceToken.find({ platform: "ios" });

  for (const device of devices) {
    try {
      const notification = buildPushNotification(schedule, device.language);
      await sendPush(device.token, notification.title, notification.body);
    } catch (error) {
      console.error(`Failed to send push to device ${device.token}:`, error.message);
    }
  }
}

module.exports = { notifyDadDevices };