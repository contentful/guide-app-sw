const React = require('react');
const App = React.createFactory(require('./components/app'));

const contentful = require('contentful');

const config = window.contentfulConfig;
const contentfulClient = contentful.createClient({
  accessToken: config.accessToken,
  space: config.space
});
const initialData = window.initialData;

const dispatcher = require('./dispatcher');
require('./stores/locations')(contentfulClient, dispatcher);

React.render(
  App({
    path: window.location.pathname,
    initialData: initialData
  }),
  document.getElementById('appContainer')
);
