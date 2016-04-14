var mongoose = require('mongoose');

// Create the FoodSchema.
var SportsSchema = new mongoose.Schema({
  'Activity, Exercise or Sport (1 hour)': {
    type: String,
    required: true
  },
  '130 lb': {
    type: Number,
    required: true
  },
  '155 lb': {
    type: Number,
    required: true
  },
  '180 lb': {
    type: Number,
    required: true
  },
  '205 lb': {
    type: Number,
    required: true
  }
});

// Export the model.
module.exports = mongoose.model('sport',SportSchema，'sports');
