const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendBookingConfirmation = async (booking) => {
  try {
    await resend.emails.send({
      from: "Atmosfair <noreply@atmosfair.ca>",
      to: booking.email,
      subject: "Your service request was received",
      html: `
        <h2>Thank you for choosing Atmosf'air</h2>

        <p>We received your service request.</p>

        <h3>Request Details</h3>

        <p><b>Name:</b> ${booking.name}</p>
        <p><b>Service:</b> ${booking.type}</p>
        <p><b>Equipment:</b> ${booking.equipmentType}</p>
        <p><b>Date:</b> ${booking.date}</p>
        <p><b>Time:</b> ${booking.time}</p>

        <p>We will contact you shortly to confirm the appointment.</p>

        <p>Thank you,<br/>Atmosf'air</p>
      `,
    });
  } catch (err) {
    console.error("Email send failed:", err);
  }
};

module.exports = sendBookingConfirmation;