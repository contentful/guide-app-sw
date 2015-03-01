const React = require('react');
const Reflux = require('reflux');

const locationStore = require('../stores/location');
const locationActions = require('../actions/locations');

const Header = require('./header');

module.exports = React.createClass({
  mixins: [Reflux.connect(locationStore, 'location')],

  getInitialState() {
    return {
      location: {
        fields: {}
      }
    };
  },

  componentWillMount() {
    if(this.props.initialData &&
       this.props.initialData.data &&
       this.props.initialData.name === 'location'){
      this.setState({location: this.props.initialData.data});
    }
  },

  componentDidMount() {
    locationActions.loadOne(this.props.id);
  },

  render() {
    var fields = this.state.location.fields;
    return (
      <div>
        <Header title={fields.name} actionLocation="/" />
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
      </div>
    );
  }
});
