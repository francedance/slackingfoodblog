var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');


router.use(bodyParser.urlencoded({extended: true}));
router.use(cookieParser());



router.use(session({
      name: "admin",
      secret: "Linux1994", 
                    expires: new Date(Date.now() + (30 * 86400 * 1000)),
                cookie: {maxAge: new Date(Date.now()+ 600000 )}
            
    }));


router.get('/',function(req,res){

 var session = req.session; 

    res.render('index', {session});
   res.end();

});




module.exports = router;