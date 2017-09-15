var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Whatieatrecipe = require('../models/what_i_eat_recipe.js');
var cloudinary = require('cloudinary');
var bodyParser = require('body-parser');

var uri = process.env.MONGODB_URI;
mongoose.connect(uri);



router.use(bodyParser.urlencoded({extended: true}));

router.get('/',function(req,res , next){

    var session = req.session;

   Whatieatrecipe.find({}).sort({updated: -1}).exec(function(err,posts){

            
            if(err) {
                throw err;
                res.redirect('/');
                res.end();
            }else{
                if(session.username){
                res.render('what_i_eat_recipes_editable', {session, posts});
                res.end();
                }else{

                    
                   //console.log(posts[0].images[2])
                  


                res.render('what_i_eat_recipes', {session, posts});
                res.end();
                }
            }


        });


});


router.get('/delete/:id', function(req,res){

        Whatieatrecipe.findById(req.params.id , function(err,post){
            if(err) {
                throw err;
                res.redirect('/');
                res.end();
            }else{

                post.remove(function(err){
                if(err) throw err;

                else{
                    res.redirect('/what_i_eat_recipes');
                    res.end();
                }
            })
        }
            

            
        })

});





module.exports = router;
