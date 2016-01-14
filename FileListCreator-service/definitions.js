'use strict';

var express = require('express');
var rfs = require('./routes/remotefilesystem/rfs');

var router = express.Router();

router.use('/', rfs);

module.exports = router;
