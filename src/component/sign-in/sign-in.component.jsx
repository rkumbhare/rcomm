import { async } from "@firebase/util";
import { getRedirectResult } from "firebase/auth";
import { Fragment, useEffect, useState, useContext } from "react";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { auth, createUserDocFromAuth, signInWithEmailPassword, signInWithGooglePopup, signInWithGoogleRedirect } from "../utils/firebase/firebase.utils";

import './sign-in.styles.scss';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignIn = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const onFormChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [event.target.name]: event.target.value});
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const onFormSubmit = async (event) => {
        event.preventDefault();
        if(!email || !password) return;

        try {
          const response =  await signInWithEmailPassword(email, password);
          resetFormFields();
        } catch (error) {
            switch(error.code){
                case 'uth/user-not-found':
                    console.log('user not found!');
                    break
                case 'auth/wrong-password':
                    console.log('Password is not correct!');
                    break;
                default:
                    console.log(error.code);
                    break;
            }
           
        }
    }

    useEffect( () => {
       getRedirectResult(auth)
       .then(async (response) => {
            if(response){
                const userDocRef = await createUserDocFromAuth(response.user);
                console.log(userDocRef);
            }   
       });
    }, []);

    return (
        <Fragment>
            <div id="sign-in-form-container">
                <h2>I already have a account</h2>
                <p>Sign in with your Email & Password</p>

                <form className="sign-in-form" onSubmit={onFormSubmit}>
                    <div className="group">
                        <FormInput type='email' 
                                label="Email"
                                className="form-input" 
                                name="email" 
                                value={email} 
                                onChange={onFormChange}
                                required
                                minLength="5"
                                maxLength="20" />
                    </div>
                    <div className="group">
                        <FormInput type='password' 
                                label="Password"
                                className="form-input" 
                                name="password" 
                                value={password} 
                                onChange={onFormChange}
                                required
                                minLength="5"
                                maxLength="20" />
                    </div>
                    <div className="buttons">
                        <Button type="submit" label="Sign In" />
                        <Button  type="button" buttonType="google" onClick={signInWithGooglePopup} label="SignIn with Google" />
                        {/* <Button buttonType="google" onClick={signInWithGoogleRedirect} label="SignIn with Google Page" /> */}
                    </div>
                </form>
            </div>
        </Fragment>
    );

}

export default SignIn;