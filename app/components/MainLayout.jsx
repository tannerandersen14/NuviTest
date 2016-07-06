import React from 'react';
import { Link, IndexLink, RouteHandler } from 'react-router';

// Component that serves as the layout for the entire project. Contains the navbar and main div, which houses the {this.props.children} which works with react router to find what needs to be rendered depending on the URL.
let MainLayout = React.createClass({
  render: function() {
    return (
      <div className="app">
        <header className="primary-header"></header>
        <nav className="navbar navbar-default navbar-fixed-top">
          <ul className="nav navbar-nav">
            <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
            <li><Link to="/actors" activeClassName="active">Actors</Link></li>
          </ul>
        </nav>
        <main className="container-background">
          <div className="container-fluid container-inherit">
            {this.props.children}
          </div>
        </main>
      </div>
    );
  }
});

export default MainLayout;