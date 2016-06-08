import React from 'react';
import { Link } from 'react-router';



// Sub component which maps through the array of actors/activites returned from the API.
let ActorList = React.createClass({
  render: function() {
    console.log('actors', this.props.data.actors);
    // List of names of providers provided by APIs, act as link to list of activites from respective providers.
    return (
      <div>
        <div className="actor-container">
            {
                this.props.data.actors.map(function(actor) {
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

export default ActorList;