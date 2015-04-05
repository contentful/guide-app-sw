const Reflux = require('reflux');
const Immutable = require('Immutable');
const contentful = require('../contentful').client();
const locationActions = require('../actions/locations');

function getRev(value) {
  return value.getIn(['sys', 'revision']);
}

module.exports = Reflux.createStore({
  init() {
    this.locations = Immutable.List();

    this.listenTo(locationActions.loadOne, this.onLoadOne);
    this.listenTo(locationActions.loadAll, this.onLoadAll);
  },

  onLoadAll() {
    contentful.entries()
    .then(entries => {
      this.mergeNewData(entries);
    });
  },

  onLoadOne(id) {
    contentful.entries({
      'sys.id': id
    })
    .then(entries => {
      this.mergeNewData(entries);
    })
    .catch(err => {
      console.log('Error fetching entry', err);
    });
  },

  mergeNewData(entries) {
    this.locations = this.locations
    .mergeWith(
      (prev, next) => {
        if((next && prev && getRev(next) > getRev(prev)) || (!prev && next))
          return next;
        return prev;
      },
      Immutable.fromJS(JSON.parse(JSON.stringify(entries)))
    );
    this.trigger(this.locations.toJS());
  },

  getAll() {
    return this.locations.toJS();
  },

  get(id) {
    var location = this.locations
    .find(val => {
      return val.getIn(['sys', 'id']) === id;
    }).toJS();
    return location;
  }

});
