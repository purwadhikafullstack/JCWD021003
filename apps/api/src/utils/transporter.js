const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jcwd21003@gmail.com",
    pass: "sxph wbpo lefe zkzo",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
