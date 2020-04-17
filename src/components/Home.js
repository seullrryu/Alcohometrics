import React, { Component } from 'react';
import "../css/master.scss";

import NavBar from "./Navbar";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            lastWeek: 0, 
            thisWeek: 0,
            improved: 0,
            favorite: ""
        }
    }
    componentDidMount() {
        // load the alcohol consumption data from the database
        // set states here
        if (this.state.lastWeek > this.state.thisWeek) {
            this.setState({
                improved: 0
            })
        }
        else if (this.state.lastWeek < this.state.thisWeek) {
            this.setState({
                improved: 1
            })
        }
        else { //equal
            this.setState({
                improved: 2
            })
        }
    }
    render() {
        if (this.state.improved === 0) {
            return (
                <section>
                    <NavBar></NavBar>
                    <div id="home">
                        <h3>Welcome, Degenerate.</h3>
                        <div>
                            <p>Your alcohol consumption from last week is {this.state.lastWeek}</p>
                            <p>Your alcohol consumption this week is {this.state.thisWeek}</p>
                            <p>Your alcohol tolerance did not improve!</p>
                        </div>
                    </div>
                </section>
            )
        }
        else if (this.state.improved === 1) {
            return (
                <section>
                    <NavBar></NavBar>
                    <div id="home">
                        <h3>Welcome, Degenerate.</h3>
                        <div>
                            <p>Your alcohol consumption from last week is {this.state.lastWeek}</p>
                            <p>Your alcohol consumption this week is {this.state.thisWeek}</p>
                            <p>Your alcohol tolerance improved!</p>
                        </div>
                    </div>
                </section>
            )
        }
        else {
            return (
                <section>
                    <NavBar></NavBar>
                    <div id="home">
                        <h3>Welcome, Degenerate.</h3>
                        <div>
                            <p>Your alcohol consumption from last week is {this.state.lastWeek}.</p>
                            <p>Your alcohol consumption this week is {this.state.thisWeek}.</p>
                        </div>
                        <p>Your alcohol tolerance stayed the same!</p>
                    </div>
                </section>
            )
        } 
    }
}
export default Home;
