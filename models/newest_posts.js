var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newestpostsSchema = new Schema({

    what_i_eat_recipes_id: String,
    what_i_eat_recipes_title: String,
    my_favorite_stuff_id: String,
    my_favorite_stuff_title: String,
    my_food_journey_id: String,
    my_food_journey_title: String
  
});

var newestposts = mongoose.model('newestposts', newestpostsSchema);
module.exports = newestposts;
