var mongoose = require('mongoose');

// Create the FoodRecordSchema.
var FoodRecordSchema = new mongoose.Schema({
    userId : String,
    foodList : Array,
    totalEnergy : Number,
    date : {
        type: Date,
        default: Date.now
    }

});

// Export the model.
module.exports = FoodRecordSchema;
