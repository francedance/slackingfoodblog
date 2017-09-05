var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var myfoodjourneySchema = new Schema({

    title: String,
    imagename: String,
    content: String,
    updated: {type: Date, default: Date.now }
    
});



var myfoodjourney = mongoose.model('myfoodjourney', myfoodjourneySchema);


module.exports = myfoodjourney;