import React from 'react'
import PasswordChange from '../PasswordChange'
import PasswordForget from '../PasswordForget'
import { withAuthorization, AuthUserContext } from '../Session' 

const Account = () => {
    return (
        <AuthUserContext.Consumer>
            { authUser => 
                <div>
                    <h1>Account Page: { authUser.email }</h1>
                    <PasswordForget />
                    <PasswordChange />
                </div>
            }
        </AuthUserContext.Consumer>
    )
}

const condition = authUser => !!authUser
export default withAuthorization(condition)(Account)
