const React = require('react');

// Contentful client setup on the client
const config = window.contentfulConfig;
const contentful = require('./contentful');
contentful.init(config);

// If the server has rendered initial data it'll be available here
// That way we can feed it to React so it knows not to rerender
const initialData = window.initialData;

const App = React.createFactory(require('./components/app'));

// Initialize the app based on the current route
React.render(
  App({
    path: window.location.pathname,
    initialData: initialData
  }),
  document.getElementById('appContainer')
);
