/**
 * Custom mail transporter using Brevo's HTTP API.
 * This avoids Render's outbound SMTP port blocking (ports 25, 465, 587).
 */
const sendMail = async ({ from, to, subject, html }) => {
    const url = "https://api.brevo.com/v3/smtp/email";
    const apiKey = process.env.BREVO_SMTP_KEY;

    if (!apiKey) {
        throw new Error("BREVO_SMTP_KEY environment variable is not defined");
    }

    const payload = {
        sender: { email: from || process.env.BREVO_EMAIL },
        to: [{ email: to }],
        subject: subject,
        htmlContent: html
    };

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "api-key": apiKey
        },
        body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(`Brevo API responded with status ${response.status}: ${JSON.stringify(data)}`);
    }

    // Return the response in a shape compatible with nodemailer's expectations in auth.service.js
    return {
        accepted: [to],
        messageId: data.messageId
    };
};

module.exports = {
    sendMail
};