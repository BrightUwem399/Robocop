import React, { Component } from "react";
import CardList from "./CardList";
import { robot } from "./robot";
import SearchBox from "./SearchBox"
import './App.css';

class App extends Component {
    constructor() {
        super()
        this.state = {
            robot: robot,
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then( users => this.setState({ robot: users }));
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    render() {
        const filteredRobots = this.state.robot.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        })
        if(this.state.robot.length === 0){
            return(
                <div>
                    <h1>Loading....</h1>
                </div>
            )
        }else{
            return (
                <div className="tc">
                    <h1 className="f2">RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <CardList robot={filteredRobots} />
                </div>
            );
        }
    }
}

export default App;