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

    //block variables
     const [loadBlockUser, setLoadBlockUser] = useState(false)
    const [errorBlockUser, setErrorBlockUser] = useState(false)
    const [successBlockUser, setSuccessBlockUser] = useState(false)

    const [loadBlockStore, setLoadBlockStore] = useState(false)
    const [errorBlockStore, setErrorBlockStore] = useState(false)
    const [successBlockStore, setSuccessBlockStore] = useState(false)

    const [loadBlockProduct, setLoadBlockProduct] = useState(false)
    const [errorBlockProduct, setErrorBlockProduct] = useState(false)
    const [successBlockProduct, setSuccessBlockProduct] = useState(false)


    //unblock variables
     const [unloadBlockUser, setLoadunBlockUser] = useState(false)
    const [unerrorBlockUser, setErrorunBlockUser] = useState(false)
    const [unsuccessBlockUser, setSuccessunBlockUser] = useState(false)

    const [unloadBlockStore, setLoadunBlockStore] = useState(false)
    const [unerrorBlockStore, setErrorunBlockStore] = useState(false)
    const [unsuccessBlockStore, setSuccessunBlockStore] = useState(false)

    const [unloadBlockProduct, setLoadunBlockProduct] = useState(false)
    const [unerrorBlockProduct, setErrorunBlockProduct] = useState(false)
    const [unsuccessBlockProduct, setSuccessunBlockProduct] = useState(false)

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

            setLoadBlockStore(true)
             await axios.put(`/api/v1/store/banned`, {id}, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
             })
            setLoadBlockStore(false)
            setSuccessBlockStore(true)

            setLoadBlockProduct(true)
            await axios.put(`/api/v1/product/banned`, {id}, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
            setLoadBlockProduct(false)
            setSuccessBlockProduct(true)
        } catch (error) {
            setErrorBlockUser(true)
            setLoadBlockUser(false)
            setErrorBlockStore(true)
            setLoadBlockStore(false)
            setErrorBlockProduct(true)
            setLoadBlockProduct(false)
        }
    }

    const unBlockUser = async(id) => {
        try {
             setLoadunBlockUser(true)
            const { data } = await axios.put(`/api/v1/user/unbanned`, {id}, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
            setLoadunBlockUser(false)
            setSuccessunBlockUser(true)

            setLoadunBlockStore(true)
             await axios.put(`/api/v1/store/unbanned`, {id}, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
             })
            setLoadunBlockStore(false)
            setSuccessunBlockStore(true)

            setLoadunBlockProduct(true)
            await axios.put(`/api/v1/product/unbanned`, {id}, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
            setLoadunBlockProduct(false)
            setSuccessunBlockProduct(true)
        } catch (error) {
            setErrorunBlockUser(true)
            setLoadunBlockUser(false)
            setErrorunBlockStore(true)
            setLoadunBlockStore(false)
            setErrorunBlockProduct(true)
            setLoadunBlockProduct(false)
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
                            loadBlockStore && <LoadingBox></LoadingBox>
                }
                {
                            loadBlockProduct && <LoadingBox></LoadingBox>
                }
                
                
                        {
               errorBlockUser && <Stack sx={{ width: '90%' }} spacing={2}>
                  <Alert severity="error" onClose={() => setErrorBlockUser(false)}>Failed to block user.</Alert>
      
                </Stack>
                }
                {
               user && user.isSeller && errorBlockStore && <Stack sx={{ width: '90%' }} spacing={2}>
                  <Alert severity="error" onClose={() => setErrorBlockStore(false)}>Failed to block user's store.</Alert>
      
                </Stack>
                }
                {
               user && user.isSeller && errorBlockProduct && <Stack sx={{ width: '90%' }} spacing={2}>
                  <Alert severity="error" onClose={() => setErrorBlockProduct(false)}>Failed to block user products.</Alert>
      
                </Stack>
                }
                {
              successBlockUser && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="success" onClose={() => setSuccessBlockUser(false)}>User is blocked.</Alert>
      
            </Stack>
                }
                {
               user && user.isSeller && successBlockStore && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="success" onClose={() => setSuccessBlockStore(false)}>Store is blocked.</Alert>
      
            </Stack>
                }
                {
               user && user.isSeller && successBlockProduct && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="success" onClose={() => setSuccessBlockProduct(false)}>Product is blocked.</Alert>
      
            </Stack>
                }


                
                {
                            unloadBlockUser && <LoadingBox></LoadingBox>
                }
                {
                            unloadBlockStore && <LoadingBox></LoadingBox>
                }
                {
                            unloadBlockProduct && <LoadingBox></LoadingBox>
                }
                {
               unerrorBlockUser && <Stack sx={{ width: '90%' }} spacing={2}>
                  <Alert severity="error" onClose={() => setErrorunBlockUser(false)}>Failed to unblock user.</Alert>
      
                </Stack>
                }
                {
                user && user.isSeller && unerrorBlockStore && <Stack sx={{ width: '90%' }} spacing={2}>
                  <Alert severity="error" onClose={() => setErrorunBlockStore(false)}>Failed to unblock user's store.</Alert>
      
                </Stack>
                }
                {
                user && user.isSeller && unerrorBlockProduct && <Stack sx={{ width: '90%' }} spacing={2}>
                  <Alert severity="error" onClose={() => setErrorunBlockProduct(false)}>Failed to unblock user products.</Alert>
      
                </Stack>
                }

                {
              unsuccessBlockUser && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="success" onClose={() => setSuccessunBlockUser(false)}>User is unblocked.</Alert>
      
            </Stack>
                }
                {
               user && user.isSeller && unsuccessBlockStore && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="success" onClose={() => setSuccessunBlockStore(false)}>Store is unblocked.</Alert>
      
            </Stack>
                }
                {
             user && user.isSeller && unsuccessBlockProduct && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="success" onClose={() => setSuccessunBlockProduct(false)}>Product is unblocked.</Alert>
      
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
                            user && !user.isAdmin &&  
                            <div style={{display:"flex", justifyContent:"space-around"}}>
                                    <p style={{ margin: "0", padding: "0" }}><Button variant="contained" color="error" type="submit" size="small" sx={{ mb: 2 }} onClick={() => {
                            blockUser(user && user._id)
                        }}>
                            Block
                                    </Button></p>
                                    <p style={{ margin: "0", padding: "0" }}><Button variant="contained" color="secondary" type="submit" size="small" sx={{ mb: 2 }} onClick={() => {
                            unBlockUser(user && user._id)
                        }}>
                            unBlock
                       </Button></p>
                            </div>
                        }
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default ViewUser
