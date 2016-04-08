var mongoose = require('mongoose');

// Create the FoodSchema.
var SportsSchema = new mongoose.Schema({
  'Activity, Exercise or Sport (1 hour)': {
    type: String,
    required: true
  },
  '130 lb': {
    type: String,
    required: true
  },
  '155 lb': {
    type: String,
    required: true
  },
  '180 lb': {
    type: String,
    required: true
  },
  '205 lb': {
    type: String,
    required: true
  }
});

// Export the model.
module.exports = SportsSchema;
