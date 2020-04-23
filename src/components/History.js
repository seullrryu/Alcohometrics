import React, { Component } from 'react';
import "../css/master.scss";

import NavBar from "./Navbar";

class History extends Component {
    
    render() {
        return (
            <section>
                <NavBar></NavBar>
                <section id="data">
                    <form method="GET" id="filter">
                        <label htmlFor="choices">Choose a liquor:</label> 
                        <select id="choices">
                            <option value="beer">Beer (Can) </option>
                            <option value="soju">Soju (Shots) </option>
                            <option value="mixed">Mixed Drink (Glass)</option>
                            <option value="vodka">Vodka (Shot)</option>
                        </select>
                        <select id="symbol">
                            <option value=">"> &#62; </option>
                            <option value="<"> &#60; </option>
                            <option value="=="> = </option>
                        </select>
                        <input type="number" name="limit" id="limit"></input>
                        <button>Filter</button>
                    </form>
                    <table>
                        <tbody>
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
                                <td>4/20/20</td>
                                <td>yo</td>
                                <td>yo</td>
                                <td>yo</td>
                                <td>yo</td>
                                <td>yo</td>
                                <td>yo</td>
                                <td>yo</td>
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
                        </tbody>
                    </table>
                </section>
            </section>
        );
    }
}
export default History;
