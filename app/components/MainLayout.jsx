import React from 'react';
import { Link, IndexLink, RouteHandler } from 'react-router';
import Axios from 'axios';
import $ from 'jquery';

// Component that serves as the layout for the entire project. Contains the navbar and main div, which houses the {this.props.children} which works with react router to find what needs to be rendered depending on the URL.
let MainLayout = React.createClass({
  componentDidMount: function() {
    this.getTextDocument();
  },
  getTextDocument: function() {
    $.ajax({
      type: 'GET',
      url: 'https://nuvi-challenge.herokuapp.com/activities',
      cache: false,
      xhrFields: {
        'SESSION': 'NUVI-12345'
      },
      success: function(data) {
        console.log('success', data);
        let document = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
        $('#text-document')
        .attr({
          'href': document,
          'download': 'request.txt'
        })
      },
      error: function(status, error) {
        console.log(status, error)
      }
    })
  }.bind(this),
  render: function() {
    return (
      <div className="app">
        <header className="primary-header"></header>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="navbar-header">
              <a className="navbar-brand">NUVI Test</a>
            </div>
          <div className="container"> 
            <ul className="nav navbar-nav">
              <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
              <li><Link to="/actors" activeClassName="active">Actors</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a id="new-text-doc" onClick={() => { this.getTextDocument() }}>Get New Data</a></li>
              <li><a id="text-document">Download</a></li>
            </ul>
          </div>
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