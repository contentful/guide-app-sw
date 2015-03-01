const React = require('react');

module.exports = React.createClass({
  render() {
    return (
      <div className="header">
        <h1>{this.props.title}</h1>
      </div>
    );
  }
});
