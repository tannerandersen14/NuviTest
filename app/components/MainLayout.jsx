import React from 'react';
import { Link, IndexLink, RouteHandler } from 'react-router';

let MainLayout = React.createClass({
  render: function() {
    return (
      <div className="app">
        <header className="primary-header"></header>
        <nav className="navbar navbar-default">
          <ul className="nav navbar-nav">
            <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
            <li><Link to="/actors" activeClassName="active">Actors</Link></li>
          </ul>
        </nav>
        <main className="container">
          {this.props.children}
        </main>
      </div>
    );
  }
});

export default MainLayout;