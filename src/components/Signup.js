import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import "../css/master.scss";
import axios from 'axios'; 

class Signup extends Component {
    constructor() {
        super(); 
        this.state = {
            username: "", 
            password: "",
            redirect: false, 
            taken: false
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
        axios.post("http://linserv1.cims.nyu.edu:24428/users", {
            username: this.state.username, 
            password: this.state.password,
        }).then(res => {
            if (res.data.error) {
                console.log('username already taken');
                this.setState({
                    taken: true
                });
            }
            else {
                console.log('successful signup');
                this.setState({
                    redirect: true
                });
            }
        });
    }
    render() {
        console.log(this.state.redirect);
        if (this.state.redirect) {
            return <Redirect to="/"></Redirect>
        }
        else {
            if (this.state.taken) {
                return (
                    <section className="box">
                        <div id="signup">
                            <h2 className="welcome">Sign Up:</h2>
                            <form>
                                <input type="text" name="username" onChange={this.onChange} placeholder="Username" />
                                <br></br>
                                <input type="password" name="password" onChange={this.onChange} placeholder="Password" />
                                <br></br>
                                <button onClick={this.onSubmit}>Sign Up</button>
                            </form>
                            <p>Username is already taken. Try again.</p>
                        </div>
                    </section>
                );
            }
            else {
                return (
                    <section className="box">
                        <div id="signup">
                            <h2 className="welcome">Sign Up:</h2>
                            <form>
                                <input type="text" name="username" onChange={this.onChange} placeholder="Username" />
                                <br></br>
                                <input type="password" name="password" onChange={this.onChange} placeholder="Password" />
                                <br></br>
                                <button onClick={this.onSubmit}>Sign Up</button>
                            </form>
                        </div>
                    </section>
                );
            }
        }
    }
}
export default Signup;
