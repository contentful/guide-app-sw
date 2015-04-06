const Reflux = require('reflux');
const Immutable = require('Immutable');
const _ = require('lodash');
const dataSource = require('../dataSource');
const locationActions = require('../actions/locations');

function getRev(value) {
  return value.getIn(['sys', 'revision']);
}

function singleEntryFilter(id, val) {
  return val.getIn(['sys', 'id']) === id;
}

module.exports = Reflux.createStore({
  init() {
    this.locations = Immutable.List();

    this.listenTo(locationActions.addOne, this.onAddOne);
    this.listenTo(locationActions.addMany, this.onAddMany);
    this.listenTo(locationActions.loadPage, this.onLoadPage);
    this.listenTo(locationActions.loadOne, this.onLoadOne);
  },

  onAddOne(item) {
    this.mergeNewData([item]);
  },

  onAddMany(items) {
    this.mergeNewData(items);
  },

  onLoadPage() {
    dataSource.loadEntriesPage()
    .then(entries => {
      this.mergeNewData(entries);
    });
  },

  onLoadOne(id) {
    dataSource.loadSingleEntry(id)
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
    this.trigger(this.locations);
  },

  getAll() {
    return this.locations;
  },

  get(id) {
    var location = this.locations
    .find(_.partial(singleEntryFilter, id));
    return location;
  }
});
