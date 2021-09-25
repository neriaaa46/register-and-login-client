import {useEffect, useState, useContext} from 'react'
import { useHistory } from 'react-router'
import { Container, Table } from 'react-bootstrap'
import {getDetails, logout} from '../DAL/api'
import ModalMessage from './ModalMessage'
import { AuthContext } from './AuthContext'

function MyDetails(){

    const history = useHistory()
    const authCtx = useContext(AuthContext)

    const [myDetails, setMyDetails] = useState({})
    const [messageModal, setMessageModal] = useState("")
    const [smShow, setSmShow] = useState(false)

    useEffect(()=>{
        (async ()=>{
            const response = await getDetails()
            if(response.ok){
                const userDetails = await response.json()
                setMyDetails(userDetails)
            } else {
                const {message} = await response.json()
                setMessageModal(message)
                setSmShow(true) 
                setTimeout(()=>{
                    authCtx.onLogout()
                    logout()
                    setSmShow(false) 
                    history.push('login')
                }, 4000)
            }
        })()
    }, [])


    return<>
        <Container>
            <ModalMessage messageModal = {messageModal} smShow = {smShow}/>

            <h1 className="header-my-details text-center">My Details</h1>

            {!!Object.values(myDetails).length&&
            <Table className="text-center" striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{myDetails.firstName}</td>
                        <td>{myDetails.lastName}</td>
                        <td>{myDetails.email}</td>
                    </tr>
                </tbody>
            </Table>}

        </Container>
    </>
}

export default MyDetails