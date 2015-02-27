const React = require('react');
const Router = require('react-router-component');
const {Locations, Location} = Router;

const Home = require('./home');

module.exports = React.createClass({
  render() {
    return (
      <main>
        <nav>
          Nav v2
        </nav>

        <Locations path={this.props.path}>
          <Location path="/" handler={Home}/>
        </Locations>
      </main>
    );
  }
});
