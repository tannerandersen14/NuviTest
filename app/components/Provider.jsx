import React from 'react';
import axios from 'axios';


let Provider = React.createClass({
  // Http request for data from NUVI API that automatically sorts data depending on the provider name in the URL.
  getProviderData: function() {
    axios.get('https://nuvi-challenge.herokuapp.com/activities')
    .then(function (response) {
      for (var i = 0; i < response.data.length; i++) {
        if (response.data[i].provider == this.props.params.name) {
          response.data[i].comments = [];
          response.data[i].display = false;
          this.state.data.providerData.push(response.data[i]);
        }
      }
      this.setState({data: {providerData: this.state.data.providerData}})
    }.bind(this)) 
  },
  // Function to be called by mouse over to switch between showing comments or not (uses the newly created display key to switch between render methods).
  switchActorDisplay: function(actor) {
    actor.display = !actor.display;
    this.setState({data: {providerData: this.state.data.providerData}, comment: ''});
  },
  // Posts the comment to the currently selected actor.
  postComment: function(actor, comment) {
    actor.comments.push(comment);
    this.setState({data: {providerData: this.state.data.providerData}, comment: ''});
  },
  // Necessary to post the comment, changes the state as user types so the comment can be posted.
  handleCommentChange: function(event) {
    this.setState({comment: event.target.value});
  },
  // Sets initial state for data, allowing it to be changed.
  getInitialState: function() {
        return {data: {providerData: []}, comment: ''};
  },
  // Runs http request for data on page load.
  componentDidMount: function() {
      this.getProviderData();
  },
  render: function() {
    // Checks for data from provider, if it is there the UI will load, if it isn't the user will be notified.
    if (this.state.data.providerData) {
      return (
        <div>
          <h1 className="page-header text-center provider-title">{this.props.params.name.toUpperCase()}</h1>
          <div className="provider-container">
            {
              this.state.data.providerData.map(function(actor) {
                let commentCounter = 0; // Declaring a variable to act as a key for the comments of each div, so that comments can be dupes of eachother.
                // If user is not moused over the activity, comments are hidden.
                if (!actor.display) {
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
                else if (actor.display) {   
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
        </div>
      )
    }
    else {
      return (
        <div>
          <h1 className="page-header">Provider Not Found</h1>
          <h3>There is no data from that provider</h3>
        </div>
      )
    }
  }
});

export default Provider;