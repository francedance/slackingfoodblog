var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Myfoodjourney = require('../models/my_food_journey.js');
var cloudinary = require('cloudinary');
var bodyParser = require("body-parser")
mongodb_uri = 'mongodb://francedance:chicken9807@ds015889.mlab.com:15889/blog';
mongoose.connect(mongodb_uri);


router.use(bodyParser.urlencoded({extended: true}));

router.get('/',function(req,res){

        var session = req.session;

      if(session.username){

         Myfoodjourney.find({}, function(err, posts){
        if (err) {
            throw err;
            res.redirect('/');
            res.end();
        }else{  
        res.render('my_food_journey_editable',{posts,session});
        res.end();
        }});
        
    }else {
        
         Myfoodjourney.find({}, function(err, posts){
        if (err) {
            throw err;
            res.redirect('/');
            res.end();
        }else{  
        res.render('my_food_journey',{posts,session});
        res.end();
        }});
    }

});

router.get('/delete/:id', function(req,res){

        Myfoodjourney.findById(req.params.id , function(err,post){
            if(err) throw err;

            post.remove(function(err){
                if(err){
                     throw err;
                    res.redirect('/');
                    res.end();
                }
                else{
                    res.redirect('/my_food_journey');
                    res.end();
                }
            })
        })

});


module.exports = router;