'use strict';
var express = require('express');
var router = express.Router();
var session = require('cookie-session');

router.get('/', function(req,res){
   req.session = null;
   res.redirect('/');
   res.end();
});

module.exports = router;
