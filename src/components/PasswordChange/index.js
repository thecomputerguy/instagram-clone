import React, { useState } from 'react'
import { withFirebase } from '../Firebase' 


const PasswordChange = () => {
    return (
        <div>
            <h1>Change Password</h1>
            <PasswordChangeForm />
        </div>
    )
}

const initialState = {
    password: '',
    confirmPassword: '',
    error: null
}

const PasswordChangeFormBase = (props) => {

    const [formState, setFormState] = useState(initialState)
    const { password, confirmPassword, error } = formState

    const onSubmit = (event) => {
        props.firebase
        .doPasswordUpdate()
        .then(() => {
            setFormState({...initialState})   
        }).catch((error) => {
            setFormState({error})
        });

        event.preventDefault()
    }

    const onChange = (event) => {
        setFormState({...formState, [event.target.name]: event.target.value})
    }

    const isInvalid = password === '' || confirmPassword === '' || password !== confirmPassword

    return (
        <form onSubmit={onSubmit}>
            <input type="password" name="password" value={password} onChange={onChange} placeholder="password"/>
            <input type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} placeholder="confirm password"/>
            <button type="submit" disabled={ isInvalid }>Change Password</button>
            {error && <div>{error.message}</div>}
        </form>
    )
}

const PasswordChangeForm = withFirebase(PasswordChangeFormBase)
export default PasswordChange