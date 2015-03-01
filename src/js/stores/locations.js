const Reflux = require('reflux');
const contentful = require('../contentful').client();
const locationActions = require('../actions/locations');

module.exports = Reflux.createStore({
  init() {
    this.listenTo(locationActions.loadAll, this.onLoadAll);
  },

  onLoadAll() {
    contentful.entries()
    .then(entries => {
      this.locations = entries;
      this.trigger(entries);
    });
  }

});
