import React, { useState, useEffect } from 'react'
import { withAuthorization } from '../Session'
import { withFirebase } from '../Firebase'
import * as ROLES from '../../constants/roles'


const initialState = {
    loading: false,
    users: []
}

const Admin = (props) => {

    const [state, setstate] = useState(initialState)

    useEffect(() => {
        setstate({ loading: true })
        props.firebase.users().on('value', (snapshot) => {
            const usersObject = snapshot.val()
            const userList = Object.keys(usersObject).map(key => ({ ...usersObject[key], uid : key }))
            setstate({...userList, loading: false})
        })
        return () => {
            props.firebase.users().off()
        }
    }, [props.firebase])

    const { loading, users } = state

    return (
        <div>
            <h1>Admin page</h1>
            {loading && <p>Loading...</p>}
            <UserListPage userList={ users } />
        </div>
    )
}

const UserListPage = ({ userList }) => {
    return (
        <ul>
            {
                userList.map(user => (
                  <li key={user.uid}>
                      <span><strong>uid:</strong> { user.uid }</span>
                      <span><strong>username:</strong> { user.username }</span>
                      <span><strong>email:</strong> { user.email }</span>
                  </li>  
                ))
            }
        </ul>
    )
}

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN]
export default withAuthorization(condition)(withFirebase(Admin))
//export default withFirebase(withAuthorization(condition)(Admin))
export { UserListPage }
