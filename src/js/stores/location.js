const Reflux = require('reflux');
const contentful = require('../contentful').client();
const locationActions = require('../actions/locations');

module.exports = Reflux.createStore({
  init() {
    this.listenTo(locationActions.loadOne, this.onLoadOne);
  },

  onLoadOne(id) {
    contentful.entries({
      'sys.id': id
    })
    .then(entries => {
      this.location = entries[0];
      this.trigger(entries[0]);
    })
    .catch(err => {
      console.log('Error fetching entry', err);
    });
  }

});
