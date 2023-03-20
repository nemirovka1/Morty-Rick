import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import { Form } from '../Form/Form'
import { getAuth, createUserWithEmailAndPassword,signInWithPopup ,GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from 'react-redux/es/exports'
import {setUser} from '../../store/userSlice';
import '../Login/login.scss'

function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmitHandlerRegister = (e,email,password) => {
        e.preventDefault();
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user})=>{
                dispatch(setUser({
                    email:user.email,
                    id:user.id,
                    token:user.accessToken,
                }))
                localStorage.setItem('Login',user.email)
                navigate("/", { replace: true });
            })
            .catch((error) => {
                if(error == 'FirebaseError: Firebase: Error (auth/email-already-in-use).'){
                    alert('Account already exists')
                } else {
                    console.log('no')
                }
            });
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
                title="Register"
                onSubmitHandler={onSubmitHandlerRegister}/>
            <button
                className='loginBtn'
                onClick={onSubmitGoogle}>
                Google
            </button>
        </div>
      )
}

export default SignUp
