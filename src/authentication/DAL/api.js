import Cookies from "js-cookie"
import { inMemoryToken } from "../Components/AuthContext"

const baseUrl = "https://register-and-login-app.herokuapp.com"

async function createCsrfToken(){
    const response = await fetch(`${baseUrl}/csrf`, {
        method: 'GET',
        credentials: 'include'
    })
    return response.json()
}


async function register(user){
    const response = await fetch(`${baseUrl}/users/register`, {
        method:'POST', 
        credentials: 'include',
        headers:{'Content-Type': 'application/json',
                 'x-xsrf-token': Cookies.get('XSRF-TOKEN')}, 
        body: JSON.stringify(user)
    })
    return response
}

async function login(user){
    const response = await fetch(`${baseUrl}/users/login`,{
        method: 'POST', 
        credentials: 'include',
        headers:{'Content-Type': 'application/json',
                 'x-xsrf-token': Cookies.get('XSRF-TOKEN')}, 
        body: JSON.stringify(user)
    })
    return response
}


async function updateTokens(inMemoryToken){
    const response = await fetch(`${baseUrl}/refreshToken`, {
        method: 'POST', 
        credentials: 'include',
        headers:{'Content-Type': 'application/json',
                 'x-xsrf-token': Cookies.get('XSRF-TOKEN'), 
                 'authorization': `Bearer ${inMemoryToken}`}
    })
    return response.json()
}



async function logout(){
    fetch(`${baseUrl}/users/logout`,{
        method: 'POST', 
        credentials: 'include', 
        headers:{'Content-Type': 'application/json'}
    }) 
} 



async function getDetails(){
    const response = await fetch(`${baseUrl}/details`,{
        method: 'GET', 
        credentials: 'include', 
        headers: {'Content-Type': 'application/json', 
                  'authorization': `Bearer ${inMemoryToken}`}
    })
    return response
}



async function sendEmailToResetPassword(email){
    const response = await fetch(`${baseUrl}/email/resetPassword`, {
        method: 'POST', 
        credentials: 'include',
        headers: {'Content-Type': 'application/json',
                  'x-xsrf-token': Cookies.get('XSRF-TOKEN')}, 
        body: JSON.stringify(email)
    })
    return response.json()
}



async function changePassword(reset){
    const response = await fetch(`${baseUrl}/users/changePassword`, {
        method: 'PUT', 
        cardentials: 'include',
        headers:{'Content-type': 'application/json'},
        body: JSON.stringify(reset)
    })
    return response
}


export {register, login, createCsrfToken, updateTokens, logout, getDetails, sendEmailToResetPassword, changePassword}