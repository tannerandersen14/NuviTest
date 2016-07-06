import React from 'react';

// Component that renders if the url selected is not found.
let NoMatch = React.createClass({
    render:function() {
        return (
            <div className="no-match">
              <h1 className="page-header">No Match (404)</h1>
              <p>That page wasn't found.</p>
            </div>
        )
    }
})

export default NoMatch;