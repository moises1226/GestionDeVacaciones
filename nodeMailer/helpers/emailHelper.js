const nodemailer = require("nodemailer");

const emailHelper = async (to, subject, text) => {
  // Create a transporter
  const myGmail = "moises.aguilar1.et7@gmail.com";
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: myGmail,
      pass: "zypz yqcb wjti oasy",
    },
  });

  // Set up email options
  let mailOptions = {
    from: myGmail,
    to: to,
    subject: subject,
    text: text,
  };

  // Send the email
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = emailHelper;