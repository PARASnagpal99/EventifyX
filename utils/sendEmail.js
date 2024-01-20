const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendMail = asyncHandler(async (email, event) => {
  console.log(email,event);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `EventifyX <${process.env.EMAIL}>`,
    to: email,
    subject: 'Registration Confirmation',
    html: `<h1>Congratulations! You have been successfully registered for Event ${event.event_name}. Your Event Details are as follows: ${event.event_description}. Go to <a href="${event.event_url}">${event.event_url}</a> for further information.</h1>`,
  });

  console.log("Email sent successfully");
});

module.exports = sendMail;
