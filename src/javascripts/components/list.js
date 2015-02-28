const React = require('react');
const dispatcher = require('../dispatcher');

module.exports = React.createClass({
  getInitialState() {
    return {entries: []};
  },

  componentWillMount() {
    if(this.props.entries && this.props.entries.length > 0){
      this.setState({entries: this.props.entries});
    }
  },

  componentDidMount() {
    dispatcher.register(payload => {
      if(payload.actionType === 'received-entries'){
        this.setState({entries: payload.entries});
      }
    });
    if(this.state.entries.length === 0){
      dispatcher.dispatch({ actionType: 'get-entries' });
    }
  },

  render() {
    const items = this.state.entries.map(item => {
      return <p key={item.sys.id}>Item is: {item.fields.name}</p>;
    });

    return (<div>{items}</div>);
  }
});
