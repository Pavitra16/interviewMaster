const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.BREVO_EMAIL,
        pass: process.env.BREVO_SMTP_KEY
    },
    // connection timeouts to fail fast instead of hanging
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
    // allow TLS (STARTTLS) but avoid failures from strict cert checks in some environments
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter