import {Form, Button, Row, Col, Container} from "react-bootstrap"
import {Link} from "react-router-dom"
import {useState, useContext} from "react"
import { useHistory } from "react-router"
import {validation, email, password} from "../Utils/validation"
import {login} from "../DAL/api"
import {AuthContext} from "./AuthContext"


function Login(){

  
    const history = useHistory()
    const authCtx = useContext(AuthContext)

   
    const [message, setMessage] = useState("")
    const [loginInputDetails, setLoginInputDetails] = useState({
        email,
        password,
        })


        async function submit(e){
            e.preventDefault()
    
            let isValid = true
            let user = {}
    
           for (const key in loginInputDetails) {
    
                user[key] = loginInputDetails[key].value
                setLoginInputDetails(validation({value:loginInputDetails[key].value,name:key},loginInputDetails, "login"))
                if (loginInputDetails[key].errors.length !==0){
                    isValid = false
                }
            }
    
            if(isValid){
                const response = await login(user)
                const {accessToken, message} = await response.json()
                setMessage(message)

                if(response.ok){
                    setTimeout(()=>{
                        history.push('/')
                        authCtx.refreshToken(accessToken)
                        authCtx.onLogin()
                    }, 2000)
                    
                } else {
                    setTimeout(()=>{
                        setMessage("")
                    }, 5000)
                }
            }
        }


    return <>
        <Container className="container-login mt-4">
            <Form className="login-form"> 
                
                <h1 className="text-center mt-3 mb-4">Login</h1>
                <Row className="justify-content-center">

                    <Col xs={11} md={8} lg={6}>
                        <Form.Group className="input-login">
                            <Form.Control type="email" name="email" isInvalid={loginInputDetails["email"].inValid} placeholder="Email"
                            onBlur={(e)=>{setLoginInputDetails(validation(e.target,loginInputDetails, "login"))}}/>
                            {loginInputDetails["email"].errors.map((value,index)=>
                            {return <Form.Control.Feedback className="feedback" key={index} type="invalid"> {value} </Form.Control.Feedback>})}
                        </Form.Group>

                        <Form.Group className="input-login">
                            <Form.Control type="password" name="password" isInvalid={loginInputDetails["password"].inValid} placeholder="Password"
                            onBlur={(e)=>{setLoginInputDetails(validation(e.target,loginInputDetails, "login"))}}/>
                            {loginInputDetails["password"].errors.map((value,index)=>
                            {return <Form.Control.Feedback className="feedback" key={index} type="invalid"> {value} </Form.Control.Feedback>})}
                        </Form.Group>

                        <Row className="btn-link-login">
                            <Button className="btn-login" variant="dark" type="submit" onClick={(e)=>{submit(e)}}>
                                Login
                            </Button> 
                            <Link className="link-forgot text-center" to="/forgotPassword">Forgot Password ?</Link>
                        </Row>
                       
                    </Col>

                    <Row className="message-login justify-content-center align-items-center mb-3">
                        {message&&<small>{message}</small>}
                    </Row>

                </Row>
                
            </Form>
        </Container>
        
    </>
}

export default Login