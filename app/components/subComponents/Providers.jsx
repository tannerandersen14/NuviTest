import React from 'react';

// Sub component which maps through and renders the array of actors/activites returned from the API, sorting them by the company they were provided by.
let Providers = React.createClass({
  switchProviderDisplay: function(provider) {
    provider.display = !provider.display;
    console.log(provider);
    this.setState({data: {providerArray: this.state.data.providerArray}})
  },
  switchActivityDisplay: function(actor) {
    actor.display = !actor.display;
    console.log(actor);
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
        <div className="provider-nav">
          <ul className="provider-nav-content">
            {
                this.state.data.providerArray.map(function(providerObject) {
                    if (providerObject.display) {
                      return (
                        <div key={providerObject.name} className="provider-items-active">     
                          <h3 activeClassName="active" onClick={() => { this.switchProviderDisplay(providerObject) }}>{providerObject.name}</h3>
                        </div> 
                      )
                    }
                    else if (!providerObject.display) {
                      return (
                        <div key={providerObject.name} className="provider-items">     
                          <h3 activeClassName="active" onClick={() => { this.switchProviderDisplay(providerObject) }}>{providerObject.name}</h3>
                        </div>                               
                      )
                    }
                }, this)
            }
          </ul>
        </div>
        <div>
            { 
                this.state.data.providerArray.map(function(providerObject) {
                    return (
                            <div key={providerObject.name} className="actor-container">
                                    {
                                        providerObject.data.map(function(actor) {
                                            if (providerObject.display && !actor.display) {
                                                return (
                                                    <div onClick={() => { this.switchActivityDisplay(actor) }} style={{backgroundImage: 'url(' + actor.actor_avator + ')'}} className="actor-div" key={actor.id}>
                                                        <p>{actor.actor_username}</p>
                                                        <h3><a href={actor.actor_url}>{actor.actor_name}</a></h3>
                                                        <h4>{actor.actor_description}</h4>
                                                    </div> 
                                                )
                                        }
                                            else if (providerObject.display && actor.display) {   
                                                return (
                                                    <div onClick={() => { this.switchActivityDisplay(actor) }} style={{backgroundImage: 'url(' + actor.actor_avator + ')'}} className="actor-div-extended" key={actor.id}>
                                                        <p>{actor.actor_username}</p>
                                                        <h3><a href={actor.actor_url}>{actor.actor_name}</a></h3>
                                                        <h4>{actor.actor_description}</h4>
                                                        <div>
                                                            <div>
                                                                <p>{actor.activity_comments}</p>
                                                                <p>{actor.activity_date}</p>
                                                                <p>{actor.activity_likes}</p>
                                                                <a href={actor.activity_url}>{actor.provider}</a>
                                                                <p>{actor.activity_sentiment}</p>
                                                                <p>{actor.activity_shares}</p>                                                                     
                                                            </div>
                                                        </div>
                                                    </div>                                                            
                                                )                        
                                        }                                          
                                      }, this)
                                    }
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