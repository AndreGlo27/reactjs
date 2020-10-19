import React, { Component } from "react";
import { Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
// import dataUsers from "../data/users.json";
//import Append from '../func/writetojson';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state ={
            firstname:"",
            lastname:"",
            email:"",
            password:"",
            isFailed:false
        }

        this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
        this.handleChangeLastname = this.handleChangeLastname.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }
    handleChangeFirstname(event){
        this.setState({
            firstname:event.target.value
        })
    }
    handleChangeLastname(event){
        this.setState({
            lastname:event.target.value
        }) 
    }
    handleChangeEmail(event){
        this.setState({
            email:event.target.value
        })
    }
    handleChangePassword(event){
        this.setState({
            password:event.target.value
        })
    }
    handleRegister = async e =>{
    e.preventDefault();
    var toPush = {
        firstname:this.state.firstname,
        lastname:this.state.lastname,
        email:this.state.email,
        password:this.state.password,
        newsletter:false,
        favUni:[]
    }
    const resOpt = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(toPush),
    }
    const response = await fetch('/api/write', resOpt);
    const body = await response.statusText;
    if(body==="OK"){
        return window.location.pathname = "/login"
    }
    else{
        this.setState({
            isFailed:true
        })
    }
    }
    render() {
        const alert =  <Alert variant='danger'>Register Failed...!!!</Alert>
        return (
            <div className="form-wrapper">
            <div className="form-inner">
            <form >
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name"
                    value={this.state.firstname} onChange={this.handleChangeFirstname} />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name"
                    value={this.state.lastname} onChange={this.handleChangeLastname} />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email"
                    value={this.state.email} onChange={this.handleChangeEmail} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password"
                    value={this.state.password} onChange={this.handleChangePassword} />
                </div>

                {/* <Button type="submit" className="btn btn-primary btn-block" as={Link} to='/login'>Sign Up</Button> */}
                <Button type="submit" className="btn btn-primary btn-block" onClick={this.handleRegister}>Sign Up</Button>
                
                <p className="forgot-password text-right">
                    Already registered <Link to="/login">sign in?</Link>
                </p>
                {this.state.isFailed?alert:""}
            </form>
            </div>
            </div>
        );
    }
}