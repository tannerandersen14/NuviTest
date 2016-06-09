import React from 'react';

// Sub component which maps through the array of actors/activites returned from the API.
let Providers = React.createClass({
  switchDisplay: function(provider) {
      provider.display = !provider.display;
      console.log(provider);
      this.setState({data: {providerArray: this.state.data.providerArray}})
  },
  componentWillReceiveProps: function() {
      this.setState({data: {providerArray: this.props.data.providerArray}});
  },
  getInitialState: function() {
    return {data: {providerArray: []}};  
  },
  render: function() {
    console.log('providers', this.state.data.providerArray);
    console.log('otherproviders', this.props.data.providerArray);
    return (
      <div>
        <div>
            {
                this.state.data.providerArray.map(function(providerObject) {
                    return (
                        <div key={providerObject.name}>
                            <h2 onClick={() => { this.switchDisplay(providerObject) }}>{providerObject.name}</h2>
                                <div className="actor-container">
                                    {
                                        providerObject.data.map(function(actor) {
                                            if (providerObject.display) {
                                                return (
                                                
                                                    <div style={{backgroundImage: 'url(' + actor.actor_avator + ')'}} className="actor-div" key={actor.id}>
                                                        <p>{actor.actor_username}</p>
                                                        <h3><a href={actor.actor_url}>{actor.actor_name}</a></h3>
                                                        <h4>{actor.actor_description}</h4>
                                                    </div> 
                                                )
                                            }
                                        })
                                    }
                               </div>
                        </div>
                    )
                }, this)
            }
        </div>
      </div>
    )
  }
});

export default Providers;