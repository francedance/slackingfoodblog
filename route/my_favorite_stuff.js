var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Myfavoritestuff = require('../models/my_favorite_stuff.js');
var cloudinary = require('cloudinary');
var bodyParser = require("body-parser");
var uri = process.env.MONGODB_URI;
mongoose.connect(uri);

router.use(bodyParser.urlencoded({extended: true}));
router.get('/',function(req,res){

    var session = req.session;

        Myfavoritestuff.find({}).sort({updated: -1}).limit(8).exec(function(err,posts){

            if(err) {
                throw err;
                res.redirect('/');
                res.end();
            }else{
                if(session.username){
                res.render('my_favorite_stuff_editable', {session, posts});
                res.end();
                }else{

                res.render('my_favorite_stuff', {session, posts});
                res.end();
                }
            }

        });
        
    
});

router.get('/:page_number',function(req,res){
    
        var session = req.session;
        var skip_count = req.params.page_number * 8;
    
       Myfavoritestuff.find({}).sort({updated: -1}).limit(8).skip(skip_count).exec(function(err,posts){

                if(err) {
                    throw err;
                    res.redirect('/');
                    res.end();
                }else{
                    if(session.username){
                    res.render('my_favorite_stuff_editable', {session, posts});
                    res.end();
                    }else{
                        var page_number = req.params.page_number;
                  
                    res.render('my_favorite_stuff_' + page_number, {session, posts});
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
