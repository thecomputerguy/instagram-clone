import { useState, useEffect} from 'react'
import { withFirebase } from '../Firebase'
import AuthUserContext  from './context'

const withAuthentication = Component => {
    
    const WithAuthenticationNested = (props) => {
        const [authUser, setAuthUser] = useState({authUser: null})

        useEffect(() => {
            props.firebase.auth.onAuthStateChanged(authUser =>{
                authUser ? setAuthUser({authUser}) : setAuthUser({authUser: null})
            })
            
        }, [props.firebase.auth])

        return (
            <AuthUserContext.Provider value={authUser}>
                <Component {...props}/>
            </AuthUserContext.Provider>
        )
    }

    return withFirebase( WithAuthenticationNested )
}

export default withAuthentication