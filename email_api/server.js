const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

const nodemailer = require('nodemailer');
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.post('/api/sendEmail', async (req, res) => {
    console.log(`Sending email with information: `);    
    let name = req.body.name,
        emailAddress = req.body.emailAddress,
        subject = req.body.subject,
        message = req.body.message,
        userEmail = req.body.userEmail;

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
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log('Error occurs');
            res.send(false);
        }
        console.log('Email sent');
        res.send(true);
    });

});


app.listen(port, () => console.log(`Listening on port ${port}`));