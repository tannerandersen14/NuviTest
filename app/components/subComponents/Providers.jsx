import React from 'react';


// Sub component which maps through and renders the array of actors/activites returned from the API, sorting them by the company they were provided by.
let Providers = React.createClass({
  // When user clicks on the name of the provider, all results from that provider are displayed inside the actor container. Toggled on and off.
  switchProviderDisplay: function(provider) {
    provider.display = !provider.display;
    this.setState({data: {providerArray: this.props.data.providerArray}});
  },
  // Function to be called by mouse over to switch between showing comments or not (uses the newly created display key to switch between render methods).
  switchActorDisplay: function(actor) {
    actor.display = !actor.display;
    this.setState({data: {providerArray: this.props.data.providerArray}, comment: ''});
  },
  // Posts the comment to the currently selected actor.
  postComment: function(actor, comment) {
    actor.comments.push(comment);
    this.setState({data: {providerArray: this.props.data.providerArray}, comment: ''});
  },
  // Necessary to post the comment, changes the state as user types so the comment can be posted.
  handleCommentChange: function(event) {
    this.setState({comment: event.target.value});
  },
  // Retrieve data from API call in the Actors component after it has been sorted.
  componentWillReceiveProps: function() {
    this.setState({data: {providerArray: this.props.data.providerArray}});
  },
  // Declare initial state, before data is retrieved.
  getInitialState: function() {
    return {data: {providerArray: []}, comment: ''};  
  },
  // Render to the DOM.
  render: function() {
    return (
      <div>
        <div className="provider-nav">
          <ul className="provider-nav-content">
            <a href={'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.state.data.providerArray))} download="providerArray.txt">Download JSON</a> {/* Uses html <a> tag and react variables to download current data that has been returned from the NUVI API. */}
            <br />
            <p>Click on providers to toggle their display.</p>
            {
              this.state.data.providerArray.map(function(providerObject) {
                // Div that contains all of the provider names contained within the data, uses the switchProviderDisplay function to toggle what data is displayed within the actor container. Also switches CSS so user knows what info is being displayed.
                if (providerObject.display) {
                  return (
                    <div key={providerObject.name} className="provider-items-active" onClick={() => { this.switchProviderDisplay(providerObject) }}>     
                      <h3 activeClassName="active">{providerObject.name}</h3>
                      <br />
                    </div> 
                  )
                }
                else if (!providerObject.display) {
                  return (
                    <div key={providerObject.name} className="provider-items" onClick={() => { this.switchProviderDisplay(providerObject) }}>     
                      <h3 activeClassName="active">{providerObject.name}</h3>
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
                        let commentCounter = 0; // Declaring a variable to act as a key for the comments of each div, so that comments can be dupes of eachother.
                        // If user is not moused over the activity, comments are hidden.
                        if (providerObject.display && !actor.display) {
                          return (
                            <div onMouseEnter={() => { this.switchActorDisplay(actor) }} style={{backgroundImage: 'url(' + actor.actor_avator + ')'}} className="actor-div" key={actor.id}>
                              <div className="actor-div-username">
                                <h1>{actor.actor_username}</h1>
                              </div>
                              <div>
                                <div className="actor-div-actor">
                                  <h2>Actor</h2>
                                  <h3><a href={actor.actor_url}>{actor.actor_name}</a></h3>
                                  <h3>{actor.actor_description}</h3>                       
                                </div>
                                <div className="actor-div-activities">
                                  <h2>Activity</h2>
                                  <h3>Date Posted: {actor.activity_date}</h3>
                                  <h3><a href={actor.activity_url}>{actor.provider}</a></h3>
                                  <h3>{actor.activity_comments} Comments</h3>
                                  <h3>{actor.activity_likes} Likes</h3>
                                  <h3>{actor.activity_shares} Shares</h3> 
                                </div>
                              </div>
                            </div>      
                          )
                        }
                        // If user is moused over the activity, display comments and the form to create comment.
                        else if (providerObject.display && actor.display) {   
                          return (
                            <div onMouseLeave={() => { this.switchActorDisplay(actor) }} key={actor.id}>
                              <div style={{backgroundImage: 'url(' + actor.actor_avator + ')'}} className="actor-div-extended" >
                                <div className="actor-div-username">
                                  <h1>{actor.actor_username}</h1>
                                </div>
                                <div>
                                  <div className="actor-div-actor">
                                    <h2>Actor</h2>
                                    <h3><a href={actor.actor_url}>{actor.actor_name}</a></h3>
                                    <h3>{actor.actor_description}</h3>                       
                                  </div>
                                  <div className="actor-div-activities">
                                    <h2>Activity</h2>
                                    <h3>Date Posted: {actor.activity_date}</h3>
                                    <h3><a href={actor.activity_url}>{actor.provider}</a></h3>
                                    <h3>{actor.activity_comments} Comments</h3>
                                    <h3>{actor.activity_likes} Likes</h3>
                                    <h3>{actor.activity_shares} Shares</h3> 
                                  </div>
                                </div>
                              </div>
                              <div className="actor-div-comments">
                                <div className="form-group">
                                  <textarea placeholder="Comment here!"className="form-control" rows="4" onChange={this.handleCommentChange} value={this.state.comment}></textarea>
                                  <button onClick={() => { this.postComment(actor, this.state.comment) }} className="btn btn-primary actor-div-comment-button">Submit Comment</button>
                                </div>
                                <div className="actor-div-comments-div">
                                  {
                                    actor.comments.map(function(comment) {
                                      commentCounter += 1; // Incrementing commentCounter variable so that each comment key is different regardless of content.
                                      return (
                                        <div className="actor-div-comment-div" key={comment + commentCounter}>
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