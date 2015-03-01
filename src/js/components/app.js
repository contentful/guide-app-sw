const React = require('react');
const Router = require('react-router-component');

const routes = require('../routes');

const List = require('./list');
const Location = require('./location');

module.exports = React.createClass({
  // getInitialState() {
  //   return {
  //     initialData: null
  //   };
  // },

  // // This method always renders on the server so we use it to set the state
  // // if we managed to fetch any data for the initial server render
  // componentWillMount() {
  //   if(this.props.initialData){
  //     this.setState({initialData: this.props.initialData});
  //   }
  // },

  render() {
    return (
      <main>
        <Router.Locations path={this.props.path}>
          <Router.Location path={routes.get('location')} matchKeys={['id']} handler={Location} initialData={this.props.initialData} />
          <Router.Location path={routes.get('list')} handler={List} initialData={this.props.initialData} />
        </Router.Locations>
      </main>
    );
  }
});
