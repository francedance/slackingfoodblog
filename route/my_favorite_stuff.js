var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Myfavoritestuff = require('../models/my_favorite_stuff.js');
var cloudinary = require('cloudinary');
var bodyParser = require("body-parser");

mongoose.connect(process.env.MONGODB_URI);


router.use(bodyParser.urlencoded({extended: true}));

router.get('/',function(req,res){

    var session = req.session;

    if(session.username){

         Myfavoritestuff.find({}, function(err, posts){
        if (err) {
            throw err;
            res.redirect('/');
            res.end();
        }else{  
        res.render('my_favorite_stuff_editable',{posts, session});
        res.end();
        }});
        
    }else {
       
          Myfavoritestuff.find({}, function(err, posts){
        if (err) {
            throw err;
            res.redirect('/');
            res.end();
        }else{  
        res.render('my_favorite_stuff',{posts, session});
        res.end();
        }});
    }

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
