const React = require('react');
const Router = require('react-router-component');
const {Locations, Location} = Router;

const Home = require('./components/home');

const App = React.createClass({
  render() {
    return (
      <main>
        <nav>
          Some nav maybe and some others
        </nav>

        <Locations>
          <Location path="/" handler={Home}/>
        </Locations>
      </main>
    );
  }
});


React.renderComponent(<App/>, document.getElementById('appContainer'));

