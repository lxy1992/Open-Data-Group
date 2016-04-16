var mongoose = require('mongoose');

// Create the FoodSchema.
var SportSchema = new mongoose.Schema({
  "Activity(1 hour)": {
    type: String,
    required: true
  },
  "130 lb": {
    type: Number,
    required: true
  },
  "155 lb": {
    type: Number,
    required: true
  },
  "180 lb": {
    type: Number,
    required: true
  },
  "205 lb": {
    type: Number,
    required: true
  },
  "1 lb": {
    type: Number,
    required: true
  }
});

// Export the model.
module.exports = mongoose.model('sport',SportSchema,'sports');
/**var SportDAO = function(){};
SportDAO.prototype.findByName = function(query, callback){
  sport.findOne(query, function(err, obj){
    callback(err, obj)
  });
};
module.exports = new SportDAO();**/
