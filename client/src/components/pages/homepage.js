import React, {Component} from 'react';
import { Container,Button,Jumbotron } from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

class Homepage extends Component {
  constructor(props) {
      super(props);
      this.state = {
          userLogin:{},
          isSubscribe:false
      }
  }
  async  componentDidMount(){
      const response = await fetch('/api/read');
      const body = await response.json();
      
      if (response.status !== 200) throw Error(body.message);
      const usr = localStorage.getItem('loginEmail');
      body.forEach(item => {
          if(item.email===usr){
              this.setState({
                  userLogin:item
              })
          }
      });
  }
  async handleSubscribe(){
    const resOpt = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userLogin:localStorage.getItem('loginEmail')}),
    }
    const response = await fetch('/api/subscribe', resOpt);
    const body = await response.statusText;
    if(body.statusText==="OK")
    {
      this.setState({
        isSubscribe:true
      })
    }
  }
  render() {
      return localStorage.getItem("isLogin") ? (
    <Jumbotron fluid>
        <Container>
  <h1>Hello, {this.state.userLogin.firstname}</h1>
        <p>
            This is a simple hero unit, a simple jumbotron-style component for calling
            extra attention to featured content or information.
        </p>
        <p>
      <Button variant="primary" onClick={this.handleSubscribe}>{this.state.isSubscribe?"Subscribed":"Subscribe Newsletter"}</Button>
        </p>
    </Container>
    </Jumbotron>
  ):<Redirect
  to={{
    pathname: "/login",
    state: { from: "/" }
  }}
/>;
}
}

export default Homepage;
