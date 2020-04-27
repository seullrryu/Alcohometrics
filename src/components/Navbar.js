import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class NavBar extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            redirectTo: false 
        }
        this.logout = this.logout.bind(this);  
    }
    logout() {
        axios.defaults.withCredentials = true;
        axios.get('http://linserv1.cims.nyu.edu:24428/logout', { withCredentials: true })
        .then(response => {
            console.log(response);
            this.setState({
                redirectTo: true
            })
        })
        .catch(error => {
            console.log(error);
            this.setState({
                redirectTo: true
            })
        }); 
    }
    render() {
        if (this.state.redirectTo) {
            return <Redirect to="/"></Redirect> 
        }
        else {
            return (
                <nav>
                    <a href="/home">Alcohometrics</a>
                    <div>
                        <a href="/add">Add</a>
                        <a href="/history">History</a>
                        <a onClick={this.logout}>Log out</a>
                    </div>
                </nav>
            )
        }
        
    }
}
export default NavBar;
