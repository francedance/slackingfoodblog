var express = require('express');

var cookieParser = require('cookie-parser');
var session = require('express-session');

var router = express.Router();


router.get('/', function(req,res){


    req.session.destroy();
    res.redirect('/');
    res.end();

})

module.exports = router;