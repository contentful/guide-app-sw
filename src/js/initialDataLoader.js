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

const locationStore = require('./stores/location');
const locationsStore = require('./stores/locations');
const locationActions = require('./actions/locations');

let dataRoutes = Immutable.OrderedMap();

setDataHandler('location', (id) => {
  return new Promise((resolve) => {
    locationStore.listen(function (locations) {
      resolve(locations);
    });
    locationActions.loadOne(id);
  });
});

setDataHandler('list', () => {
  return new Promise((resolve) => {
    locationsStore.listen(function (locations) {
      resolve(locations);
    });
    locationActions.loadAll();
  });
});

function setDataHandler(routeName, handler) {
  dataRoutes = dataRoutes.set(routes.get(routeName), {
    name: routeName,
    handler: handler
  });
}

module.exports = (navpath) => {
  for(let [re, route] of dataRoutes.entries()){
    const matched = re.exec(navpath);
    if(matched){
      return route.handler(...matched.slice(1, matched.length))
      .then(result => {
        return {
          name: route.name,
          data: result
        };
      });
    }
  }
  return Promise.resolve();
};
