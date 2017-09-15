var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var whatieatrecipeSchema = new Schema({

    title: String,
     images: [ String, String, String, String, String],
    content: String,
    updated: {type: Date, default: Date.now }
    
});



var whatieatrecipe = mongoose.model('whatieatrecipe', whatieatrecipeSchema);


module.exports = whatieatrecipe;