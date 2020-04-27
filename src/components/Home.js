import React, { Component } from 'react';
import "../css/master.scss";
import Nope from "./Nope";
import NavBar from "./Navbar";
import axios from 'axios'; 

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            last: 0, 
            current: 0,
            enough: true,
            improved: false,
            data: null,
            allDrunk: null, 
            allNonDrunk: null
        }
    }
    componentDidMount() {
        axios.defaults.withCredentials = true;
        axios.get('http://linserv1.cims.nyu.edu:24428/users', { withCredentials: true }).then(response => {
          if (response.data.user) {
            console.log('Get User: There is a user saved in the server session: ', response.data);

            //Separate from drunk ones to non drunk ones
            this.setState({
              allDrunk: response.data.user.records.filter(record => record.drunk === true),
              allNonDrunk: response.data.user.records.filter(record => record.drunk === false)
            })

            //If there is enough information for both sides
            if (this.state.allDrunk.length >= 1 && this.state.allNonDrunk.length >= 1) {
                //Sort by date
                const nonDrunk = this.state.allNonDrunk.sort(function(a,b){
                    return new Date(b.date) - new Date(a.date);
                });
                console.log(nonDrunk)
                const latestNonDrunk = nonDrunk[0];

                //Sort by date
                const drunk = this.state.allDrunk.sort(function(a,b){
                    return new Date(b.date) - new Date(a.date);
                });
                console.log(drunk)
                const latestDrunk = drunk[0];
    
                console.log(latestNonDrunk);
                console.log(latestDrunk); 
                
                //Pure alcohol consumed
                this.setState({
                    last: latestNonDrunk.alcohol, 
                    current: latestDrunk.alcohol
                })
    
                if (latestNonDrunk.alcohol > latestDrunk.alcohol) {
                    //If being non drunk with higher alc consumed comes first 
                    if ( (new Date(latestNonDrunk.date)) > (new Date(latestDrunk.date)) ) {
                        //Tolerance increased
                        this.setState({
                            improved: true 
                        })
                    }
                    else {
                        //Tolerance didn't increase
                        this.setState({
                            improved: false 
                        })
                    }
                }
              } 
              else {
                  //Not enough information
                this.setState({
                    enough: false
                })
              }
            }
            else {
                console.log("No user.");
            }
        });
    }
    render() {
        if (this.props.loggedIn) {
            if (this.state.enough) {
                if (this.state.improved) {
                    return (
                        <section>
                            <NavBar></NavBar>
                            <div id="home">
                                <h3>Welcome, Degenerate.</h3>
                                <div>
                                    <p>Your alcohol consumption from last time you weren't drunk is {Math.round(this.state.last*100)/100} grams</p>
                                    <p>Your alcohol consumption last time you were drunk is {Math.round(this.state.current*100)/100} grams</p>
                                </div>
                                <p>Your alcohol tolerance improved!</p>
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
                                    <p>Your alcohol consumption from last time you weren't drunk is {Math.round(this.state.last*100)/100} grams</p>
                                    <p>Your alcohol consumption last time you were drunk is {Math.round(this.state.current*100)/100} grams</p>
                                </div>
                                <p>Your alcohol tolerance did not improve!</p>
                            </div>
                        </section>
                    )
                } 
            }
            else {
                return (
                    <section>
                        <NavBar></NavBar>
                        <div id="home">
                            <p>Not enough information! Please go to add and enter your records!</p>
                        </div>
                    </section>
                )
            }
        }
        else {
            return (
                <Nope></Nope>
            )
        }
    } 
}
export default Home;
