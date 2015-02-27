require('babel/register');

var express = require('express');
var React = require('react');
var fs = require('fs');
var url = require('url');
var path = require('path');

var contentful = require('contentful');

var config = require('./config.json');
var contentfulClient = contentful.createClient({
  accessToken: config.accessToken,
  space: config.space
});

var dispatcher = require('./src/javascripts/dispatcher');
require('./src/javascripts/stores/locations')(contentfulClient, dispatcher);

var server = express();

server.use('/js', express.static(path.join(__dirname, 'build', 'js')));
server.use('/css', express.static(path.join(__dirname, 'build', 'css')));

server.get('/*', function (req, res) {
  var App = React.createFactory(require('./src/javascripts/components/app'));
  var navpath = url.parse(req.url).pathname;
  dispatcher.register(function(payload) {
    if(payload.actionType === 'set-initial-data'){
      var client = App({path: navpath, initialData: payload.initialData});
      var markup = React.renderToString(client);
      res.type('html');
      var index = fs.readFileSync('build/index.html', 'utf-8');
      res.send(index
               .replace('<!--MARKUP-->', markup)
               .replace('<!--CONFIG-->', JSON.stringify(config))
               .replace('<!--INITIALDATA-->', payload.initialData ? JSON.stringify(payload.initialData) : 'null')
              );
    }
  });
  dispatcher.dispatch({
    actionType: 'get-initial-data',
    path: navpath
  });
});

console.log('Listening on ' + config.port);
server.listen(config.port);
