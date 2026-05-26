const nodemailer = require("nodemailer");

/**
 * Standard SMTP transporter using Gmail.
 * Requires GMAIL_USER (your Gmail address) and GMAIL_APP_PASS (a 16-character App Password).
 * Note: Outbound SMTP (ports 465, 587) must not be blocked by your hosting provider.
 */
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS
    }
});

module.exports = transporter;