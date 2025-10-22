require("dotenv").config();
const nodemailer = require("nodemailer");

// Create transporter using default SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  logger: true, // enables logging to console
  debug: true, // enables SMTP debug output
});

const sendCompletionEmail = async (task) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.TASK_OWNER_EMAIL,
      subject: `✅ Task Completed: ${task.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #4CAF50;">Task Completed Successfully! 🎉</h2>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Title:</strong> ${task.title}</p>
            <p><strong>Description:</strong> ${task.description}</p>
            <p><strong>Status:</strong> <span style="color: #4CAF50; font-weight: bold;">${
              task.status
            }</span></p>
            <p><strong>Completed On:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Completion email sent successfully");
  } catch (error) {
    console.error("❌ Email error:", error.message);
  }
};

module.exports = { sendCompletionEmail };
