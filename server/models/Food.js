var mongoose = require('mongoose');

// Create the FoodSchema.
var FoodSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

// Export the model.
module.exports = FoodSchema;
