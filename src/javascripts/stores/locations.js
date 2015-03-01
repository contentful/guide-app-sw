const Reflux = require('reflux');
const contentful = require('../contentful').client();
const locationActions = require('../actions/locations');

module.exports = Reflux.createStore({
  listenables: locationActions,

  onLoad() {
    contentful.entries().then(entries => {
      this.locations = entries;
      this.trigger(entries);
    });
  }
});
