const { Resend } = require("resend");

const SERVICE_LABELS = {
  en: {
    repair: "Repair",
    maintenance: "Maintenance",
    installation: "Installation",
  },
  fr: {
    repair: "Réparation",
    maintenance: "Entretien",
    installation: "Installation",
  },
};

function getServiceLabel(type, lang) {
  return SERVICE_LABELS[lang]?.[type] || type;
}

const sendBookingConfirmation = async (booking) => {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is missing");
      return;
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const lang = booking.language === "fr" ? "fr" : "en";
    const serviceLabel = getServiceLabel(booking.type, lang);

    const subject =
      lang === "fr"
        ? "Votre demande de service a été reçue"
        : "Your service request was received";

    const html =
      lang === "fr"
        ? `
        <h2>Merci d'avoir choisi Atmosf'air</h2>

        <p>Nous avons bien reçu votre demande de service.</p>

        <h3>Détails de la demande</h3>

        <p><b>Nom:</b> ${booking.name}</p>
        <p><b>Service:</b> ${serviceLabel}</p>
        <p><b>Équipement:</b> ${booking.equipmentType}</p>
        <p><b>Date:</b> ${booking.date}</p>
        <p><b>Heure:</b> ${booking.time}</p>

        <p>Nous vous contacterons sous peu pour confirmer le rendez-vous.</p>

        <p>Merci,<br/>Atmosf'air</p>
      `
        : `
        <h2>Thank you for choosing Atmosf'air</h2>

        <p>We received your service request.</p>

        <h3>Request Details</h3>

        <p><b>Name:</b> ${booking.name}</p>
        <p><b>Service:</b> ${serviceLabel}</p>
        <p><b>Equipment:</b> ${booking.equipmentType}</p>
        <p><b>Date:</b> ${booking.date}</p>
        <p><b>Time:</b> ${booking.time}</p>

        <p>We will contact you shortly to confirm the appointment.</p>

        <p>Thank you,<br/>Atmosf'air</p>
      `;

    await resend.emails.send({
      from: "Atmosf'air <noreply@atmosfair.ca>",
      to: booking.email,
      subject,
      html,
    });
  } catch (err) {
    console.error("Email send failed:", err);
  }
};

module.exports = sendBookingConfirmation;