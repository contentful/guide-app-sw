const React = require('react');
const Router = require('react-router-component');
const {Locations, Location, Link} = Router;

const Home = require('./home');
const List = require('./list');

module.exports = React.createClass({
  render() {
    return (
      <main>
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/list">List</Link></li>
          </ul>
        </nav>
        <p>{this.props.source}</p>

        <Locations path={this.props.path}>
          <Location path="/" handler={Home}/>
          <Location path="/list" handler={List}/>
        </Locations>
      </main>
    );
  }
});
