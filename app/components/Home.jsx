import React from 'react';

// Component that serves as the home screen (Landing page). Simple instructions on how to use project.
let Home = React.createClass({
  render:function() {
    return (
      <div className="home-page">
        <h1 className="page-header">Home</h1>
        <h3>To view the UI for actors and activities, go to the Actors page on the nav-bar.</h3>
        <br />
        <h3>To download data in the form of a text file, click on the Download button on the nav. You can also make another call to the API for new data using the 'Get New Data' button on the nav. This is for the download only.</h3>
        <br />
        <h3>To get results for a specific provider go to /provider/'providername'. ex. (/provider/twitter will give you data from twitter)</h3>
        <br />
        <h3>You can also download the data being displayed on the Actor page. Simply press the Download JSON button in the provider nav (top left side).</h3> 
      </div>
    )
  }
});

export default Home;