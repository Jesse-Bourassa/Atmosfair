const apn = require("apn");

let apnProvider = null;

function getProvider() {
  if (!apnProvider) {
    apnProvider = new apn.Provider({
      token: {
        key: process.env.APN_KEY_PATH,
        keyId: process.env.APN_KEY_ID,
        teamId: process.env.APN_TEAM_ID,
      },
      production: false,
    });
  }
  return apnProvider;
}

async function sendPush(deviceToken, title, body) {
  const note = new apn.Notification();

  note.alert = {
    title,
    body,
  };

  note.sound = "default";
  note.topic = process.env.APN_BUNDLE_ID;

  const result = await getProvider().send(note, deviceToken);
  console.log("APNs result:", JSON.stringify(result, null, 2));
  return result;
}

module.exports = { sendPush };