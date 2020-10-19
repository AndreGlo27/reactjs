import React, {Component} from 'react';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import './Assets/css/default.min.css';
import Login from "./components/pages/login";
import SignUp from "./components/pages/register";
import Header from './components/header/header';
import Homepage from './components/pages/homepage';
import Universities from './components/pages/universities';
import Profile from './components/pages/profil';

class App extends Component {
  render(){
  return (
    <Router>
    <div className="App">
          <Switch>
            <Route exact path='/'>
              <Header/>
              <Homepage/>
            </Route>
            <Route path='/Universities'>
              <Header/>
              <Universities/>
            </Route>
            <Route path='/Profile'>
              <Header/>
              <Profile/>
            </Route>
            <Route exact path='/login'>
              <Login/>
            </Route>
            <Route path="/register">
              <SignUp/>
            </Route>
          </Switch>
    </div>
    </Router>
  );
  }
}

export default App;
