/*
 * This component defines which initial data should be loaded for each route so
 * we can prerender pages in the server if possible
 *
 * It uses pattern matching to figure out which route we're currently handling
 * and for each route it returns a promise with the necessary initial data
 */

const Promise = require('es6-promise').Promise;

const locationStore = require('./stores/locations');
const locationActions = require('./actions/locations');

let actions = new Map();

actions.set(/\/$/, () => {
  return Promise.resolve(null);
});

actions.set(/list$/, () => {
  return new Promise((resolve) => {
    locationStore.listen(function (locations) {
      resolve(locations);
    });
    locationActions.load();
  });
});

module.exports = {
  load(navpath) {
    for(let [re, action] of actions.entries()){
      if(re.test(navpath)){
        return action();
      }
    }
  }

};
