import React from 'react';
import { Link, IndexLink, RouteHandler } from 'react-router';
import Axios from 'axios';
import $ from 'jquery';

// Component that serves as the layout for the entire project. Contains the navbar and main container, which houses the {this.props.children} which works with react router to find what needs to be rendered depending on the URL.
let MainLayout = React.createClass({
  // Runs the http request on page load, although download is optional.
  componentDidMount: function() {
    this.getTextDocument();
  },
  // HTTP request for data to download as text file, AJAX request automatically sends cookies defined in back-end. I.E ('SESSION', 'NUVI-12345')
  getTextDocument: function() {
    $.ajax({
      type: 'GET',
      url: 'https://nuvi-challenge.herokuapp.com/activities',
      cache: false,
      crossDomain: true,
      success: function(data) {
        console.log('success', data);
        let document = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
        // More jQuery to bind the download to the <a> tag with Id 'of text-document', so the download is optional and must be started by the user.
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
              <li><a id="new-text-doc" onClick={() => { this.getTextDocument() }}>Get New Download Data</a></li>
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