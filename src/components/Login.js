import React, { Component } from 'react';
import "../css/master.scss";
import axios from 'axios'; 

class Login extends Component {
    render() {
        return (
            <main>
                <header>
                    <h1>Alcohometrics</h1>
                    <h3>Measure if your alcohol tolerance increased, or if you're just bugging.</h3>
                </header>
                <section className="box" id="login">
                    <div id="signup">
                        <h2 className="welcome">Welcome, Degenerate.</h2>
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
export default Login;