import React, { Component } from 'react';

class NavBar extends Component {
    render() {
        return (
            <nav>
                <a href="/home">Alcohometrics</a>
                <div>
                    <a href="/add">Add</a>
                    <a href="/history">History</a>
                </div>
            </nav>
        )
    }
}
export default NavBar;
