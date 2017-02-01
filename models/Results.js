// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var ResultsSchema = new Schema({
  // title is a required string
  jobtitle: {
    type: String,
    required: true
  },
    company: {
    type: String,
    required: true
  },
    location: {
    type: String,
    required: true
  },
    desctription: {
    type: String,
    required: true
  },
  // link is a required string
  url: {
    type: String,
    required: true
  }

});

// Create the Article model with the ArticleSchema
var Results = mongoose.model("Results", ResultsSchema);

// Export the model
module.exports = Results;
