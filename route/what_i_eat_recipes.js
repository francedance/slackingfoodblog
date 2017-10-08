'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Whatieatrecipe = require('../models/what_i_eat_recipe.js');
var bodyParser = require('body-parser');
var uri = process.env.MONGODB_URI;
mongoose.connect(uri);

router.use(bodyParser.urlencoded({extended: true}));
router.get('/',function(req,res , next){

    var session = req.session;

   Whatieatrecipe.find({}).sort({updated: -1}).limit(8).exec(function(err,posts){
            if(err)
            {
              res.send(err);
              res.end();
            }else
            {
              if(session.username)
              {
                res.render('what_i_eat_recipes_editable', {session, posts});
                res.end();
              }else
              {
                res.render('what_i_eat_recipes', {session, posts});
                res.end();
              }
            }
        });
});

router.get('/:page_number',function(req,res){
    
        var session = req.session;
        var skip_count = req.params.page_number * 8;
    
        Whatieatrecipe.find({}).sort({updated: -1}).limit(8).skip(skip_count).exec(function(err,posts){
                if(err)
                {
                  res.send(err);
                  res.end();
                }else
                {
                  if(session.username)
                  {
                    res.render('what_i_eat_recipes_editable', {session, posts});
                    res.end();
                    }else
                    {
                      var page_number = req.params.page_number;
                      res.render('what_i_eat_recipes_' + page_number, {session, posts});
                      res.end();
                    }
                   }
            });
    });

router.get('/delete/:id', function(req,res){

        Whatieatrecipe.findById(req.params.id , function(err,post){
            if(err)
            {
              res.send(err);
              res.end();
            }else
            {
              post.remove(function(err){
              if(err) throw err;
                else
                {
                  res.redirect('/what_i_eat_recipes');
                  res.end();
                }
            });
        }      
       });
});

module.exports = router;

