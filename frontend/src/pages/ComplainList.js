import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import axios from 'axios'

function ComplainList() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [complains, setComplains] = useState([])


    //get access to userLogin from redux store
  const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    
    if (!userInfo.isAdmin) {
        window.location="/"
    }
   console.log(complains)
    useEffect(() => {
        const fetchComplains = async () => {
            try {
                setLoading(true)
            const { data } = await axios.get('/api/v1/reject', {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
            setLoading(false)
            setComplains(data)
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }

        fetchComplains()
    },[userInfo.isAdmin])


    return (
        <div style={{backgroundColor:"#f5f5f5"}}>
            <h1 style={{textAlign:"center"}}>List of Complains</h1>
            {
                loading && <LoadingBox></LoadingBox>
            }
            {
                error && <MessageBox variant="danger">Error loading orders</MessageBox>
            }
            {
                complains?.map((complain) => (
                    <div key={complain._id} style={{border:"1px solid black", marginBottom:"2px",backgroundColor:"#f8f8f8"}}>
                        <h4 style={{ marginBottom: "1px", marginLeft: "5px" }}>complain Id: {complain._id}, orderId:{ complain.orderId}</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>DATE</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                        
                                {/* get only the date part, and leave the time*/}
                                <td>{complain.createdAt.substring(0, 10)}</td>
                                    <td>{complain.name}</td>
                                    <td>{complain.email}</td>
                                    <td>{ complain.phone}</td>
                                
                            </tr>
                        </tbody>
                    </table >
                        <p style={{paddingLeft:"3px"}}>{complain.complain }</p>                    
                        
                    </div>
                    ))
            }
        </div>
    )
}

export default ComplainList
