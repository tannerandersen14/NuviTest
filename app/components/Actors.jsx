import React from 'react';
import ActorList from '../actions/ActorList.jsx';
import axios from 'axios';

let Actors = React.createClass({
    getActors: function() {
        axios.get('https://nuvi-challenge.herokuapp.com/activities')
        .then(function(response) {
            console.log(response.data);
            this.setState({data: {actors: response.data}});
        }.bind(this))
    },
    getInitialState: function() {
        return {data: {actors: []}};
    },
    componentDidMount: function() {
        this.getActors();
    },
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