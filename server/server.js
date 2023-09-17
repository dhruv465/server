const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "dhruv.sathe11@gmail.com", // Replace with your Gmail email address
        pass: "oazn gtai nfdv yzpm", // Replace with your Gmail password or generate an app password
    },
});

transporter.verify((error) => {
    if (error) {
        console.error("Email verification failed:", error);
    } else {
        console.log("Ready to send emails");
    }
});

app.post("/send-email", (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: "dhruv.sathe11@gmail.com", // Replace with your Gmail email address
        to: "dhruv.sathe11@gmail.com", // Replace with the recipient's email address
        subject: "Contact Request",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            res.status(500).json({ status: "Error sending email" });
        } else {
            console.log("Email sent:", info.response);
            res.status(200).json({ status: "Message Sent" });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
