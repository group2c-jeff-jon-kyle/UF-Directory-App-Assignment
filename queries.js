/* Fill out these functions using Mongoose queries*/

//According to instructor post on piazza:
/*"You will need to copy in some of the require statements that were used
//in the JSONtoMongo.js file (mongoose, Schema, Listing, and config). You'll
also need to copy over the same command to connect to the database."*/
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config');

/* Connect to your database */
mongoose.connect(config.db.uri);

//For reference on these functions, see:
////https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
var findLibraryWest = function() {
  /*
    Find the document that contains data corresponding to Library West,
    then log it to the console.
   */
   Listing.find({'name':'Library West'}, function(err, entry) {
     //If unsuccessfull, throw an error
     if (err) throw err;

     //Library west data
    console.log('\n\n\n\nLibrary West Data \n' + entry);
  });
};

var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console.
   */
   Listing.findOneAndRemove({'code':'CABL'}, function(err, entry) {
     //If unsuccessfull, throw an error
     if (err) throw err;

     //Found and deleted
    console.log('\n\n\n\nThe following entry has been removed \n' + entry);
  })
};

var updatePhelpsMemorial = function() {
  /*
    Phelps Memorial Hospital Center's address is incorrect. Find the listing, update it, and then
    log the updated document to the console.
   */

   // Find and update
   //For setting properties other than the queried property, see:
   //http://stackoverflow.com/questions/32811510/mongoose-findoneandupdate-doesnt-return-updated-document
   Listing.findOneAndUpdate({name:'Phelps Laboratory'}, { $set: { address:"100 Phelps Lab, P.O. Box 116350, Gainesville, FL  32611" } }, { new: true}, function(err, entry) {
    //Throw error if unsuccessful
    if (err) throw err;

    // we have the updated user returned to us
    console.log('\n\n\n\nThe Phelps Memorial Hospital Center is updated to \n' + entry);
  });
};


var retrieveAllListings = function() {
  /*
    Retrieve all listings in the database, and log them to the console.
   */
   // get all the users
   Listing.find({}, function(err, entries) {
     //Throw error if needed
     if (err) throw err;

     // object of all the users
     console.log('\n\n\n\nList of all entries \n' + entries);
  });
};

//Run node queries.js to see console prints
findLibraryWest();
removeCable();
updatePhelpsMemorial();
retrieveAllListings();
