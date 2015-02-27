var express = require('express'); // Express web server framework
var fs = require('fs');

var config = require('./config.json');

var app = express();

app.use(express.static(__dirname + '/build'));

app.get('/*', function (req, res) {
  res.type('html');
  res.send(fs.readFileSync('build/index.html'));
});

console.log('Listening on '+config.port);
app.listen(config.port);
