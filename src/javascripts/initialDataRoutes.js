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
