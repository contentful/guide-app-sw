const React = require('react');
const App = React.createFactory(require('./components/app'));

React.render(
  App({path: window.location.pathname, source: 'server'}),
  document.getElementById('appContainer')
);
