var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');

var mongoose = require('mongoose');

var Myfavoritestuff = require('../models/my_favorite_stuff.js');
var Myfoodjourney = require('../models/my_food_journey.js');
var Whatieatrecipe = require('../models/what_i_eat_recipe.js');
var Newestposts = require('../models/newest_posts.js');

var uri = process.env.MONGODB_URI;
mongoose.connect(uri);


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

        
                     
        //Sorting the current What I Eat Recipes database in newest to oldest older.
        //Just retrieve one post (newest) then update Newestposts database.
            var promise = Whatieatrecipe.find({}).sort({updated: -1}).exec();

                promise.then(function(post){
                    
                    Newestposts.findById('59b21c89a8e9732c503ece97', function(err, newest){
                        if(err) throw err;

                        if(post[0] == undefined) {
                            newest.what_i_eat_recipes_id = '';
                            newest.what_i_eat_recipes_title = '';
                        }else{
                            newest.what_i_eat_recipes_id = post[0]._id;
                            newest.what_i_eat_recipes_title = post[0].title;
                        }

                        newest.save(function(err){
                            if(err) throw err;
                        })
                    })

                }).catch(function(err){
                    console.log('error', err);
                });

                    
            //Sorting the current My Food Journey database in newest to oldest older.
            //Just retrieve one post (newest) then update Newestposts database.
                var promise1 = Myfoodjourney.find({}).sort({updated: -1}).exec();

                promise1.then(function(post){
                    
                    Newestposts.findById('59b21c89a8e9732c503ece97', function(err, newest){
                        if(err) throw err;

                        if(post[0] == undefined) {
                            newest.my_food_journey_id = '';
                            newest.my_food_journey_title = '';
                        }else{
                            newest.my_food_journey_id = post[0]._id;
                            newest.my_food_journey_title = post[0].title;
                        }

                        newest.save(function(err){
                            if(err) throw err;
                        })
                    })

                }).catch(function(err){
                    console.log('error', err);
                });

                 
        //Sorting the current My Favorite Stuff database in newest to oldest older.
        //Just retrieve one post (newest) then update Newestposts database.

                      var promise2 = Myfavoritestuff.find({}).sort({updated: -1}).exec();

                promise2.then(function(post){
                    
                    Newestposts.findById('59b21c89a8e9732c503ece97', function(err, newest){
                        if(err) throw err;

                        if(post[0] == undefined) {
                            newest.my_favorite_stuff_id = '';
                            newest.my_favorite_stuff_title = '';
                        }else{
                            newest.my_favorite_stuff_id = post[0]._id;
                            newest.my_favorite_stuff_title = post[0].title;
                        }

                        newest.save(function(err){
                            if(err) throw err;
                        })
                    })

                }).catch(function(err){
                    console.log('error', err);
                });

                //retrieving data from Newestposts DB to pass to views.

                var newest_recipe_id;
                var newest_recipe_title;
                var newest_favorite_id;
                var newest_favorite_title;
                var newest_journey_id;
                var newest_journey_title;

                
                 Newestposts.findById('59b21c89a8e9732c503ece97', function(err, newest){
                        newest_recipe_id = newest.what_i_eat_recipes_id;
                        newest_recipe_title = newest.what_i_eat_recipes_title;
                        newest_favorite_id = newest.my_favorite_stuff_id;
                        newest_favorite_title = newest.my_favorite_stuff_title;
                        newest_journey_id = newest.my_food_journey_id;
                        newest_journey_title = newest.my_food_journey_title;

                    res.render('index', 
                    {session,
                    newest_recipe_id,
                     newest_recipe_title,
                     newest_favorite_id,
                     newest_favorite_title,
                     newest_journey_id,
                     newest_journey_title
                    });
                    res.end();
              
                    })
             
                    
                    

});



 

   



module.exports = router;
