"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
// Create a new express app instance
var app = express();
var port = process.env.PORT || 3001;
var cors = require("cors");
var rootController = require('./controller/root/rootController.js');
var emailController = require('./controller/email/emailController.js');
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.options('*', cors()); // include before other routes
app.use(cors());
app.use('/api', rootController);
app.use('/api/email', emailController);
app.listen(port, function () {
    console.log("App is listening on port " + port + "!");
});
