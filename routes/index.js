var express = require('express');
var router = express.Router();
// var path = require('path');

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: 'Welcome'});
});



module.exports = router;
