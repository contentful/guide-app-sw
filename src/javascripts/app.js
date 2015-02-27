const React = require('react');
const Router = require('react-router');
const {Route, RouteHandler, DefaultRoute, HistoryLocation} = Router;

const LoginButton     = require('./components/login');
const Home            = require('./components/home');
const SuccessfulLogin = require('./components/successful_login');
const FailedLogin     = require('./components/failed_login');

const App = React.createClass({
  render() {
    return (
      <main>
        <nav>
          Some nav maybe
        </nav>

        <RouteHandler/>
      </main>
    );
  }
});

const routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={Home}/>
    <Route name="successful_login" handler={SuccessfulLogin}/>
    <Route name="failed_login" handler={FailedLogin}/>
  </Route>
);

Router.run(routes, HistoryLocation, Handler => {
  React.render(<Handler/>, document.getElementById('appContainer'));
});

