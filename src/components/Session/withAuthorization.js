
import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import AuthUserContext from './context'

const withAuthorization = (condition) => Component => {
    
    const WithAuthorization = (props) => {

        useEffect(() => {
            const listener = props.firebase.auth
            .onAuthStateChanged(authUser => {
                if (!condition(authUser)) {
                    props.history.push(ROUTES.SIGN_IN)
                }
            })
            
            return () => {
                listener()
            }
        }, [props.firebase.auth, props.history])

        return (
            <AuthUserContext.Consumer>
                {
                authUser => condition(authUser) ? <Component { ...props } /> : null
                }
            </AuthUserContext.Consumer>
        )
    }

    return compose(withRouter, withFirebase)(WithAuthorization)
}

export default withAuthorization

