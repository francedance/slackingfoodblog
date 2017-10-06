'use strict';
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var uri = process.env.MONGODB_URI;
mongoose.connect(uri);
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var cloudinary = require('cloudinary');
var del = require('node-delete');
var util = require('util');
var multer = require('multer');
var fs = require('fs-extra');

var key = process.env.API_KEY;
var secret = process.env.API_SECRET;

var Myfavoritestuff = require('../models/my_favorite_stuff.js');
var Myfoodjourney = require('../models/my_food_journey.js');
var Whatieatrecipe = require('../models/what_i_eat_recipe.js');

var router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));

router.use(session({
      name: 'admin',
      secret: process.env.SECRET, 
                    expires: new Date(Date.now() + (30 * 86400 * 1000)),
                cookie: {maxAge: new Date(Date.now()+ 600000 )}
            
    }));
           
router.get('/',function(req,res){

    var session = req.session;
    if(!req.session.username){
        res.redirect('/');
        res.end();
        
    }else{
        res.render('dashboard',{session});
        res.end();  
    }
});

var upload = multer({dest: './upload'});

router.post('/upload_to_my_favorite_stuff' , upload.array('imagefile', 5) , function(req,res){

    if(req.files){
    var oldpath = [];
    var newpath = [];
    var title = req.body.title;
    var content = req.body.texts;
    var imagename = [];
    

    for (var i = 0 ; i < req.files.length ; i++){
        oldpath[i] = req.files[i].path;
        newpath[i] = './upload/' + req.files[i].originalname;
        imagename[i] = req.files[i].originalname;
    }
   
    for(var o = 0 ; o < req.files.length ; o++){
            fs.rename(oldpath[o], newpath[o], function (err) {
                  if(err) throw err;
  
        });
    }

      var post = new Myfavoritestuff ({
       title: title,
       images: [imagename[0], imagename[1], imagename[2], imagename[3], imagename[4]],
       content: content
      });

    cloudinary.config({ 
           cloud_name: 'slacking-food-blog', 
            api_key: key, 
           api_secret: secret 
           });

       for(var p = 0 ; p < req.files.length ; p++){
            cloudinary.uploader.upload(newpath[p],
              function(result) { 
               console.log(result); 
                }, 
               {
                   public_id: imagename[p],
               });
        }
          
   post.save(function(err){
      if(err) throw(err);
        console.log('post to my favorite stuff successfully saved!');
     });

     for(var a = 0 ; a < req.files.length ; a++) {
     del(['./upload/' + imagename[a]]);
     }
          
     res.redirect('/my_favorite_stuff');
     res.end();
    }else{
         title = req.body.title;
        	content = req.body.texts;
        	imagename = undefined;

        post = new Myfavoritestuff ({
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

router.post('/upload_to_my_food_journey' , upload.array('imagefile',5) , function(req,res){

    if(req.files){
    var oldpath = [];
    var newpath = [];
    var title = req.body.title;
    var content = req.body.texts;
    var imagename = [];
          
    for (var i = 0 ; i < req.files.length ; i++){
        oldpath[i] = req.files[i].path;
        newpath[i] = './upload/' + req.files[i].originalname;
        imagename[i] = req.files[i].originalname;
    }
   

    for(var o = 0 ; o < req.files.length ; o++){
            fs.rename(oldpath[o], newpath[o], function (err) {
                  if(err) throw err;
  
            });
    }

    var post = new Myfoodjourney ({
       title: title,
      images: [imagename[0], imagename[1], imagename[2], imagename[3], imagename[4]],
       content: content

   });

    cloudinary.config({ 
           cloud_name: 'slacking-food-blog', 
            api_key: key, 
           api_secret: secret 
           });
  
        for(var p = 0 ; p < req.files.length ; p++){
                   cloudinary.uploader.upload(newpath[p],
                               function(result) { 
                                    console.log(result); }, 
                                    {
                                      public_id: imagename[p],
                   
                                    });

        }
    
   post.save(function(err){
      if(err) throw(err);
        console.log('post to my food journey successfully saved!');
     });

     for(var a = 0 ; a < req.files.length ; a++) {
     del(['./upload/' + imagename[a]]);
     }
          
     res.redirect('/my_food_journey');
     res.end();
          
    }else{
          
         title = req.body.title;
         content = req.body.texts;
         imagename = undefined;

         post = new Myfoodjourney ({
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

router.post('/upload_to_what_i_eat_recipe' , upload.array('imagefile',5) , function(req,res){
    
    if(req.files){
          var oldpath = [];
          var newpath = [];
          var title = req.body.title;
          var content = req.body.texts;
          var imagename = [];

    for (var i = 0 ; i < req.files.length ; i++){
              oldpath[i] = req.files[i].path;
              newpath[i] = './upload/' + req.files[i].originalname;
              imagename[i] = req.files[i].originalname;
      }
   
   
    for(var o = 0 ; o < req.files.length ; o++){
      fs.rename(oldpath[o], newpath[o], function (err) {
           if(err) throw err;
  
      });
    }

     post = new Whatieatrecipe({
       title: title,
       images: [imagename[0], imagename[1], imagename[2], imagename[3], imagename[4]],
       content: content
   });

    cloudinary.config({ 
           cloud_name: 'slacking-food-blog', 
            api_key: key, 
           api_secret: secret 
           });

            
        for(var p = 0 ; p < req.files.length ; p++){
    cloudinary.uploader.upload(newpath[p],
                function(result) { 
               console.log(result); }, 
               {
                   public_id: imagename[p],
               } );

        }
    
   post.save(function(err){
      if(err) throw(err);
        console.log('post to what I eat recipes successfully saved!');
        
     });


     for(var a = 0 ; a < req.files.length ; a++) {
     del(['./upload/' + imagename[a]]);

     }
     res.redirect('/what_i_eat_recipes');
     res.end();
    }else{
         title = req.body.title;
         content = req.body.texts;
         imagename = undefined;

        var post = new Whatieatrecipe ({
        title: title,
        imagename: imagename,
        content: content

         });

           post.save(function(err){
                 if(err) throw(err);
                console.log('post to what i eat recipes successfully saved!');
        
             });
         res.redirect('/what_i_eat_recipes');
         res.end();
    }

});

router.get('*',function(req,res){

  
    res.status(404).render('error_page');
    res.end();
    
    //error code, 404

});

module.exports = router;




