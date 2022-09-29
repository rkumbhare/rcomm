import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component';
import { createAuthUserWithEmailPassword, createUserDocFromAuth } from "../utils/firebase/firebase.utils";


import './sign-up.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUp = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const onFormChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [event.target.name]: event.target.value});
    }

    const onFormSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword){
            console.log('Password do not match!');
            return;
        }
        try {
          const userAuth = await  createAuthUserWithEmailPassword(email, password);
          console.log(userAuth);
          userAuth.displayName = displayName;
          const userDocRef = await createUserDocFromAuth(userAuth);
          console.log(userDocRef);
          resetFormFields();
        } catch (error) {
            console.error(error);
            if(error.code === 'auth/email-already-in-use'){
                console.log('user already available : ' + email);
            }
        }
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    return (
        <div id="sign-up-form-container">
            <h2>I do not have a account</h2>
            <p>Sign up with your Email & Password</p>

            <form className="sign-up-form" onSubmit={onFormSubmit}>
                <div className="group">
                    <FormInput type='text' 
                           label="Display Name"
                           className="form-input" 
                           name="displayName" 
                           value={displayName} 
                           onChange={onFormChange}
                           required 
                           minLength="3"
                           maxLength={16}/>
                </div>
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
                <div className="group">
                    <FormInput type='password' 
                            label="Confirm Password"
                            className="form-input" 
                            name="confirmPassword" 
                            value={confirmPassword} 
                            onChange={onFormChange}
                            required />
                </div>
                <div className="group">
                    <Button type="submit" label="Sign Up" />
                </div>
            </form>
        </div>
    );
}

export default SignUp;