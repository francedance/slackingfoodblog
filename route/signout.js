var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var session = require('cookie-session');




router.get('/', function(req,res){

    
   req.session = null;
    res.redirect('/');
    res.end();

})

module.exports = router;
