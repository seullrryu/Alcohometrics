import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import "../css/master.scss";
import axios from 'axios'; 

class Login extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            username: "", 
            password: "",
            redirect: false 
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this); 
    }
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    onSubmit(event) {
        event.preventDefault(); 
        axios.post("http://linserv1.cims.nyu.edu:24428/users/login", {
            username: this.state.username,
            password: this.state.password
        }).then(res => {
            if (res.status === 200) {
                this.props.updateUser({ //defined in app.js
                    loggedIn: true,
                    username: res.data.username
                })
                this.setState({
                    redirectTo: true
                })
            }
        }).catch(error => {
            console.log('login error: ')
            console.log(error);
        })
    }
    render() {
        if (this.state.redirectTo) {
            return <Redirect to="/home"></Redirect> 
        }
        else {
            return (
                <main>
                    <header>
                        <h1>Alcohometrics</h1>
                        <h3>Measure if your alcohol tolerance increased, or if you're just bugging.</h3>
                    </header>
                    <section className="box" id="login">
                        <div id="signup">
                            <h2 className="welcome">LOGIN</h2>
                            <form>
                                <input type="text" name="username" onChange={this.onChange} size="35" placeholder="Username" />
                                <br></br>
                                <input type="password" name="password" onChange={this.onChange} size="35" placeholder="Password" />
                                <br></br>
                                <button><a href="/signup">Sign Up</a></button>
                                <button onClick={this.onSubmit}>Login</button>
                            </form>
                        </div>
                    </section>
                </main>
            );
        }
    }
}
export default Login;