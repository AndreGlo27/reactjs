import React, { Component } from "react";
import { Button, Alert } from "react-bootstrap";
import {Link } from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state ={
            loginEmail:"",
            loginPass:"",
            failedLogin:false
        }
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    handleChangeEmail(event){
        this.setState({
            loginEmail:event.target.value
        });
        
        localStorage.setItem("loginEmail", event.target.value);
    }
    handleChangePass(event){
        this.setState({
            loginPass:event.target.value
        });
    }
    async handleLogin(e){
        e.preventDefault();
        const response = await fetch('/api/read');
        const body = await response.json();
        
        if (response.status !== 200) throw Error(body.message);
        const usr = body;
        let isValid = false;
        usr.forEach(u => {
            if(u.email === this.state.loginEmail && u.password === this.state.loginPass)
            {
                isValid = true;
            }
        });
        if(isValid){
            localStorage.setItem("isLogin", true);
            return window.location.pathname = "/"
        }
        else{
            this.setState({
                failedLogin:true
            })
        }
    }

    
    render() {
        const alert =  <Alert variant='danger'>Login Failed...!!!</Alert>
        return (
            <div className="form-wrapper">
            <div className="form-inner">
            <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email"
                    value={this.state.loginEmail} onChange={this.handleChangeEmail} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" 
                    value={this.state.loginPass} onChange={this.handleChangePass}/>
                </div>

                <Button className="btn btn-primary btn-block" onClick={this.handleLogin}>Submit</Button>
                <p className="forgot-password text-right">
                    <Link to="/register">Sign up</Link>
                </p>
                {this.state.failedLogin?alert:""}
            </form>
            </div>
            </div>
        );
    }
}

export default Login