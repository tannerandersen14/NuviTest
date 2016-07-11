// Node backend running Express.
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

// Sets the cookie to send with our http requests.
app.use(function(request, response, next) {
  var cookie = request.cookies.cookieName;
  if (cookie === undefined) { 
    response.cookie('SESSION', 'NUVI-12345');
  }
  next();
});

// Points server to build folder.
app.use(express.static(__dirname + '/app/dist'));

// Piece of code that allows browser to refresh on any page, not just the landing page. Server now looks to the index on refresh even if the url isn't on the landing page.
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname + '/app/dist/index.html'))
});

// Server listens on port 21010 and logs it.
app.listen(21010, function() {
  console.log('listening on port', 21010);
});