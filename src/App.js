import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route} from "react-router-dom"; 
import { Redirect } from 'react-router';

//Components 
import Login from "./components/Login"; 
import Signup from "./components/Signup";
import Home from "./components/Home";
import Nope from "./components/Nope";




class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null
    }
    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser(userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('http://localhost:5000/users').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')
        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } 
      else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    });
  }

  render() {
    return(
      <Router>
        <Route exact path="/"  render={() => <Login updateUser={this.updateUser}/>}></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/home" render={() => (this.state.loggedIn ? (<Home/>) : (<Nope/>))}/>
      </Router>
    )
  }
}

export default App;
