import React, { useState } from 'react'
import {withRouter} from 'react-router-dom'
import { SignUpLink } from '../SignUp'
import { withFirebase } from '../Firebase'
import { compose } from 'recompose'
import * as Routes from '../../constants/routes'
import { PasswordForgetLink } from '../PasswordForget'

const SignInPage = () => {
    return (
        <div>
            <h1>Sign in</h1>
            <SignInForm />
            <PasswordForgetLink />            
            <SignUpLink />
        </div>
    )
}

const initialState = {
    email: '',
    password: '',
    error: null
}

const SignInFormBase = (props) => {

    const [formState, setFormState] = useState(initialState)
    
    const onChange = (event) => {
        setFormState({...formState, [event.target.name]: event.target.value})
    }

    const onSubmit = (event) => { 
        const { email, password } = formState
        props.firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(authUser => {
            setFormState({initialState})
            props.history.push(Routes.HOME)
        }).catch(error => {
            setFormState({error})
        })
        event.preventDefault()
    }

    const {email, password, error} = formState
    const isInvalid = email === '' || password === ''

    return (
        <form onSubmit={onSubmit}>
            <input name="email" type="text" value={email} onChange={onChange} placeholder="email" />
            <input name="password" type="password" value={password} onChange={onChange} placeholder="password" />
            <button type="submit" disabled={isInvalid}>Sign in</button>
            {error && <p>{error.message}</p>}
        </form>
    )    
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase)

export default SignInPage

export { SignInForm }
