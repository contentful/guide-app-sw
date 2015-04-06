const React = require('react');
const Reflux = require('reflux');

const locationsStore = require('../stores/locations');

const Header = require('./header');

module.exports = React.createClass({
  mixins: [Reflux.connectFilter(
    locationsStore,
    'location',
    function(){
      return locationsStore.get(this.props.id) || this.state.location;
    }
  )],

  getInitialState() {
    return {
      location: locationsStore.get(this.props.id)
    };
  },

  render() {
    const fields = this.state.location.get('fields').toJS();
    let content = '', name = '';
    if(fields){
      name = fields.name;
      content = (
        <div className="content">
          <p><img src={fields.pictures[0].fields.file.url} /></p>
          <p>{fields.type}</p>
          <p>Description: {fields.description}</p>
          <p>Opening times: {fields.openingTimes}</p>
          <p>Address: {fields.address}</p>
          <p>Phone: {fields.phoneNumber}</p>
          <p>Website: {fields.url}</p>
          <p>Email: {fields.email}</p>
        </div>
      );
    }

    return (
      <div>
        <Header title={name} actionLocation="/" />
        {content}
      </div>
    );
  }
});
