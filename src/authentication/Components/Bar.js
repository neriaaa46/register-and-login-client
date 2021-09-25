import {Navbar, Nav} from "react-bootstrap"
import {NavLink, useHistory} from "react-router-dom"
import {useContext} from "react"
import {AuthContext} from "./AuthContext"
import {logout} from "../DAL/api"

function Bar(){

    const authCtx = useContext(AuthContext)
    const history = useHistory()

    function toLogout(){
        authCtx.onLogout()
        history.push('/')
        logout()
    }

    return <>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <NavLink to="/" className="nav-link nav-auth">Authentication</NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

            {!authCtx.isLoggedIn&&<Nav className="mr-auto">
                <NavLink to="register" className="nav-link">Register</NavLink>
                <NavLink to="login" className="nav-link">Login</NavLink>
            </Nav>}

            {authCtx.isLoggedIn&&<Nav className="mr-auto">
                <NavLink to="myDetails" className="nav-link">MyDetails</NavLink>
                <NavLink to="/" className="nav-link" onClick = {()=>toLogout()}>Logout</NavLink>
            </Nav>}

        </Navbar.Collapse>
    </Navbar>
    </>
}

export default Bar