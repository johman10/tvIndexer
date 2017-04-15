const NODE_ENV = process.env.NODE_ENV;
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('dashboard');
});

module.exports = router;
