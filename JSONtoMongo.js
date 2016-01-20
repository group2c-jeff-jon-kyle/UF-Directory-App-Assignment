'use strict';
/*
  Import modules/files you may need to correctly run the script.
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config');

/* Connect to your database */
//Mongoose Connect: http://mongoosejs.com/docs/connections.html
mongoose.connect(config.db.uri);

/*
  Instantiate a mongoose model for each listing object in the JSON file,
  and then save it to your Mongo database
 */
 //Read the data file using the fs module
 //See: https://nodejs.org/api/fs.html#fs_fs_readfile_file_options_callback
fs.readFile('listings.json', 'utf8', function(error, data) {

  //If there's an error, log error and throw error
  if(error) {
    console.log('listings.json could not be read');
    throw error;
  }
  //Else, log success
  console.log('listings.json read successfully');

  //Get the data from listings.json using JSON.parse()
  //See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
  //This returns a javascript object
  var listingsData = JSON.parse(data);

  //Need to use a for loop to save each member of listingsData
  //See: http://stackoverflow.com/questions/9329446/for-each-over-an-array-in-javascript
  //forEach accepts an iterator function, so we will use the 'entries' array iterator
  //see: https://msdn.microsoft.com/en-us/library/dn858240(v=vs.94).aspx
  listingsData.entries.forEach(function(entry) {
    var listingEntry = new Listing(entry);

    //Save the listing entry
    listingEntry.save(function(error) {

      //If there's an error, log error and throw error
      if(error) {
        throw error;
        console.log('Could not save: \n' + listingEntry);
      }
      //Else, log success
      console.log('Successfully saved: \n' + listingEntry);
    });
  });
});


/*
  Once you've written + run the script, check out your MongoLab database to ensure that
  it saved everything correctly.
  
 */
