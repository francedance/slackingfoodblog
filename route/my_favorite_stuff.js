var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Myfavoritestuff = require('../models/my_favorite_stuff.js');
var cloudinary = require('cloudinary');
var bodyParser = require("body-parser");

var uri = 'mongodb://francedance:chicken9807@ds015889.mlab.com:15889/blog';
mongoose.connect(uri);


router.use(bodyParser.urlencoded({extended: true}));

router.get('/',function(req,res){

    var session = req.session;

    

        Myfavoritestuff.find({}).sort({updated: -1}).exec(function(err,posts){

            
            if(err) {
                throw err;
                res.redirect('/');
                res.end();
            }else{
                if(session.username){
                res.render('my_favorite_stuff_editable', {session, posts});
                res.end();
                }else{

                    
                   //console.log(posts[0].images[2])
                  


                res.render('my_favorite_stuff', {session, posts});
                res.end();
                }
            }


        });
        
    
});



router.get('/delete/:id', function(req,res){

        Myfavoritestuff.findById(req.params.id , function(err,post){
            if(err) throw err;

            post.remove(function(err){
                if(err){
                     throw err;
                    res.redirect('/');
                    res.end();
                }
                else{
                    res.redirect('/my_favorite_stuff');
                    res.end();
                }
            })
        })

});


module.exports = router;
