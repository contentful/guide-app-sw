const React = require('react');

// Contentful client setup on the client
const config = window.contentfulConfig;
const contentful = require('./contentful');
contentful.init(config);

const App = React.createFactory(require('./components/app'));
const locationActions = require('./actions/locations');
const locationsStore = require('./stores/locations');

// If the server has rendered initial data it'll be available here
// That way we can feed it to the store so it knows not to rerender
locationActions.addMany(window.initialData);

// Initialize the app based on the current route
locationsStore.listen(() => {
  React.render(
    App({
      path: window.location.pathname
    }),
    document.getElementById('appContainer')
  );
});
