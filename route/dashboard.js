var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongodb_uri = 'mongodb://francedance:chicken9807@ds015889.mlab.com:15889/blog';
mongoose.connect(mongodb_uri);


var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var cloudinary = require('cloudinary');
var del = require('node-delete');
var util = require('util');
var multer = require('multer');
var fs = require('fs-extra');


var Myfavoritestuff = require('../models/my_favorite_stuff.js');
var Myfoodjourney = require('../models/my_food_journey.js');
var Whatieatrecipe = require('../models/what_i_eat_recipe.js');



var router = express.Router();


router.use(bodyParser.urlencoded({extended: true}));

router.use(session({
      name: "admin",
      secret: "Linux1994", 
                    expires: new Date(Date.now() + (30 * 86400 * 1000)),
                cookie: {maxAge: new Date(Date.now()+ 600000 )}
            
    }));
           



router.get('/',function(req,res){

    var session = req.session;
    if(!req.session.username){
        res.redirect('/');
        res.end();
        
    }else{
        res.render("dashboard",{session});
        res.end();
        
    }
    

});

var upload = multer({dest: './upload'});

router.post('/upload_to_my_favorite_stuff' , upload.single('imagefile') , function(req,res){

    if(req.file){
    var oldpath = req.file.path;
    var newpath = "./upload/" + req.file.originalname;
    var title = req.body.title;
    var content = req.body.texts;
    var imagename = req.file.originalname;

    console.log(req.body);

   
   

    fs.rename(oldpath, newpath, function (err) {
        if(err) throw err;

        
    });

     var post = new Myfavoritestuff ({
        title: title,
        imagename: imagename,
        content: content

    });


    cloudinary.config({ 
            cloud_name: 'slacking-food-blog', 
            api_key: '225692669313499', 
            api_secret: 'w6aqw_iXgPs0rYNIiDqYZ9ZlnqU' 
            });

            
    cloudinary.uploader.upload(newpath,
                 function(result) { 
                console.log(result); }, 
                {
                    public_id: req.file.originalname,
                } );

  
    
    post.save(function(err){
        if(err) throw(err);
        console.log('post to my favorite stuff successfully saved!');
        
    });


     del(['./upload/' + req.file.originalname]);

     res.redirect('/my_favorite_stuff');
     res.end();

    }else {

        var title = req.body.title;
        var content = req.body.texts;
        var imagename = undefined;

        var post = new Myfavoritestuff ({
        title: title,
        imagename: imagename,
        content: content

         });

           post.save(function(err){
                 if(err) throw(err);
                console.log('post to my favorite stuff successfully saved!');
        
             });
         res.redirect('/my_favorite_stuff');
         res.end();
    }

});

router.post('/upload_to_my_food_journey' , upload.single('imagefile') , function(req,res){
    
    if(req.file){
    var oldpath = req.file.path;
    var newpath = "./upload/" + req.file.originalname;
    var title = req.body.title;
    var content = req.body.texts;
    var imagename = req.file.originalname;

    console.log(req.body);

    fs.rename(oldpath, newpath, function (err) {
        if(err) throw err; 
    });

     var post = new Myfoodjourney ({
        title: title,
        imagename: imagename,
        content: content

    });


    cloudinary.config({ 
            cloud_name: 'slacking-food-blog', 
            api_key: '225692669313499', 
            api_secret: 'w6aqw_iXgPs0rYNIiDqYZ9ZlnqU' 
            });

            
    cloudinary.uploader.upload(newpath,
                 function(result) { 
                console.log(result); }, 
                {
                    public_id: req.file.originalname,
                    url: 'http://res.cloudinary.com/slacking-food-blog/image/upload/v1503414661/pictures/my_food_journey/' 
                } );

  
    
    post.save(function(err){
        if(err) throw(err);
        console.log('post to my food journey successfully saved!');
        
    });


     del(['./upload/' + req.file.originalname]);

     res.redirect('/my_food_journey');
     res.end();

    }else {

        var title = req.body.title;
        var content = req.body.texts;
        var imagename = undefined;

        var post = new Myfoodjourney ({
        title: title,
        imagename: imagename,
        content: content

         });

           post.save(function(err){
                 if(err) throw(err);
                console.log('post to my food journey successfully saved!');
        
             });
         res.redirect('/my_food_journey');
         res.end();
    }
    

});

router.post('/upload_to_what_i_eat_recipe' , upload.single('imagefile') , function(req,res){
    
    
     if(req.file){
    var oldpath = req.file.path;
    var newpath = "./upload/" + req.file.originalname;
    var title = req.body.title;
    var content = req.body.texts;
    var imagename = req.file.originalname;

    console.log(req.body);

   
   

    fs.rename(oldpath, newpath, function (err) {
        if(err) throw err;

        
    });

     var post = new Whatieatrecipe ({
        title: title,
        imagename: imagename,
        content: content

    });

    var cloud_api_key = process.env.cloud_api_key;
    var cloud_api_secret = process.env.cloud_api_secret;

    cloudinary.config({ 
            cloud_name: 'slacking-food-blog', 
            api_key: cloud_api_key, 
            api_secret: cloud_api_secret 
            });

            
    cloudinary.uploader.upload(newpath,
                 function(result) { 
                console.log(result); }, 
                {
                    public_id: req.file.originalname,
                    url: 'http://res.cloudinary.com/slacking-food-blog/image/upload/v1503414661/pictures/what_i_eat_recipe/' 
                } );

  
    
    post.save(function(err){
        if(err) throw(err);
        console.log('post to what i eat successfully saved!');
        
    });


     del(['./upload/' + req.file.originalname]);

     res.redirect('/what_i_eat_recipes');
     res.end();

    }else {

        var title = req.body.title;
        var content = req.body.texts;
        var imagename = undefined;

        var post = new Whatieatrecipe ({
        title: title,
        imagename: imagename,
        content: content

         });

           post.save(function(err){
                 if(err) throw(err);
                console.log('post to what i eat successfully saved!');
        
             });
         res.redirect('/what_i_eat_recipes');
         res.end();
    }

});

router.get('*',function(req,res){

  
    res.status(404).render("error_page");
    res.end();
    
    //error code, 404

});





module.exports = router;
