import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import withFirebase from '../Firebase'
import * as ROUTES from '../../constants/routes'

const PasswordForget = () => {
    return (
        <div>
            <h1>Reset Password</h1>
            <PasswordForgetForm />
        </div>
    )
}

const initialState = {
    email: '',
    error: null
}

const PasswordForgetFormBase = (props) => {

    const [formState, setFormState] =  useState(initialState)
    const {email, error} = formState

    const onSubmit = (event) => {
        props.firebase
        .doPasswordReset(email)
        .then(() => {
            setFormState({...initialState})
        }).catch((error) => {
            setFormState({error})   
        });

        event.preventDefault()
    }

    const onChange = (event) => {
        setFormState({...formState, [event.target.name] : event.target.value})
    }


    const isInvalid = email === ''

    return (
        <form onSubmit={onSubmit}>
            <input 
            type="text" 
            name="email" 
            value={email} 
            placeholder="email"
            onChange={onChange}
            />
            <button type="submit" disabled={isInvalid}>Reset Password</button>
            {error && <div>{error.message}</div>}
        </form>
    )
}

const PasswordForgetLink = () => {
    return (
        <div>
            <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
        </div>
    )
}

export default PasswordForget
const PasswordForgetForm = withFirebase(PasswordForgetFormBase)
export {PasswordForgetForm, PasswordForgetLink}