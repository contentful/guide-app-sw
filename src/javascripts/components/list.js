const React = require('react');

module.exports = React.createClass({
  render() {
    const items = this.props.entries.map(item => {
      return <p key={item.sys.id}>Item is: {item.fields.name}</p>;
    });

    return (<div>{items}</div>);
  }
});
