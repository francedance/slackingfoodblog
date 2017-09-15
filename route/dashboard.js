var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var uri = 'mongodb://francedance:chicken9807@ds015889.mlab.com:15889/blog';
//mongoose.connect(process.env.MONGODB_URI);
mongoose.connect(uri);


var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var cloudinary = require('cloudinary');
var del = require('node-delete');
var util = require('util');
var multer = require('multer');
var fs = require('fs-extra');

//var key = process.env.API_KEY;
//var secret = process.env.API_SECRET;

var key = '225692669313499';
var secret = 'w6aqw_iXgPs0rYNIiDqYZ9ZlnqU';

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

router.post('/upload_to_my_favorite_stuff' , upload.array('imagefile', 5) , function(req,res){

    

    if(req.files){
    var oldpath = [];
    var newpath = [];
    var title = req.body.title;
    var content = req.body.texts;
    var imagename = [];
    var img_url = [];

   

    for (i = 0 ; i < req.files.length ; i++){
        oldpath[i] = req.files[i].path;
        newpath[i] = "./upload/" + req.files[i].originalname;
       
       
        imagename[i] = req.files[i].originalname;
       
    }
   
    
   
    for(i = 0 ; i < req.files.length ; i++){
   fs.rename(oldpath[i], newpath[i], function (err) {
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

       for(i = 0 ; i < req.files.length ; i++){
    cloudinary.uploader.upload(newpath[i],
                function(result) { 
               
               console.log(result); 
                }, 
               {
                   public_id: imagename[i],
  
               } );

        }


   post.save(function(err){
      if(err) throw(err);
        console.log('post to my favorite stuff successfully saved!');
        
     });


     for(i = 0 ; i < req.files.length ; i++) {
     del(['./upload/' + imagename[i]]);

     }
     res.redirect('/my_favorite_stuff');
     res.end();
    }else{
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

router.post('/upload_to_my_food_journey' , upload.array('imagefile',5) , function(req,res){
    
   
    if(req.files){
    var oldpath = [];
    var newpath = [];
    var title = req.body.title;
    var content = req.body.texts;
    var imagename = [];

    console.log(req.files[0].originalname);

    for (i = 0 ; i < req.files.length ; i++){
        oldpath[i] = req.files[i].path;
        newpath[i] = "./upload/" + req.files[i].originalname;
        imagename[i] = req.files[i].originalname;
    }
   
   
    for(i = 0 ; i < req.files.length ; i++){
   fs.rename(oldpath[i], newpath[i], function (err) {
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

            
        for(i = 0 ; i < req.files.length ; i++){
    cloudinary.uploader.upload(newpath[i],
                function(result) { 
               console.log(result); }, 
               {
                   public_id: imagename[i],
                   
               } );

        }
    
   post.save(function(err){
      if(err) throw(err);
        console.log('post to my food journey successfully saved!');
        
     });


     for(i = 0 ; i < req.files.length ; i++) {
     del(['./upload/' + imagename[i]]);

     }
     res.redirect('/my_food_journey');
     res.end();
    }else{
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

router.post('/upload_to_what_i_eat_recipe' , upload.array('imagefile',5) , function(req,res){
    
    
    if(req.files){
    var oldpath = [];
    var newpath = [];
    var title = req.body.title;
    var content = req.body.texts;
    var imagename = [];

   

    for (i = 0 ; i < req.files.length ; i++){
        oldpath[i] = req.files[i].path;
        newpath[i] = "./upload/" + req.files[i].originalname;
        imagename[i] = req.files[i].originalname;
    }
   
   
    for(i = 0 ; i < req.files.length ; i++){
   fs.rename(oldpath[i], newpath[i], function (err) {
       if(err) throw err;
  
   });
    }

    var post = new Whatieatrecipe({
       title: title,
      images: [imagename[0], imagename[1], imagename[2], imagename[3], imagename[4]],
       content: content

   });


    cloudinary.config({ 
           cloud_name: 'slacking-food-blog', 
            api_key: key, 
           api_secret: secret 
           });

            
        for(i = 0 ; i < req.files.length ; i++){
    cloudinary.uploader.upload(newpath[i],
                function(result) { 
               console.log(result); }, 
               {
                   public_id: imagename[i],
               } );

        }
    
   post.save(function(err){
      if(err) throw(err);
        console.log('post to what I eat recipes successfully saved!');
        
     });


     for(i = 0 ; i < req.files.length ; i++) {
     del(['./upload/' + imagename[i]]);

     }
     res.redirect('/what_i_eat_recipes');
     res.end();
    }else{
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
                console.log('post to what i eat recipes successfully saved!');
        
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
