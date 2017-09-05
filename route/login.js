var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

mongoose.connect(process.env.MONGODB_URI);


var cookieParser = require('cookie-parser');
var session = require('express-session');


var Admin = require('../models/admin.js');

var router = express.Router();



router.use(session({
      name: "admin",
      secret: "Linux1994", 
                    expires: new Date(Date.now() + (30 * 86400 * 1000)),
                cookie: {maxAge: new Date(Date.now()+ 60000 )}
            
    }));
           



router.get('/',function(req,res){

    var session = req.session;

    res.render("login",{session});
    res.end();

});

router.post('/validate',function(req,res){

            var username = req.body.username;
            var password = req.body.password;
            var session = req.session;
           var lookfor;

            
            function validation(lookfor) {
                     Admin.find({ $and: [{'username': { $eq: username}} , {'password': { $eq: lookfor }}] }, function(err,result){

                           

                            if(err){
                                throw err;
                                res.redirect('/');
                                res.end();
                            }else if (result.length == 0){
                                res.redirect('/');
                                res.end();
                            }else {
                                session.username = username;
                                res.redirect('/dashboard');
                                res.end();
                            }
                                

                        
                        });
                    

            }



                Admin.findById('598a249ff36d28307e603d1c',function(err, admin){
                    if (err) throw err;

                    bcrypt.compare(password , admin.password , function(err, result){
                        if(result){
                            validation(admin.password);
                        }else {
                            res.redirect('/');    
                            res.end();                    
                        }
                    });
                 });
          
});
        
           router.get('*',function(req,res){

  
    res.status(404).render("error_page");
    res.end();
    
    //error code, 404

});

   



module.exports = router;