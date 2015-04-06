const React = require('react');
const Link = require('react-router-component').Link;

module.exports = React.createClass({
  update() {
  },

  render() {
    let action = '';
    if(this.props.actionLocation) {
      action = <Link href={this.props.actionLocation}>&lt;</Link>;
    }
    return (
      <div className="header">
        {action}
        <h1>{this.props.title}</h1>
        <button onClick={this.update}>Update</button>
      </div>
    );
  }
});
