const React = require('react');
const Router = require('react-router-component');
const {Locations, Location, Link} = Router;

const dispatcher = require('../dispatcher');

const Home = require('./home');
const List = require('./list');

module.exports = React.createClass({
  getInitialState() {
    return {
      entries: []
    };
  },

  // This method always renders on the server so we use it to set the state
  // if we managed to fetch any data for the initial server render
  componentWillMount() {
    if(this.props.initialData)
      this.setState({entries: this.props.initialData});
  },

  // This method only runs on the client, so if we have no initial data
  // we'll fetch it here
  // On first render, if it was rendered on the server it should've also
  // been passed down via this.props.initialData
  componentDidMount() {
    if(!this.props.initialData) {
      dispatcher.register(payload => {
        if(payload.actionType === 'set-initial-data'){
          this.setState({entries: payload.initialData});
        }
      });
      dispatcher.dispatch({
        actionType: 'get-initial-data',
        path: this.props.path
      });
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
          <Location path="/list" handler={List} entries={this.state.entries} />
        </Locations>
      </main>
    );
  }
});
