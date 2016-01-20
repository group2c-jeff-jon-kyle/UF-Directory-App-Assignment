/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var listingSchema = new Schema({
  /* These are the same datafields Assignment2 */
  /* Inspired by the tutorial located in the repo */
  
  code: String,
  name: String,
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  address: String,
  updated_at: Date,
  created_at: Date
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
listingSchema.pre('save', function(next) {
  /* your code here */

  //updated_at is already a property
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

 // if created_at doesn't exist, add to that field
  if(!this.created_at) {
    this.created_at = currentDate;
  }

  //Mocha tests require validation of name and code
  if(!this.code || !this.name) {
    //Use next to throw error if this requirement is not met
    //http://mongoosejs.com/docs/3.8.x/docs/middleware.html
    var err = new Error('something went wrong');
    next(err);
    return;
  }

  next();
});

/* Use your schema to instantiate a Mongoose model */
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listing;
