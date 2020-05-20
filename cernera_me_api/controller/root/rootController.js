"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
// Home page route.
router.get('/', function (req, res) {
    res.send('Ready...');
});
module.exports = router;
