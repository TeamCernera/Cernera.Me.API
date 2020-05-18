import express = require('express');
import bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/test', function (req: express.Request, res: express.Response) {
    res.send('Email Controller Ready...');
})

router.post('/sendEmail', async (req, res) => {
    console.log(`Sending email with information: `);
    let name = req.body.name,
        emailAddress = req.body.email,
        subject = req.body.subject,
        message = req.body.message,
        userEmail = req.body.toEmail;

    let text = `Name: ${name}\n\nEmail Address: ${emailAddress}\n\n${message}`

    // Step 1
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, // sender gmail account
            pass: process.env.PASSWORD // sender password
        }
    });

    // Step 2
    let mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: subject,
        text: text
    };

    // Step 3
    transporter.sendMail(mailOptions, (err: any, data: any) => {
        if (err) {
            console.log('Error occurs');
            res.send(false);
        }
        console.log('Email sent');
        res.send(true);
    });

});

module.exports = router;