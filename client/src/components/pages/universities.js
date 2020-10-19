import React from 'react';
import ListUniversities from './cardlist';
import {Redirect} from 'react-router-dom';

function Universities() {
  return localStorage.getItem("isLogin") ? (
    <div className='uniCon'>
        <div className="container">
        <h3>Search University</h3>
        </div>
        <ListUniversities/>
    </div>
  ):<Redirect
  to={{
    pathname: "/login",
    state: { from: "/Universities" }
  }}
/>;
}

export default Universities;
