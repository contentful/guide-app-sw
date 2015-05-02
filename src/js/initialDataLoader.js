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

const locationsStore = require('./stores/locations');
const locationActions = require('./actions/locations');

let dataRoutes = Immutable.Map();

setDataHandler('location', (id) => {
  return new Promise((resolve) => {
    locationsStore.listen(function () {
      resolve(locationsStore.get(id));
    });
    locationActions.loadOne(id);
  });
});

setDataHandler('list', () => {
  return new Promise((resolve) => {
    locationsStore.listen(function () {
      resolve(locationsStore.getAll());
    });
    locationActions.loadPage();
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
      console.log('matched route', navpath);
      return route.handler(...matched.slice(1, matched.length));
    }
  }
  return Promise.reject();
};
