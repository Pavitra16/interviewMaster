/**
 * Custom mail transporter using Resend's HTTP API.
 * This avoids Render's outbound SMTP port blocking (ports 25, 465, 587)
 * and allows free sandbox testing using onboarding@resend.dev.
 */
const sendMail = async ({ from, to, subject, html }) => {
    const url = "https://api.resend.com/emails";
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
        throw new Error("RESEND_API_KEY environment variable is not defined");
    }

    // Resend sandbox testing uses 'onboarding@resend.dev' as the from address.
    // If a custom domain is verified, it can use the custom domain.
    const sender = process.env.RESEND_EMAIL || "onboarding@resend.dev";

    const payload = {
        from: sender,
        to: [to],
        subject: subject,
        html: html
    };

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(`Resend API responded with status ${response.status}: ${JSON.stringify(data)}`);
    }

    // Return the response in a shape compatible with nodemailer's expectations in auth.service.js
    return {
        accepted: [to],
        messageId: data.id
    };
};

module.exports = {
    sendMail
};