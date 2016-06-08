import React from 'react';
import axios from 'axios';


let Provider = React.createClass({
  getProviderData: function() {
      axios.get('https://nuvi-challenge.herokuapp.com/activities')
      .then(function (response) {
          for (var i = 0; i < response.data.length; i++) {
              if (response.data[i].provider == this.props.params.name) {
                  this.state.data.providerData.push(response.data[i]);
              }
          }
          this.setState({data: {providerData: this.state.data.providerData}})
      }.bind(this)) 
  },
  getInitialState: function() {
        return {data: {providerData: []}};
  },
  componentDidMount: function() {
      this.getProviderData();
  },
  render: function() {
    return (
      <div>
        <h1 className="page-header">Provider</h1>
        <p>{this.props.params.name}</p>
        <div className="actor-container">
            {
                this.state.data.providerData.map(function(actor) {
                    return (
                        <div style={{backgroundImage: 'url(' + actor.actor_avator + ')'}} className="actor-div" key={actor.id}>
                            <p>{actor.actor_username}</p>
                            <h3><a href={actor.actor_url}>{actor.actor_name}</a></h3>
                            <h4>{actor.actor_description}</h4>
                        </div>
                    )
                })
            }  
        </div>
      </div>
    )
  }
});

export default Provider;