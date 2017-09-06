var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Whatieatrecipe = require('../models/what_i_eat_recipe.js');
var cloudinary = require('cloudinary');
var bodyParser = require('body-parser');

mongoose.connect(process.env.MONGODB_URI);

router.use(bodyParser.urlencoded({extended: true}));

router.get('/',function(req,res , next){

    var session = req.session;

    if(session.username){

         Whatieatrecipe.find({}, function(err, posts){
        if (err) {
            throw err;
            res.redirect('/');
            res.end();
        }else{  
        res.render('what_i_eat_recipes_editable',{posts, session});
        res.end();
        }});
        
    }else {
       
          Whatieatrecipe.find({}, function(err, posts){
        if (err) {
            throw err;
            res.redirect('/');
            res.end();
        }else{  
        res.render('what_i_eat_recipes',{posts, session});
        res.end();
        }});
    }


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
