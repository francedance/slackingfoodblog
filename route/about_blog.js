var express = require('express');
var router = express.Router();



router.get('/',function(req,res){

var session = req.session;

res.render('about_blog', {session});

});




module.exports = router;