import React from 'react'
import PasswordChange from '../PasswordChange'
import PasswordForget from '../PasswordForget'

const Account = () => {
    return (
        <div>
            <h1>Account Page</h1>
            <PasswordForget />
            <PasswordChange />
        </div>
    )
}

export default Account
