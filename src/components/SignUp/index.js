import React, {useState} from 'react'
import { Link, withRouter } from 'react-router-dom'
import  * as Routes  from '../../constants/routes'
import { withFirebase } from '../Firebase'
import { compose } from 'recompose'

const SignUpPage = () => {
    return (
        <div>
            <h1>Sign up</h1>
            <SignUpForm/>
        </div>
    )
}


const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: null
}

const SignUpFormBase = (props) => {
    
    const [formState, setFormState] = useState(initialState)

    const handleChange = (event) => {
        setFormState({...formState, [event.target.name] : event.target.value})
    }

    const handleSubmit = (event) => {
        const { username, email, password } = formState
        
        props.firebase
        .doCreateUserWithUsernameAndPassword(email, password)
        .then(authUser => {
            setFormState({...initialState})
            props.history.push(Routes.HOME)
        }).catch(error => {
            setFormState({ error })
        })

        event.preventDefault()
    }
    
    const {username, email, password, confirmPassword, error} = formState

    const isInvalid = password !== confirmPassword || password === '' || email === '' || username === ''

    return (
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            name="username" 
            value={username} 
            placeholder="username" 
            onChange={handleChange} />

            <input 
            type="text" 
            name="email" 
            value={email} 
            placeholder="email" 
            onChange={handleChange} />

            <input 
            type="password" 
            name="password" 
            value={password} 
            placeholder="password" 
            onChange={handleChange} />

            <input 
            type="password" 
            name="confirmPassword" 
            value={confirmPassword} 
            placeholder="confirmPassword" 
            onChange={handleChange} />

            <button type="submit" disabled={isInvalid}>Sign up</button>

            {error && <p>{error.message}</p>}
        </form>
        
    )
}

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase)

const SignUpLink = () => {
    return (
        <p>Don't have an account yet? <Link to={Routes.SIGN_UP}>Sign up</Link></p>
    )
}

export default SignUpPage
export { SignUpForm, SignUpLink }