import express = require('express');

var router = express.Router();

// Home page route.
router.get('/', function (req: express.Request, res: express.Response) {
    res.send('Ready...');
})

module.exports = router;