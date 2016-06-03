var express = require('express');

var app = express();

app.use(express.static(__dirname + '/app/dist'));

app.listen(21010, function() {
    console.log('listening on port', 21010);
});