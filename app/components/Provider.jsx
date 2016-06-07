import React from 'react';


let Provider = React.createClass({
    render:function() {
        return (
            <div className="home">
              <h1 className="page-header">Provider</h1>
              <p>This is the {this.props.params.name} page.</p>
            </div>
        )
    }
})

export default Provider;