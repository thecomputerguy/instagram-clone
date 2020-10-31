import React from 'react'
import { withAuthorization } from '../Session'

const Home = () => {
    return (
        <div>
          This is a home page  
        </div>
    )
}

const condition = authUser => !!authUser 
export default withAuthorization(condition)(Home)
