var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var myfavoritestuffSchema = new Schema({

    title: String,
     images: [ String, String, String, String, String],
    content: String,
     updated: {type: Date, default: Date.now }
    
});



var myfavoritestuff = mongoose.model('myfavoritestuff', myfavoritestuffSchema);


module.exports = myfavoritestuff;