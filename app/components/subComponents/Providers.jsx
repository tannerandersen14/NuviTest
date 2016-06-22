import React from 'react';

// Sub component which maps through and renders the array of actors/activites returned from the API, sorting them by the company they were provided by.
let Providers = React.createClass({
  switchProviderDisplay: function(provider) {
    provider.display = !provider.display;
    this.setState({data: {providerArray: this.props.data.providerArray}});
  },
  switchActorDisplay: function(actor) {
    actor.display = !actor.display;
    this.setState({data: {providerArray: this.props.data.providerArray}, comment: ''});
  },
  postComment: function(actor, comment) {
    actor.comments.push(comment);
    this.setState({data: {providerArray: this.props.data.providerArray}, comment: ''});
  },
  handleChange: function(event) {
    this.setState({comment: event.target.value});
  },
  componentWillReceiveProps: function() {
    this.setState({data: {providerArray: this.props.data.providerArray}});
  },
  getInitialState: function() {
    return {data: {providerArray: []}, comment: ''};  
  },
  render: function() {
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
                      <br />
                    </div> 
                  )
                }
                else if (!providerObject.display) {
                  return (
                    <div key={providerObject.name} className="provider-items">     
                      <h3 activeClassName="active" onClick={() => { this.switchProviderDisplay(providerObject) }}>{providerObject.name}</h3>
                      <br />
                    </div>                               
                  )
                }
              }, this)
            }
          </ul>
        </div>
        <div className="actor-container">
            { 
              this.state.data.providerArray.map(function(providerObject) {
                return (
                  <div key={providerObject.name}>
                    {
                      providerObject.data.map(function(actor) {
                        if (providerObject.display && !actor.display) {
                          return (
                            <div onMouseEnter={() => { this.switchActorDisplay(actor) }} style={{backgroundImage: 'url(' + actor.actor_avator + ')'}} className="actor-div" key={actor.id}>
                              <p>{actor.actor_username}</p>
                              <h3><a href={actor.actor_url}>{actor.actor_name}</a></h3>
                              <h4>{actor.actor_description}</h4>
                              <div>
                                <div>
                                  <p>{actor.activity_comments} Comments</p>
                                  <p>{actor.activity_date}</p>
                                  <p>{actor.activity_likes} Likes</p>
                                  <a href={actor.activity_url}>{actor.provider}</a>
                                  <p>{actor.activity_sentiment}</p>
                                  <p>{actor.activity_shares} Shares</p>                                                                     
                                </div>
                              </div>
                            </div>      
                          )
                        }
                        else if (providerObject.display && actor.display) {   
                          return (
                            <div onMouseLeave={() => { this.switchActorDisplay(actor) }} style={{backgroundImage: 'url(' + actor.actor_avator + ')'}} className="actor-div-extended" key={actor.id}>
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
                              <div className="actor-div-comments">
                                <div className="form-group">
                                  <textarea placeholder="Comment here!"className="form-control" rows="4" onChange={this.handleChange} value={this.state.comment}></textarea>
                                  <button onClick={() => { this.postComment(actor, this.state.comment) }} className="btn btn-primary">Submit Comment</button>
                                </div>
                                <div>
                                  {
                                    actor.comments.map(function(comment) {
                                      return (
                                        <div key={comment}>
                                          <p>{comment}</p>
                                        </div>
                                      )
                                    }, this)
                                  }
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