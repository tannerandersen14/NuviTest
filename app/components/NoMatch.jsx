import React from 'react';

let Home = React.createClass({
    render:function() {
        return (
            <div className="no-match">
              <h1 className="page-header">No Match (404)</h1>
              <p>That page wasn't found.</p>
            </div>
        )
    }
})

export default Home;