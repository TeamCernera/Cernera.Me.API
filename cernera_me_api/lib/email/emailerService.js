"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = require('nodemailer');
var EmailerService = /** @class */ (function () {
    function EmailerService(autoEmailAddress, autoEmailPassword, requesterEmail, requesterName, toEmail, subject, message) {
        this.autoEmailAddress = autoEmailAddress;
        this.autoEmailPassword = autoEmailPassword;
        this.requesterEmail = requesterEmail;
        this.requesterName = requesterName;
        this.toEmail = toEmail;
        this.subject = subject;
        this.message = message;
    }
    EmailerService.prototype.createTransporter = function () {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.autoEmailAddress,
                pass: this.autoEmailPassword
            }
        });
    };
    EmailerService.prototype.buildContent = function () {
        return "Name: " + this.requesterName + "\n\n\n        Email Address: " + this.requesterEmail + "\n\n\n        Message: " + this.message;
    };
    EmailerService.prototype.generateMailOptions = function () {
        return {
            from: this.autoEmailAddress,
            to: this.toEmail,
            subject: this.subject,
            text: this.buildContent()
        };
    };
    EmailerService.prototype.send = function (transporter, mailOptions) {
        return transporter.sendMail(mailOptions);
    };
    return EmailerService;
}());
exports.default = EmailerService;
