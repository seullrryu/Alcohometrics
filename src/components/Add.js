import React, { Component } from 'react';
import "../css/master.scss";
import axios from 'axios'; 
import NavBar from "./Navbar";
import Nope from "./Nope";

class Add extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            header: "Had a night out? Add in your drink totals. (If you can remember, that is.)",
            username: "", 
            date: "", 
            beer: 0, 
            soju: 0, 
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
    alcContent() {
        //method to calculate alcohol content.
        //pure alcohol mass (grams) = volume * alcohol by volume * volumetric mass density
        const pureAlcMass = {
            "beer": 14.36, //350ml * 0.052 (5.2%) * 0.78924g/mL (pure alc density)
            "soju": 6.95, //44ml * 0.2 (20%) * 0.78924g/mL
            "mixed": 26.83, //margarita = 1.2oz of alcohol, manhattan = 1.093oz of alcohol --> avg of that in ml = 34ml   
            "vodka": 13.89 //44ml * 0.4 (40%) * 0.78924g/mL
        }
        let totalAlc = (this.state.beer * pureAlcMass["beer"]) + (this.state.soju * pureAlcMass["soju"]) + (this.state.mixed * pureAlcMass["mixed"]) + (this.state.vodka * pureAlcMass["vodka"]); 
        return totalAlc; 
    }
    onSubmit(event) {
        event.preventDefault();
        let totalAlc = this.alcContent();
        let username = this.props.username; // should get it from session later
        console.log(username)
        axios.post("http://linserv1.cims.nyu.edu:24428/drinks", {
           username: username, 
           date: this.state.date, 
           drinks: {
               "beer": parseInt(this.state.beer), 
               "soju": parseInt(this.state.soju), 
               "mixed": parseInt(this.state.mixed), 
               "vodka": parseInt(this.state.vodka)
           }, 
           drunk: this.state.drunk, 
           alcohol: totalAlc
        }).then(res => {
            if (res.status === 200) {
                console.log("Sent to backend!"); 
            }
        });
        this.setState({
            header: "Thanks for submitting! Please submit more if you want."
        })
    }
    render() {
        if (this.props.loggedIn) {
            return (
                <section>
                    <NavBar></NavBar>
                    <section className="box">
                        <div id="drinks">
                            <h3 className="welcome">{this.state.header}</h3>
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
        }
        else {
            return (
                <Nope></Nope>
            )
        }
    }
}
export default Add;
