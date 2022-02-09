import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import LoadingBox from '../components/LoadingBox';
import Button from "@mui/material/Button";


function ViewUser(props) {
    const id = props.match.params.id
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
     const [loadBlockUser, setLoadBlockUser] = useState(false)
    const [errorBlockUser, setErrorBlockUser] = useState(false)
    const [successBlockUser, setSuccessBlockUser] = useState(false)

    //get access to userLogin from redux store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  

    if (!userInfo.isAdmin) {
        window.location="/"
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get(`/api/v1/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
                })
                setLoading(false)
                setUser(data)
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }
        fetchUser()
    }, [])

    console.log(user)

    //block a users accsess to this website
    const blockUser = async (id) => {
        try {
             setLoadBlockUser(true)
            const { data } = await axios.put(`/api/v1/user/banned`, {id}, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
            setLoadBlockUser(false)
            setSuccessBlockUser(true)
        } catch (error) {
            setErrorBlockUser(true)
            setLoadBlockUser(false)
        }
    }
    return (
        <div style={{backgroundColor:"#f5f5f5", padding:"10px", maxWidth:"100%"}}>
            <h1 style={{ textAlign: "center" }}>User details page</h1>
            
            <div className='row center'>

                {
                    loading && <LoadingBox></LoadingBox>
                }
                 {
              error && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="error" onClose={() => setError(false)}>User Not Found.</Alert>
      
            </Stack>
                }
                {
                            loadBlockUser && <LoadingBox></LoadingBox>
                        }
                        {
               errorBlockUser && <Stack sx={{ width: '90%' }} spacing={2}>
                  <Alert severity="error" onClose={() => setErrorBlockUser(false)}>Failed to block user.</Alert>
      
                </Stack>
                }
                {
              successBlockUser && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="success" onClose={() => setSuccessBlockUser(false)}>User is blocked.</Alert>
      
            </Stack>
                }
                <div className='card' style={{padding:"10px"}}>
                    <div>
                        {
                        user &&  <img src={user.image} className='medium' alt="" />
                   }
                    </div>
                    <div>
                        <h4 style={{textAlign:"center"}}>User Info</h4>
                        <p>Name: <strong>{user && user.name}</strong></p>
                        <p>Email: {user && user.email}</p>
                        <p>Phone: {user && user.phone}</p>
                        <p>Id: {user && user._id}</p>
                        <p>Status: {user && user.isSeller ? "Seller" : "Buyer"}</p>
                        <p style={{ maxWidth: "100%" }}>Address: {user && user.address}</p>
                        <h4 style={{ textAlign: "center" }}>Actions</h4>
                        {
                         user && !user.isAdmin &&  <p style={{ margin: "0", padding: "0" }}><Button variant="contained" color="error" type="submit" size="small" sx={{ mb: 2 }} onClick={() => {
                            blockUser(user && user._id)
                        }}>
                            Block
                       </Button></p>
                        }
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default ViewUser
