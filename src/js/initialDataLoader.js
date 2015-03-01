/*
 * This component defines which initial data should be loaded for each route so
 * we can prerender pages in the server if possible
 *
 * It uses pattern matching to figure out which route we're currently handling
 * and for each route it returns a promise with the necessary initial data
 */

const Promise = require('es6-promise').Promise;
const Immutable = require('immutable');

const routes = require('./routes');

const locationStore = require('./stores/locations');
const locationActions = require('./actions/locations');

let dataRoutes = Immutable.OrderedMap();

setDataHandler('list', () => {
  return new Promise((resolve) => {
    locationStore.listen(function (locations) {
      resolve(locations);
    });
    locationActions.load();
  });
});

setDataHandler('home', () => {
  return Promise.resolve(null);
});

function setDataHandler(routeName, handler) {
  dataRoutes = dataRoutes.set(routes.get(routeName), handler);
}

module.exports = (navpath) => {
  for(let [re, dataFetcher] of dataRoutes.entries()){
    if(re.test(navpath)){
      return dataFetcher();
    }
  }
};
