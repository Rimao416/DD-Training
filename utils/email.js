const nodemail = require("nodemailer");
const sendEmail = (options) => {
  const transporter = nodemail.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  //   Définir les options du mail
  const mailOptions = {
    from: "Omari Kayumba <omarii@kayumba.io>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  transporter.sendMail(mailOptions)
};

module.exports=sendEmail