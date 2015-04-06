const React = require('react');
const Router = require('react-router-component');

const routes = require('../routes');

const List = require('./list');
const Location = require('./location');

module.exports = React.createClass({
  render() {
    return (
      <main>
        <Router.Locations path={this.props.path}>
          <Router.Location path={routes.get('location')} matchKeys={['id']} handler={Location} />
          <Router.Location path={routes.get('list')} handler={List} />
        </Router.Locations>
      </main>
    );
  }
});
