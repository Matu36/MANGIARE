const nodemailer = require("nodemailer");

const { NODEMAILER_HOST, NODEMAILER_PORT, NODEMAILER_USER, NODEMAILER_PASS } =
  process.env;

const transporter = nodemailer.createTransport({
  host: NODEMAILER_HOST,
  port: NODEMAILER_PORT,
  secure: true,
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
