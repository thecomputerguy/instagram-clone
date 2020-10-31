import React from 'react'
import { withAuthorization } from '../Session'
import * as ROLES from '../../constants/roles'

const Admin = () => {
    return (
        <div>
            <h1>Admin page</h1>
            <p>This is a restricted section. only admin can access this page.</p>
        </div>
    )
}

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN]
export default withAuthorization(condition)(Admin)
