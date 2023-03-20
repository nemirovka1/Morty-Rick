import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Login from '../../registr/Login/Login';
import './login.scss'

function LoginPages() {

  return (
    <div className='login__container'>
        <h1 className='login__container_title'>Login</h1>
        <div className='login__container_gif'>
            <iframe src="https://giphy.com/embed/SvGFA2WF9IP0WjmzvE" allowFullScreen className='login__gif'></iframe>
        </div>
        <Login/>
            <div className='login__container_text'>
                 <Link to="/register">
                  <button className='login__container_btn'>Registration</button>
                  </Link> 
            </div>
    </div>
  )
}

export default LoginPages
