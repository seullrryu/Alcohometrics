import React, { Component } from 'react';
import "../css/master.scss";
import axios from 'axios'; 
import NavBar from "./Navbar";
import Nope from "./Nope";

class Add extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            username: "", 
            date: "", 
            beer: 0, 
            soju: 0, 
            cocktail: 0, 
            mixed: 0, 
            vodka: 0, 
            drunk: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this); 
    }
    onChange(event) {
        if (event.target.name === "drunk") {
            event.target.value = event.target.checked; 
        }
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    onSubmit(event) {
        event.preventDefault();
        let username = ""; //Get it from session
        axios.post("http://localhost:5000/drinks/", {
           username: username, 
           date: this.state.date, 
           drinks: {
               "beer": this.state.beer, 
               "soju": this.state.soju, 
               "cocktail": this.state.cocktail, 
               "mixed": this.state.mixed, 
               "vodka": this.state.vodka
           }, 
           drunk: this.state.drunk, 
           alcohol: 123
        }).then(res => {
            if (res.status === 200) {
                console.log("Sent to backend!"); 
            }
        });
    }
    render() {
        // if (this.props.loggedIn) {
            return (
                <section>
                    <NavBar></NavBar>
                    <section className="box">
                        <div id="drinks">
                            <h3 className="welcome">Had a night out? Add in your drink totals.</h3>
                            <form>
                                {/* <p>{this.props.username}</p> */}
                                <label>Date: </label>
                                <input type="date" name="date" onChange={this.onChange} id="date"/>
                                <br></br>
    
                                <label>Beer (Can): </label>
                                <input type="number" name="beer" onChange={this.onChange}/>
                                <br></br>
    
                                <label>Soju (Shot): </label>
                                <input type="number" name="soju" onChange={this.onChange}/>
                                <br></br>
    
                                <label>Cocktail (Glass): </label>
                                <input type="number" name="cocktail" onChange={this.onChange}/>
                                <br></br>
    
                                <label>Mixed Drink (Glass): </label>
                                <input type="number" name="mixed"  onChange={this.onChange}/>
                                <br></br>
    
                                <label>Vodka (Shot): </label>
                                <input type="number" name="vodka" onChange={this.onChange} />
                                <br></br>
    
                                <label>Were you drunk? </label>
                                <input type="checkbox" name="drunk" onChange={this.onChange}/>
                                <br></br>
                                <button onClick={this.onSubmit}>Submit</button>
                            </form>
                        </div>
                    </section>
                </section>
            );
        // }
        // else {
        //     return (
        //         <Nope></Nope>
        //     )
        // }
        
    }
}
export default Add;
