import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import Providers from './subComponents/Providers.jsx';



let Actors = React.createClass({
    // Declare method to make API call to activities API.
    getActors: function() {
        let providerCount = 0;
        let providers = [];
        axios.get('https://nuvi-challenge.herokuapp.com/activities')
        .then(function(response) {
            this.setState({data: {actors: response.data, providerArray: []}});
            // For Loop to organize data into objects depending on who provided it.
            for ( var i = 0; i < response.data.length; i++) {
                if (!providers[response.data[i].provider]) {
                    response.data[i].display = false;
                    response.data[i].comments = [];
                    response.data[i].likes = 0;
                    providers[response.data[i].provider] = {};
                    providers[response.data[i].provider].name = response.data[i].provider;
                    providers[response.data[i].provider].data = []
                    providers[response.data[i].provider].data.push(response.data[i]);
                }
                else if (providers[response.data[i].provider]) {
                    response.data[i].display = false;
                    response.data[i].comments = [];
                    response.data[i].likes = 0;                    
                    providers[response.data[i].provider].data.push(response.data[i]);
                }
            }
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