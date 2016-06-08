import React from 'react';

// Sub component which maps through the array of actors/activites returned from the API.
let Providers = React.createClass({
  render: function() {
    console.log('providers', this.props.data.providerArray);
    return (
      <div>
        <div>
            {
                this.props.data.providerArray.map(function(providerObject) {
                    return (
                        <div key={providerObject.name}>
                            <h2>{providerObject.name}</h2>
                                <div className="actor-container">
                                    {
                                        providerObject.data.map(function(actor) {
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
                })
            }  
        </div>
      </div>
    )
  }
});

export default Providers;