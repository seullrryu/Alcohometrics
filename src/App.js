import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route} from "react-router-dom"; 

//Components 
import Login from "./components/Login"; 
import Signup from "./components/Signup";
import Home from "./components/Home";
import Add from "./components/Add";
import History from "./components/History";
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
    axios.defaults.withCredentials = true;
    axios.get('http://linserv1.cims.nyu.edu:24428/users', { withCredentials: true }).then(response => {
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ',response.data);
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
      return (
        <Router>
          <Route exact path="/"  render={() => <Login updateUser={this.updateUser}/>}></Route>
          <Route path="/signup" render={() => <Signup/>}></Route>
          <Route path="/add"  render={() => <Add loggedIn={this.state.loggedIn} username={this.state.username}/>}></Route>
          <Route path="/home"  render={() => <Home loggedIn={this.state.loggedIn}/>}></Route>
          <Route path="/history"  render={() => <History loggedIn={this.state.loggedIn}/>}></Route>
        </Router>
      )
  }
}

export default App;
