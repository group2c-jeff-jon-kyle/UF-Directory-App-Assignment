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
 //Readfile: https://nodejs.org/api/fs.html#fs_fs_readfile_file_options_callback
 fs.readFile('listings.json', 'utf8', function(error, data) {

  //If there's an error, log and throw error
  if(error) {
    console.log('Cannot read file')
    throw error;
  }


});


/*
  Once you've written + run the script, check out your MongoLab database to ensure that
  it saved everything correctly.
 */
