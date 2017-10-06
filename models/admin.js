var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({

    username: String,
    password: String,
    
});

var admin = mongoose.model('admin', adminSchema);

module.exports = admin;
