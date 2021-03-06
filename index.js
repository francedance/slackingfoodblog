'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
      name: 'admin',
      secret: process.env.SECRET, 
      expires: new Date(Date.now() + (30 * 86400 * 1000)),
      cookie: {maxAge: new Date(Date.now()+ 600000 )}      
      }));

var index = require('./route/index.js');
var AboutBlog = require('./route/about_blog.js');
var WhatIEatRecipes = require('./route/what_i_eat_recipes.js');
var MyFoodJourney = require('./route/my_food_journey.js');
var MyFavoriteStuff = require('./route/my_favorite_stuff.js');
var login = require('./route/login.js');
var signout = require('./route/signout.js');
var dashboard = require('./route/dashboard.js');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views','./views');
//setting up some routes
app.use('/',index);
app.use('/about_blog',AboutBlog);
app.use('/what_i_eat_recipes',WhatIEatRecipes);
app.use('/my_food_journey',MyFoodJourney);
app.use('/my_favorite_stuff',MyFavoriteStuff);
app.use('/login',login);
app.use('/signout',signout);
app.use('/dashboard',dashboard);

app.get('/index', function(req,res){
      res.redirect('/');
      res.end();
});

app.get('*',function(req,res){
      res.status(404).render('error_page');
      res.end();
    //error code, 404
});

app.listen(process.env.PORT || 5000);


