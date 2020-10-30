import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Navigation from '../Navigation'
import * as ROUTES from '../../constants/routes'
import Landing from '../Landing'
import Home from '../Home'
import SignUpPage from '../SignUp'
import SignInPage from '../SignIn'
import PasswordForgetPage from '../PasswordForget'
import AccountPage from '../Account'
import AdminPage from '../Admin'
import { withAuthentication } from '../Session'

const App = () => {
    return (
        <Router>
            <Navigation />
            <hr />
            <Route exact path={ROUTES.LANDING} component={Landing} />
            <Route path={ROUTES.HOME} component={Home} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        </Router>
        )
}

export default withAuthentication(App)
