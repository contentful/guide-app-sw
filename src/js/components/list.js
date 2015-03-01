const React = require('react');
const Reflux = require('reflux');
const Link = require('react-router-component').Link;

const locationsStore = require('../stores/locations');
const locationActions = require('../actions/locations');

const Header = require('./header');

module.exports = React.createClass({
  mixins: [Reflux.connect(locationsStore, 'locations')],

  getInitialState() {
    return {locations: []};
  },

  componentWillMount() {
    if(this.props.initialData &&
       this.props.initialData.data.length > 0 &&
       this.props.initialData.name === 'list'){
      this.setState({locations: this.props.initialData.data});
    }
  },

  componentDidMount() {
    locationActions.loadAll();
  },

  render() {
    const items = this.state.locations.map(item => {
      return (
        <li key={item.sys.id}>
          <p className="list__name"><Link href={'/location/' + item.sys.id}>{item.fields.name}</Link></p>
          <p className="list__type">{item.fields.type}</p>
          <p className="list__rating">{item.fields.rating}</p>
        </li>
      );
    });

    return (
      <div>
        <Header title="Coffee Guide" />
        <div className="content">
          <ul>
            {items}
          </ul>
        </div>
      </div>
    );
  }
});
