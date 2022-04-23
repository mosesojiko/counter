import React from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useState } from 'react';
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';



function UserList(props) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [users, setUsers] = useState([])
   

    const [search, setSearch] = useState('')
    const [loadingUser, setLoadingUser] = useState(false)
    const [resultUser, setResultUser] = useState([])
    const [errorUser, setErrorUser] = useState(false)
    const [notFound, setNotFound] = useState(false);
    const [emptySearch, setEmptySearch] = useState(false)

    //get access to userLogin from redux store
  const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    
    if (!userInfo.isAdmin) {
        window.location="/"
    }
   
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true)
            const { data } = await axios.get('/api/v1/user/find', {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
            setLoading(false)
            setUsers(data)
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }

        fetchUsers()
    }, [userInfo.isAdmin])
    
    const handleSearch = async (e) => {
        e.preventDefault()
        if (!search) {
      setEmptySearch(true);
      return
    }
        try {
            setLoadingUser(true)
            const { data } = await axios.get(`/api/v1/user/search?search=${search}`, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
            setLoadingUser(false)
            setResultUser(data)
            setSearch("")
            if (data.length === 0) {
        setNotFound(true)
      }
        } catch (error) {
            setErrorUser(true)
            setLoadingUser(false)
        }
    }

    //console.log(resultUser)
    //console.log(users)
    

    

    
    return (
        <div style={{backgroundColor:"#f5f5f5"}}>
            <h3 style={{ textAlign: "center" }}>List of users</h3>
            <form style={{textAlign:"center"}} onSubmit={handleSearch}>
                <input type="text" id="search" placeholder='Search by name'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              <button style={{backgroundColor:"#000080", color:"white"}} type="submit">
                  <SearchIcon sx={{fontSize:"18px"}} />
                </button>
              </form>
            
            {
                loading && <LoadingBox></LoadingBox>
            }
            {
                error && <MessageBox variant="danger">Could not load users</MessageBox>
            }
            

            <div className='row center'>
                {
                loadingUser && <LoadingBox></LoadingBox>
                }
                {
               errorUser && <Stack sx={{ width: '90%' }} spacing={2}>
                  <Alert severity="error" onClose={() => setErrorUser(false)}>Failed to load user.</Alert>
      
                </Stack>
                }
                {
              emptySearch && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="warning" onClose={() => setEmptySearch(false)}>Search cannot be empty.</Alert>
      
            </Stack>
                }
                {
              notFound && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="success" onClose={() => setNotFound(false)}>User Not Found</Alert>
      
            </Stack>
              }
                {
                    resultUser?.map((user) => (
                        <div key={user._id} className='card'>
                        <div style={{display:"flex", padding:"5px"}}>
                            <div><img className='small' src={user.image} alt="" /></div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems:'flex-start', marginLeft:"1px"}}>
                                <p style={{margin:"0", padding:"0"}}>{user.name}</p>
                                <p style={{margin:"0", padding:"0"}}>{user.phone}</p>
                                <p style={{ margin: "0", padding: "0" }}>{user.email}</p>
                                {
                                    user.isSeller && <p style={{margin:"0", padding:"0"}}>Seller</p>
                                }
                            </div>
                        </div>
                        <p style={{margin:"0", padding:"0"}}><b>Id:</b>{user._id}</p>
                        <p style={{ margin: "0", padding: "0" }}>{user.address}</p>
                        <p style={{ margin: "0", padding: "0" }}><Button variant="contained" color="primary" type="submit" size="small" sx={{ mb: 2 }} onClick={()=> props.history.push(`/viewuser/${user._id}`)}>
                            View
                       </Button></p>
                           
                    </div>
                    ))
                }

            </div>
            <div className='row center'>
                {
                users?.map((user) => (
                    <div key={user._id} className='card'>
                        <div style={{display:"flex", padding:"5px"}}>
                            <div><img className='small' src={user.image} alt="" /></div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems:'flex-start', marginLeft:"1px"}}>
                                <p style={{margin:"0", padding:"0"}}>{user.name}</p>
                                <p style={{margin:"0", padding:"0"}}>{user.phone}</p>
                                <p style={{ margin: "0", padding: "0" }}>{user.email}</p>
                                {
                                    user.isSeller && <p style={{margin:"0", padding:"0"}}>Seller</p>
                                }
                            </div>
                        </div>
                        <p style={{margin:"0", padding:"0"}}><b>Id:</b>{user._id}</p>
                        <p style={{ margin: "0", padding: "0" }}>{user.address}</p>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <p style={{ margin: "0", padding: "0" }}><Button variant="contained" color="primary" type="submit" size="small" sx={{ mb: 2 }} onClick={()=> props.history.push(`/viewuser/${user._id}`)}>
                            View
                       </Button></p>
                        </div>
                        
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default UserList
