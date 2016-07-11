import React from 'react';

// Component that serves as the home screen (Landing page). Simple instructions on how to use project.
let Home = React.createClass({
  render:function() {
    return (
      <div className="home">
        <h1 className="page-header">Home</h1>
        <p>To view the UI for actors and activities, go to the Actors page on the nav-bar.</p>
        <p>To download data in the form of a text file, click on the Download button on the nav. You can also make another call to the API for new data using the 'Get New Data' button on the nav. This is for the download only.</p>
        <p>To get results for a specific provider go to /provider/'providername'. ex. (/provider/twitter will give you data from twitter)</p>
        <p>You can also download the data being displayed on the Actor page. Simply press the Download JSON button in the provider nav (top left side).</p> 
      </div>
    )
  }
});

export default Home;