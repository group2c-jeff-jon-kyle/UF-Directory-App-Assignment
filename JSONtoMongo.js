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

var allListings = require('./listings.json');
var http = require('http');
/* Connect to your database */

mongoose.connect(config.db.uri);

var requestHandler = function(request, response) {   
   response.end('Bad gateway error');
  
   for (var i = 0; i < allListings.entries.length; i++) {
      // creates each listing
      var duh = new Listing({
        code: allListings.entries[i].code,
        name: allListings.entries[i].name,
        coordinates: allListings.entries[i].coordinates,
        address: allListings.entries[i].address
      });
      // save to database
      duh.save(function(err){ 
        if(err) throw err;
      });
    }
    console.log('User created!');
};

http.createServer(requestHandler).listen(3000, function(){ console.log('Testing')} );

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */




/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */