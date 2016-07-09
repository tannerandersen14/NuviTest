import React from 'react';

// Component that serves as the home screen (Landing page). Simple instructions on how to use project.
let Home = React.createClass({
  render:function() {
    return (
      <div className="home">
        <h1 className="page-header">Home</h1>
        <p>This is the home page</p>
      </div>
    )
  }
});

export default Home;