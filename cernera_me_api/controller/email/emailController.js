"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var nodemailer = require('nodemailer');
require('dotenv').config();
var emailerService_1 = __importDefault(require("../../lib/email/emailerService"));
var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.get('/test', function (req, res) {
    res.send('Email Controller Ready...');
});
router.post('/send', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var emailer, transporter, mailOptions;
    return __generator(this, function (_a) {
        console.log("Sending email with information: ");
        if (process.env.EMAIL && process.env.PASSWORD) {
            emailer = new emailerService_1.default(process.env.EMAIL, // autoEmailAddress
            process.env.PASSWORD, // autoEmailPassword
            req.body.email, // requesterEmail
            req.body.name, // requesterName
            req.body.toEmail, // toEmail
            req.body.subject, // subject
            req.body.message // message
            );
            transporter = emailer.createTransporter();
            mailOptions = emailer.generateMailOptions();
            emailer
                .send(transporter, mailOptions)
                .then(function (msg) {
                console.log("Message: %o", msg);
                if (msg.accepted) {
                    res
                        .status(200)
                        .send({
                        success: true,
                        message: "Email sent successfully"
                    });
                }
                else {
                    res
                        .status(400)
                        .send({
                        success: false,
                        message: "Email could not be sent"
                    });
                }
            });
        }
        else {
            res.status(500);
        }
        return [2 /*return*/];
    });
}); });
module.exports = router;
