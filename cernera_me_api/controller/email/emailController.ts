import express = require('express');
import bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();
import EmailerService from "../../lib/email/emailerService";

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/test', function (req: express.Request, res: express.Response) {
    res.send('Email Controller Ready...');
})

router.post('/send', async (req, res) => {
    console.log(`Sending email with information: `);
    if (process.env.EMAIL && process.env.PASSWORD) {
        const emailer = new EmailerService(
            process.env.EMAIL, // autoEmailAddress
            process.env.PASSWORD, // autoEmailPassword
            req.body.email, // requesterEmail
            req.body.name, // requesterName
            req.body.toEmail, // toEmail
            req.body.subject, // subject
            req.body.message // message
        )

        const transporter = emailer.createTransporter();
        const mailOptions = emailer.generateMailOptions();
        emailer
            .send(transporter, mailOptions)
            .then((msg) => {
                console.log("Message: %o", msg);
                if (msg.accepted) {
                    res
                        .status(200)
                        .send({
                            success: true,
                            message: "Email sent successfully"
                        })
                } else {
                    res
                        .status(400)
                        .send({
                            success: false,
                            message: "Email could not be sent"
                        })
                }
            })
    } else {
        res.status(500)
    }
});

module.exports = router;