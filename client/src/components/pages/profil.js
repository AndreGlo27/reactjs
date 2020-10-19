import React, {Component} from 'react';
import FavoriteUniversities from './favorite-uni';
import {Redirect} from 'react-router-dom';

class profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLogin:{}
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
    render() {
        return localStorage.getItem("isLogin") ? (
            <div className='container profile'>
                <div className="row">
                    <div className="col-md-4 profile left">
                        <img className="rounded-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="" width="140" height="140"/>
        <h2>{this.state.userLogin.firstname} {this.state.userLogin.lastname}</h2>
        <p>{this.state.userLogin.email}</p>
                        </div>
                    <div className="col-md-8 profile right">
                    <h2>Your Favorite Universities</h2>
                    <FavoriteUniversities/>
                    </div>
                </div>
            </div>
          ):<Redirect
          to={{
            pathname: "/login",
            state: { from: "/Profile" }
          }}
        />;
    }
    
    
}

export default profile;
