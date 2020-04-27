import React, { Component } from 'react';
import "../css/master.scss";
import axios from 'axios'; 
import NavBar from "./Navbar";
import DataTable from "./Table"; 
import Nope from "./Nope";


class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            username: "",
            hasFetched: false,
            choices: "beer", 
            symbol: ">", 
            limit: 0
        }
        this.getUser = this.getUser.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getFilteredResults = this.getFilteredResults.bind(this);
    }
    componentDidMount(props) {
        //Loading data 
        this.getUser();
    }
    getUser() {
        axios.defaults.withCredentials = true;
        axios.get('http://linserv1.cims.nyu.edu:24428/users', { withCredentials: true }).then(response => {
            if (response.data.user) {
                this.setState({
                    data: response.data.user.records,
                    username: response.data.user.username
                })
            }
        }); 
    }
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    getFilteredResults(event) {
        event.preventDefault();
        console.log(this.state.choices);
        axios.defaults.withCredentials = true;
        axios.get("http://linserv1.cims.nyu.edu:24428/drinks/getDrinks", {
            params: {
                username: this.state.username, 
                drink: this.state.choices, 
                operator: this.state.symbol, 
                limit: this.state.limit
            }
        }).then(response => {
            console.log(response.data);
            this.setState({
                data: response.data
            })
        })
    }

    render() {
        if (this.props.loggedIn) {
            if (!(this.state.data)) {
                return (
                    <section>
                        <NavBar></NavBar>
                        <section id="data">
                            <p>Please wait while data is being loaded...</p>
                        </section>
                    </section>
                )
            }
            else {
                return (
                    <section>
                        <NavBar></NavBar>
                        <section id="data">
                            <h2>Summary of all the Ls you have taken.</h2>
                            <br></br>
                            <br></br>
                            <form id="filter" onSubmit={this.getFilteredResults}>
                                <label htmlFor="choices">Choose a liquor:</label> 
                                <select id="choices" name="choices" onChange={this.onChange}>
                                    <option value="beer">Beer (Can) </option>
                                    <option value="soju">Soju (Shots) </option>
                                    <option value="mixed">Mixed Drink (Glass)</option>
                                    <option value="vodka">Vodka (Shot)</option>
                                </select>
                                <select id="symbol" name="symbol" onChange={this.onChange}>
                                    <option value=">"> &#62; </option>
                                    <option value="<"> &#60; </option>
                                    <option value="=="> = </option>
                                </select>
                                <input type="number" name="limit" id="limit" onChange={this.onChange}></input>
                                <button type="submit">Filter</button>
                            </form>
                            <DataTable data={this.state.data || undefined}></DataTable>
                        </section>
                    </section>
                ); 
            }
        }
        else {
            return (
                <Nope></Nope>
            )
        }
    }
}
export default History;
