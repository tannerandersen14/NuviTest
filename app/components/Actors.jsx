import React from 'react';
import { Link } from 'react-router';
import ActorList from './subComponents/ActorList.jsx';
import axios from 'axios';

let Actors = React.createClass({
    // Declare method to make API call to activities API.
    getActors: function() {
        axios.get('https://nuvi-challenge.herokuapp.com/activities')
        .then(function(response) {
            console.log(response.data);
            this.setState({data: {actors: response.data, providers: [], providerArray: []}});
            // For Loop to organize data into objects depending on who provided it.
            for ( var i = 0; i < response.data.length; i++) {
                if (!this.state.data.providers[response.data[i].provider]) {
                    this.state.data.providers[response.data[i].provider] = {};
                    this.state.data.providers[response.data[i].provider].name = response.data[i].provider;
                    this.state.data.providers[response.data[i].provider].data = []
                    this.state.data.providers[response.data[i].provider].data.push(response.data[i]);
                    console.log(this.state.data.providers);
                }
                else if (this.state.data.providers[response.data[i].provider]) {
                    this.state.data.providers[response.data[i].provider].data.push(response.data[i]);
                    console.log(this.state.data.providers);
                }
            }
            for (var object in this.state.data.providers) {
                this.state.data.providerArray.push(object);
            }
            this.setState({data: {actors: response.data, providers: this.state.data.providers, providerArray: this.state.data.providerArray}});
        }.bind(this))
    },
    // Method which clears data when route (component) loads.
    getInitialState: function() {
        return {data: {actors: [], providers: [], providerArray: []}};
    },
    // Calls getActors method when component loads.
    componentDidMount: function() {
        this.getActors();
    },
    // Renders the component and passes API data into subcomponent ActorList.
    render:function() {
        return (
            <div className="actors">
              <h1 className="page-header">Actors</h1>
              <ActorList data={this.state.data}/>
            </div>
        )
    }
});

export default Actors;