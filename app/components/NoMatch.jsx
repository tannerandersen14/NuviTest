import React from 'react';

let Home = React.createClass({
    render:function() {
        return (
            <div className="no-match">
              <h1 className="page-header">No Match</h1>
              <p>That isn't a thing</p>
            </div>
        )
    }
})

export default Home;