var mongoose = require('mongoose');

// Create the FoodSchema.
var UserSchema = new mongoose.Schema({
  "Username": {
    type: String,
    required: true
  },
  "Password": {
    type: String,
    required: true
  },
  "E-mail": {
    type: String,
    required: true
  }
});

// Export the model.
module.exports = mongoose.model('user',UserSchema,'users');
