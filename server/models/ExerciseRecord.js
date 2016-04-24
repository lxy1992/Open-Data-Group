var mongoose = require('mongoose');

// Create the ExerciseRecordSchema.
var ExerciseRecordSchema = new mongoose.Schema({
    userId : String,
    exerciseList : Array,
    totalEnergy : Number,
    date : {
        type: Date,
        default: Date.now
    }

});

// Export the model.
module.exports = ExerciseRecordSchema;
