import React from 'react';


let Home = React.createClass({
    render:function() {
        return (
            <div className="home">
              <h1 onClick={this.getActors} className="page-header">Home</h1>
              <p>This is the home page</p>
            </div>
        )
    }
})

export default Home;