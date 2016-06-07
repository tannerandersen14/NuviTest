const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/app/dist'));

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname + '/app/dist/index.html'))
})

app.listen(21010, function() {
    console.log('listening on port', 21010);
});