// Let's use ES6 on required files
require('babel/register');

var express = require('express');
var React = require('react');
var fs = require('fs');
var url = require('url');
var path = require('path');

var contentful = require('contentful');

// Contentful client setup on the server
var config = require('./config.json');
var contentfulClient = contentful.createClient({
  accessToken: config.accessToken,
  space: config.space
});

// Dispatcher and stores setup
var dispatcher = require('./src/javascripts/dispatcher');
require('./src/javascripts/stores/locations')(contentfulClient, dispatcher);

var server = express();

server.use('/js', express.static(path.join(__dirname, 'build', 'js')));
server.use('/css', express.static(path.join(__dirname, 'build', 'css')));

// We have only one HTML file and we'll let React take care of routing
// So we'll handle everything here that isn't a static resource
server.get('/*', function (req, res) {
  var App = React.createFactory(require('./src/javascripts/components/app'));
  var navpath = url.parse(req.url).pathname;
  dispatcher.register(function(payload) {
    if(payload.actionType === 'set-initial-data'){
      // Initialize the main app component in the server with data for the requested route
      var client = App({path: navpath, initialData: payload.initialData});
      var markup = React.renderToString(client);
      res.type('html');
      var index = fs.readFileSync('build/index.html', 'utf-8');
      // Quick and dirty templating
      res.send(index
               .replace('<!--MARKUP-->', markup)
               .replace('<!--CONFIG-->', JSON.stringify(config))
               .replace('<!--INITIALDATA-->', payload.initialData ? JSON.stringify(payload.initialData) : 'null')
              );
    }
  });
  // Fire up the initial data request based on the current route
  dispatcher.dispatch({
    actionType: 'get-initial-data',
    path: navpath
  });
});

console.log('Listening on ' + config.port);
server.listen(config.port);
