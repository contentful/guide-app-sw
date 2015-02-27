const React = require('react');
const App = React.createFactory(require('./components/app'));

const contentful = require('contentful');

// Contentful client setup on the client
const config = window.contentfulConfig;
const contentfulClient = contentful.createClient({
  accessToken: config.accessToken,
  space: config.space
});
// If the server has rendered initial data it'll be available here
// That way we can feed it to React so it knows not to rerender
const initialData = window.initialData;

// Dispatcher and stores setup
const dispatcher = require('./dispatcher');
require('./stores/locations')(contentfulClient, dispatcher);

// Initialize the app based on the current route
React.render(
  App({
    path: window.location.pathname,
    initialData: initialData
  }),
  document.getElementById('appContainer')
);
