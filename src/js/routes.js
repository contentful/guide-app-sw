const Immutable = require('immutable');

module.exports = Immutable.Map({
  location: /\/location\/([\w|\d]*)/,
  list: /\//
});
