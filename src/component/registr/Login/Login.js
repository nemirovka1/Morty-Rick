import React from 'react'
import { Form } from '../Form/Form'
import {useNavigate} from 'react-router-dom'
import { getAuth,signInWithPopup,signInWithEmailAndPassword,GoogleAuthProvider } from "firebase/auth"
import { useDispatch } from 'react-redux/es/exports'
import {setUser} from '../../store/userSlice'
import './login.scss'

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmitHandler = (e,email,password) => {
        e.preventDefault();
        const auth = getAuth();      
        signInWithEmailAndPassword(auth, email, password)
        .then(({user})=>{
            dispatch(setUser({
                email:user.email,
                id:user.id,
                token:user.accessToken,
            }))
            localStorage.setItem('Login',user.email)
            navigate("/", { replace: true });
        })
        .catch(() => alert('Invalid password or email'))
    }
    function onSubmitGoogle () {
      const provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  
      const auth = getAuth();
      auth.languageCode = 'it';

      signInWithPopup(auth, provider)
      .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
      
          const user = result.user;
          dispatch(setUser({
              name: user.displayName,
              email:user.email,
              id:user.uid,
              token:user.accessToken,
          }))
          navigate("/", { replace: true });
      }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);

      });
  }
  return (
    <div>
      <Form
        title="Sign in"
        onSubmitHandler={onSubmitHandler}/>
        <button 
            className='loginBtn'
            onClick={onSubmitGoogle}>
            Google
        </button>
    </div>
  )
}

export default Login
