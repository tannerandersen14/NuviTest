import React from 'react';
import { Link } from 'react-router';
import Axios from 'axios'; // Library being used to make the call to the NUVI API.
import Providers from './subComponents/Providers.jsx'; // Import the Providers subcomponent to be rendered.


// Main Component that makes the API call and renders the Providers subcomponent that displays the bulk of the information.
let Actors = React.createClass({
  // Declare method to make API call to activities API.
  getActors: function() {
    let providerCount = 0; // Declare new var named providerCount which will be used for the for in loop to ensure that each array is recreated correctly with a correct index number.
    let providers = []; // Declare new var named providers which will be used to sort all the information before setting the state to contain it.
    Axios.get('https://nuvi-challenge.herokuapp.com/activities')
    .then(function(response) {
      this.setState({data: {actors: response.data, providerArray: []}});
      // For Loop to organize data into objects depending on who provided it.
      for ( var i = 0; i < response.data.length; i++) {
        if (!providers[response.data[i].provider]) {
          response.data[i].display = false; // Creates new key called display which is a boolean, this will be used to decide whether extended information will be displayed or not.
          response.data[i].comments = []; // Creates new key on each actor named comments, allows for user made comments to be pushed to the actor.
          providers[response.data[i].provider] = {};
          providers[response.data[i].provider].name = response.data[i].provider;
          providers[response.data[i].provider].data = []
          providers[response.data[i].provider].data.push(response.data[i]);
        }
        else if (providers[response.data[i].provider]) {
          response.data[i].display = false;
          response.data[i].comments = [];                  
          providers[response.data[i].provider].data.push(response.data[i]);
        }
      }
      // For in loop that recreates each array so instead of named keys there are index numbers which can be used by the .map method so that each array can be rendered.
      for ( var obj in providers) {
        this.state.data.providerArray[providerCount] = {}
        this.state.data.providerArray[providerCount].name = obj;
        this.state.data.providerArray[providerCount].data = providers[obj].data;
        this.state.data.providerArray[providerCount].display = false;
        providerCount += 1;
      }
      this.setState({data: {actors: response.data, providerArray: this.state.data.providerArray}});
    }.bind(this))
  },
  // Method which clears data when route (component) loads.
  getInitialState: function() {
    return {data: {actors: [], providerArray: []}};
  },
  // Calls getActors method when component loads.
  componentDidMount: function() {
    this.getActors();
  },
  // Renders the component and passes API data into subcomponent Providers.
  render:function() {
    return (
      <div className="actors">
        <Providers data={this.state.data} />
      </div>
    )
  }
});

export default Actors;