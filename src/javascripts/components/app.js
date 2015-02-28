const React = require('react');
const Router = require('react-router-component');
const {Locations, Location, Link} = Router;

const dispatcher = require('../dispatcher');

const Home = require('./home');
const List = require('./list');

module.exports = React.createClass({
  getInitialState() {
    return {
      initialData: null
    };
  },

  // This method always renders on the server so we use it to set the state
  // if we managed to fetch any data for the initial server render
  componentWillMount() {
    if(this.props.initialData){
      this.setState({initialData: this.props.initialData});
    }
  },

  render() {
    return (
      <main>
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/list">List</Link></li>
          </ul>
        </nav>

        <Locations path={this.props.path}>
          <Location path="/" handler={Home} />
          <Location path="/list" handler={List} entries={this.state.initialData} />
        </Locations>
      </main>
    );
  }
});
