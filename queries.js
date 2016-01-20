/* Fill out these functions using Mongoose queries*/

// mongo ds056698.mongolab.com:56698/cen3101_assignment3_db -u TA -p password
var config = require('./config');
var Listing = require('./ListingSchema.js');
var mongoose = require('mongoose');
mongoose.connect(config.db.uri);

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
   Listing.findOne({code: 'LBW'},function(err,listing){

    if(err) throw err;
    console.log('~~~~~~~~~~~findLibraryWest()~~~~~~~~~~~~~~~\n');
    console.log(listing);
    console.log('\n');
   }); 
};

var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
   Listing.findOneAndRemove({code: 'CABL'}, function(err,entry){

      if (err) throw err;
      console.log('~~~~~~~~~~~removeCable()~~~~~~~~~~~~~~~\n');
      console.log('CABL deleted!\n' + entry); 
      console.log('\n');
   })
};
var updatePhelpsMemorial = function() {
  /*
    Phelps Memorial Hospital Center's address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */
   Listing.findOneAndUpdate({name: 'Phelps Laboratory'}, {$set : {address:'1953 Museum Rd, Gainesville FL, 32603'} } ,{new: true}, function(err, entry){

    if(err) throw err;
    console.log('~~~~~~~~~~~updatePhelpsMemorial()~~~~~~~~~~~~~~~\n');
    console.log('PHL Updated!\n');
    console.log('Listing has been changed to:\n' + entry);

   });
};

var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
  var prompt = '\n~~~~~~~~~~~retrieveAllListings()~~~~~~~~~~~~~~~\n';
  Listing.find({},function(err, listing){
    if(err) throw err;

    console.log(prompt + listing);
  });   
};

findLibraryWest();
removeCable();
updatePhelpsMemorial();
retrieveAllListings();