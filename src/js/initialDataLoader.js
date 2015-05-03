/*
 * This component defines which initial data should be loaded for each route so
 * we can prerender pages in the server if possible
 *
 * It also defines how to then load that data into the app on the client side
 *
 * It uses pattern matching to figure out which route we're currently handling
 * and for each route it returns a handler which performs the initial actions
 *
 * See the `setDataHandler` and `getDataHandler` methods documentation for more
 * details
 */

const Promise = require('es6-promise').Promise;
const Immutable = require('immutable');

const routes = require('./routes');

const locationsStore = require('./stores/locations');
const locationActions = require('./actions/locations');

let dataRoutes = Immutable.Map();

setDataHandler('location', {
  server(id) {
    return new Promise((resolve) => {
      locationsStore.listen(function () {
        resolve(locationsStore.get(id));
      });
      locationActions.loadOne(id);
    });
  },
  client(item) {
    locationActions.addOne(item);
  }
});

setDataHandler('list', {
  server() {
    return new Promise((resolve) => {
      locationsStore.listen(function () {
        resolve(locationsStore.getAll());
      });
      locationActions.loadPage();
    });
  },
  client(items) {
    locationActions.addMany(items);
  }
});

/**
 * Sets both server and client handlers on the map for a named route
*/
function setDataHandler(routeName, handlers={server: null, client: null}) {
  dataRoutes = dataRoutes.set(routes.get(routeName), {
    name: routeName,
    handlers: handlers
  });
}

/**
 * Gets the data handler for a given path and either server or client
 * environments
*/
function getDataHandler(navpath, environment='server') {
  for(let [re, route] of dataRoutes.entries()){
    const matched = re.exec(navpath);
    if(matched){
      console.log('matched route', navpath);
      return {
        matchedPath: matched,
        handler: route.handlers[environment]
      };
    }
  }
};

module.exports = {
  /**
   * Returns a promise for the server data for a given path
  */
  handleServerData(navpath) {
    var dataHandler = getDataHandler(navpath, 'server');
    if(dataHandler){
      return dataHandler.handler(...dataHandler.matchedPath.slice(1, dataHandler.matchedPath.length));
    }
    return Promise.reject();
  },

  /**
   * Calls the handler for a given path with the necessary data in order
   * to initialize data on the client
  */
  handleClientData(navpath, data) {
    var dataHandler = getDataHandler(navpath, 'client');
    if(dataHandler){
      dataHandler.handler(data);
    }
  }
};
