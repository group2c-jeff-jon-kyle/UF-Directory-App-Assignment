//Modules
var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    port = 8080;

//Global variables
var listingData, server;

//Handles users accessing the server
var requestHandler = function(request, response) {
  //Get the requested Url as an object.
  var parsedUrl = url.parse(request.url);

  //If a GET request is sent to the 'listings' paths
  if (parsedUrl.path=='/listings'){
    console.log(listingData);
    response.writeHead(200, {'Content-Type': 'application/json'});
    //Convert JSON data to string
    response.write(JSON.stringify(listingData));
  }
  else{
    //Otherwise, send a 404 error.
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Bad gateway error');
  }
  //Signal completion
  response.end();
};

//A server is created, but not started.
server = http.createServer(requestHandler);

//Read file asynchronously (callback function)
fs.readFile('listings.json', 'utf8', function(err, data) {
  //If we can't locate the file, throw an error
  if (err) throw err;
  //Save the data to a variable
  listingData = JSON.parse(data);
  //Start server on port 8080 (http://localhost:8080/)
  server.listen(port);
});
