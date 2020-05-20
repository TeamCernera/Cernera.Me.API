const nodemailer = require('nodemailer');

export default class EmailerService {

    autoEmailAddress: string;
    autoEmailPassword: string;
    requesterEmail: string;
    requesterName: string;
    toEmail: string;
    subject: string;
    message: string;

    constructor(
        autoEmailAddress: string,
        autoEmailPassword: string,
        requesterEmail: string,
        requesterName: string,
        toEmail: string,
        subject: string,
        message: string
    ) {
        this.autoEmailAddress = autoEmailAddress;
        this.autoEmailPassword = autoEmailPassword;
        this.requesterEmail = requesterEmail;
        this.requesterName = requesterName;
        this.toEmail = toEmail;
        this.subject = subject;
        this.message = message;
    }

    createTransporter() {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.autoEmailAddress,
                pass: this.autoEmailPassword
            }
        });
    }

    buildContent() {
        return `Name: ${this.requesterName}\n\n
        Email Address: ${this.requesterEmail}\n\n
        Message: ${this.message}`
    }

    generateMailOptions() {
        return {
            from: this.autoEmailAddress,
            to: this.toEmail,
            subject: this.subject,
            text: this.buildContent()
        };
    }

    send(transporter: any, mailOptions: Object): Promise<any> {
        return transporter.sendMail(mailOptions);
    }

}