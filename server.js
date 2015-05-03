// Let's use ES6 on required files
require('babel/register');

var express = require('express');
var React = require('react');
var fs = require('fs');
var url = require('url');
var path = require('path');

var config = require('./config.json');

// Contentful client setup on the server
var contentful = require('./src/js/contentful');
contentful.init(config);

var initialDataLoader = require('./src/js/initialDataLoader');

var server = express();

server.get('/sw.js', function (req, res) {
  res.sendFile('build/sw.js', {root: __dirname});
});
server.use('/js', express.static(path.join(__dirname, 'build', 'js')));
server.use('/css', express.static(path.join(__dirname, 'build', 'css')));

// We have only one HTML file and we'll let React take care of routing
// So we'll handle everything here that isn't a static resource
server.get('/*', function (req, res) {
  var App = React.createFactory(require('./src/js/components/app'));
  var navpath = url.parse(req.url).pathname;


  // Initialize the main app component in the server with data for the requested route
  initialDataLoader.handleServerData(navpath).then(function (initialData) {
    res.type('html');
    var client = App({path: navpath, initialData: initialData});
    try {
      var markup = React.renderToString(client);
      var index = fs.readFileSync('build/index.html', 'utf-8');
      // Quick and dirty templating
      res.send(index
               .replace('<!--MARKUP-->', markup)
               .replace('<!--CONFIG-->', JSON.stringify(config))
               .replace('<!--INITIALDATA-->', initialData ? JSON.stringify(initialData) : 'null')
              );
    } catch(err) {
      var message = 'Rendering error: ' + err.message;
      console.log(message);
      console.log(err);
      res.status(500).send(message);
    }
  });
});

console.log('Listening on ' + config.port);
server.listen(config.port);
