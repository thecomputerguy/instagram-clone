import React from 'react'
import { withFirebase } from '../Firebase'

const SignOutPage = ({ firebase }) => {
    return (
        <div>
            <button onClick={firebase.doSignOut}>Sign out</button>
        </div>
    )
}

export default withFirebase(SignOutPage)
