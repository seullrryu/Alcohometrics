import React, { Component } from 'react';
import "../css/master.scss";
import axios from 'axios'; 

class Signup extends Component {
    constructor() {
        super(); 
        this.state = {
            username: "", 
            password: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this); 
    }
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    onSubmit(event) {
        event.preventDefault(); 
        axios.post("http://localhost:5000/users/", {
            username: this.state.username, 
            password: this.state.password
        }).then(res => console.log(res.data)); 
    }
    render() {
        return (
            <fieldset id="signup-form">
                <legend>Sign Up:</legend>
                <form>
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" onChange={this.onChange} placeholder="Username" required/>
                    <br></br>
                    <label htmlFor="password">Password: </label>
                    <input type="text" name="password" onChange={this.onChange} placeholder="Password" required/>
                    <br></br>
                    <button onClick={this.onSubmit}>Sign Up</button>
                </form>
            </fieldset>
        );
    }
}
export default Signup;
