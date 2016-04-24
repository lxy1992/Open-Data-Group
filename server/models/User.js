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
  "Email": {
    type: String,
    required: true
  },
  "Admin": {
    type: Boolean,
    required: false
  }
});

// Export the model.
module.exports = mongoose.model('user',UserSchema,'users');
