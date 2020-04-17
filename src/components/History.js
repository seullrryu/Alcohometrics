import React, { Component } from 'react';
import "../css/master.scss";

import NavBar from "./Navbar";

class History extends Component {
    render() {
        return (
            <section>
                <NavBar></NavBar>
                <section className="box">
                    <form method="GET" id="filter">
                        <input type="submit" value="Filter"></input>
                    </form>
                    <table>
                        <tr>
                            <th>Date</th>
                            <th>Beer</th>
                            <th>Soju</th>
                            <th>Cocktail</th>
                            <th>Mixed</th>
                            <th>Vodka</th>
                            <th>Level</th>
                            <th>Drunk?</th>
                        </tr>
                        <tr>
                            <td>yo</td>
                            <td>yo</td>
                            <td>yo</td>
                            <td>yo</td>
                            <td>yo</td>
                            <td>yo</td>
                            <td>yo</td>
                            <td>yo</td>
                        </tr>
                    </table>
                </section>
            </section>
        );
    }
}
export default History;
