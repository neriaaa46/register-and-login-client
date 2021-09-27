import { createContext, useState, useEffect} from "react"; 
import { useHistory} from "react-router";
import {updateTokens} from "../DAL/api"
import Loader from "../Components/Loader"
import jwt from "jsonwebtoken"
import {createCsrfToken} from "../DAL/api"
import Cookies from "js-cookie";


const MINUTE = 60 
let inMemoryToken = ""

const AuthContext = createContext({
    isLoggedIn: false,
    onLogin: () => {},
    onLogout: () => {},
    refreshToken: () => {}
    
}); 

function AuthContextProvider({children}){

    const history = useHistory()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [spinner, setSpinner] = useState(true)


    useEffect(()=>{
        (async ()=>{
            let {xsrfToken} = await createCsrfToken()
            Cookies.set("XSRF-TOKEN", xsrfToken)
            const {accessToken} = await updateTokens()
            if(accessToken) {
                loginHandler()
                getRefreshToken(accessToken)
            } else {
                logoutHandler()
            }
            setTimeout(()=>{
                setSpinner(false)
            }, 400)
        })()
    },[])

    
    const loginHandler = ()=>{
        setIsLoggedIn(true)
    }

    const logoutHandler = ()=>{
        setIsLoggedIn(false)
    }


    function getRefreshToken(token){
        inMemoryToken = token

        const decode = jwt.decode(token)
        setTimeout(async () => {
            const {accessToken} = await updateTokens(inMemoryToken)
            if(accessToken) {
                getRefreshToken(accessToken)
            } else {
                logoutHandler()
                history.push('/login')
            }
    
        }, (decode.exp - decode.iat - MINUTE*3)*1000)  
    }

    return <>
        {!spinner&&<AuthContext.Provider value = {{isLoggedIn, onLogout:logoutHandler, onLogin:loginHandler, refreshToken:getRefreshToken}}>
            {children}
        </AuthContext.Provider>}
        {spinner&&<Loader/>}
    </>
}

export  {AuthContext, AuthContextProvider, inMemoryToken}