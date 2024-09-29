const nodemailer = require("nodemailer");
// import nodemailer from "nodemailer";

// const userGmail = "fgp555@gmail.com";
// const passAppGmail = "bjul tlrx nmec eydx";

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "moises.aguilar1.et7@gmail.com",
    pass: "zypz yqcb wjti oasy",
  },
});

// Define a route for sending emails
// Set up email options
const mailOptions = {
  from: "moises.aguilar1.et7@gmail.com",
  to: "moises.aguilar.et7@gmail.com",
  subject: "Solitud Vacaciones",
  text: "Tu solicitud fue rechazadas.",
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  }
  console.log("Email sent: " + info.response);
});