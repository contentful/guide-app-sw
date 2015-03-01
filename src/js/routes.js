const Immutable = require('immutable');

module.exports = Immutable.OrderedMap({
  location: /\/location\/([\w|\d]*)/,
  list: /\//
});
