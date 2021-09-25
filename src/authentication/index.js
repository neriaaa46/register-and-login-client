import "bootstrap/dist/css/bootstrap.min.css"
import "./CSS/index.css"
import {Switch,Route,Redirect} from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "./Components/AuthContext"
import HomePage from "./Components/HomePage"
import Register from "./Components/Register"
import Login from "./Components/Login"
import Bar from "./Components/Bar"
import MyDetails from "./Components/MyDetails"
import ForgotPassword from "./Components/ForgotPassword"
import ResetPassword from "./Components/ResetPassword"


function App(){

    const authCtx = useContext(AuthContext)

    return <>
        <Bar/>
        <Switch>
            <Route exact path="/">
                <HomePage/>
            </Route>

            <Route exact path="/register">
                {!authCtx.isLoggedIn&&<Register/>}
                {authCtx.isLoggedIn&&<Redirect to='/'/>}
            </Route>

            <Route exact path="/login">
                {!authCtx.isLoggedIn&&<Login/>}
                {authCtx.isLoggedIn&&<Redirect to='/'/>}
            </Route>

            <Route exact path="/myDetails">
                {authCtx.isLoggedIn&&<MyDetails/>}
                {!authCtx.isLoggedIn&&<Redirect to='/'/>}
            </Route>

            <Route exact path="/forgotPassword">
                {!authCtx.isLoggedIn&&<ForgotPassword/>}
                {authCtx.isLoggedIn&&<Redirect to='/'/>}
            </Route>

            <Route exact path="/resetPassword/:token">
                {!authCtx.isLoggedIn&&<ResetPassword/>}
                {authCtx.isLoggedIn&&<Redirect to='/'/>}
            </Route>

            <Route path="*">
                <Redirect to='/'/>
            </Route>


        </Switch>
    </>
}

export default App