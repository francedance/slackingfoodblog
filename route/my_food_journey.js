'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Myfoodjourney = require('../models/my_food_journey.js');
var bodyParser = require('body-parser');
var uri = process.env.MONGODB_URI;
mongoose.connect(uri);

router.use(bodyParser.urlencoded({extended: true}));
router.get('/',function(req,res){

        var session = req.session;
        
           Myfoodjourney.find({}).sort({updated: -1}).limit(8).exec(function(err,posts){
            if(err)
            {
              res.send(err);
              res.end();
            }else
            {
              if(session.username)
              {
                res.render('my_food_journey_editable', {session, posts});
                res.end();
               }else
               {
                res.render('my_food_journey', {session, posts});
                res.end();
                }
            }
        });
});

router.get('/:page_number',function(req,res){
    
        var session = req.session;
        var skip_count = req.params.page_number * 8;
    
        Myfoodjourney.find({}).sort({updated: -1}).limit(8).skip(skip_count).exec(function(err,posts){
    
                if(err)
                {
                    res.send(err);
                    res.end();
                }else
                {
                   if(session.username)
                   {
                      res.render('my_food_journey_editable', {session, posts});
                      res.end();
                    }else
                    {
                      var page_number = req.params.page_number;
                      res.render('my_food_journey_' + page_number, {session, posts});
                      res.end();
                    }
                }
            });
    });


router.get('/delete/:id', function(req,res){

        Myfoodjourney.findById(req.params.id , function(err,post){
            if(err) throw err;

            post.remove(function(err){
                if(err)
                {
                  res.send(err);
                  res.end();
                }
                else
                {
                   res.redirect('/my_food_journey');
                   res.end();
                }
            });
        });
});

module.exports = router;
