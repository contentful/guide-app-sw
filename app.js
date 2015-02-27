require('babel/register');

var express = require('express');
var React = require('react');
var fs = require('fs');
var url = require('url');
var path = require('path');

var config = require('./config.json');

var server = express();

server.use('/js', express.static(path.join(__dirname, 'build', 'js')));
server.use('/css', express.static(path.join(__dirname, 'build', 'css')));

server.get('/*', function (req, res) {
  var App = React.createFactory(require('./src/javascripts/components/app'));
  var navpath = url.parse(req.url).pathname;
  var client = App({path: navpath, source: 'server'});
  var markup = React.renderToString(client);
  res.type('html');
  var index = fs.readFileSync('build/index.html', 'utf-8');
  res.send(index.replace('<!--MARKUP-->', markup));
});

console.log('Listening on ' + config.port);
server.listen(config.port);
