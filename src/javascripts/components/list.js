const React = require('react');
const Reflux = require('reflux');

const locationStore = require('../stores/locations');
const locationActions = require('../actions/locations');

module.exports = React.createClass({
  mixins: [Reflux.connect(locationStore, 'entries')],

  getInitialState() {
    return {entries: []};
  },

  componentWillMount() {
    if(this.props.entries && this.props.entries.length > 0){
      this.setState({entries: this.props.entries});
    }
  },

  componentDidMount() {
    locationActions.load();
  },

  render() {
    const items = this.state.entries.map(item => {
      return <p key={item.sys.id}>Item is: {item.fields.name}</p>;
    });

    return (<div>{items}</div>);
  }
});
