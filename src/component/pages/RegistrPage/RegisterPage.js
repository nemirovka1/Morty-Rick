import React from 'react';
import {Link} from 'react-router-dom';
import SignUp from '../../registr/SignUp/SignUp';
import './register.scss'
function RegisterPage() {
  return (
    <div className='register__container'>
        <h1 className='register__container_title'>Register</h1>
        <div className='register__container_gif'>
            <iframe src="https://giphy.com/embed/35nU79vBbeOm4" className='register__gif' allowFullScreen></iframe>
        </div>
        <SignUp/>
             <p className='register__container_text'>
                 Already have an account? <Link to="/login">Sign in</Link>
            </p>
    </div>
  )
}

export default RegisterPage
