// Node backend running Express.
const express = require('express');
const path = require('path');
const app = express();

// Points server to build folder.
app.use(express.static(__dirname + '/app/dist'));

// Piece of code that allows browser to refresh on any page, not just the landing page. Server now looks to the index on refresh even if the url isn't on the landing page.
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname + '/app/dist/index.html'))
})

// Express listens on port 21010 and logs it.
app.listen(21010, function() {
    console.log('listening on port', 21010);
});