import React from 'react'
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import SearchIcon from '@mui/icons-material/Search';

function Dashboard(props) {
     const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
  const [users, setUsers] = useState([])
  
  const [loadBannedUsers, setLoadBannedUsers] = useState(false)
  const [loadSellers, setLoadSellers] = useState(false)

 const [search, setSearch] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchResult, setSearchResult] = useState([])
  const [searchError, setSearchError] = useState(false)
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
  console.log(users)


  //const myNotifications = notifs.filter((n) => n.latestMessage.sender._id !== userInfo._id)
  const blockedUsers = () => setLoadBannedUsers(true)
  const sellerUsers = () => setLoadSellers(true)
  
  const handleSearch = async(e) => {
e.preventDefault();
    if (!search) {
      setEmptySearch(true);
      return
    }
    try {
      setSearchLoading(true)
      const { data } = await axios.get(`/api/v1/user/search?search=${search}`, {
        headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
      })
      setSearchLoading(false)
      setSearchResult(data)
      if (data.length === 0) {
        setNotFound(true)
      }
      setSearch("")
    } catch (error) {
      setSearchError(true)
      setSearchLoading(false)
    }
  }
   
  return (
      <div style={{backgroundColor:"#f8f8f8", maxWidth:"100%", padding:"10px"}}>
          <div className="row between">
        <div className="home-header">
          <h4>
            <Link to="/storelist">
              <Button variant="contained" color="secondary" size="small">
                Stores
              </Button>
            </Link>
          </h4>
          
          <h4>
            <Link to="/productlist">
              <Button variant="contained" color="success" size="small">
                Products
              </Button>
            </Link>
          </h4>
          <h4>
            <Link to="/guide">
              <Button variant="contained" size="small">
                Guide
              </Button>
            </Link>
          </h4>
          
              </div>
              <div className='home-header'>
                  
          <h4>
            <Link to="/orderlist">
              <Button variant="contained" color="primary" size="small">
                Orders
              </Button>
            </Link>
                  </h4>
                  <h4>
            <Link to="/soldproductlist">
              <Button variant="contained" color="secondary" size="small">
                Sold Items
              </Button>
            </Link>
          </h4>
           <h4>
            <Link to="/withdrawlist">
              <Button variant="contained" color="warning" size="small">
                Withdraw request
              </Button>
            </Link>
          </h4>
              </div>
              <div className='home-header'>
                  <h4>
            <Link to="/userlist">
              <Button variant="contained" color="success" size="small">
                Users
              </Button>
                      </Link>
                      
                  </h4>
                  <h4>
            <Link to="/complainlist">
              <Button variant="contained" color="error" size="small">
                Complains
              </Button>
                      </Link>
                  </h4>
                  <h4>
            <Link to="/newsletterlist">
              <Button variant="contained" color="primary" size="small">
                Newsletters
              </Button>
                      </Link>
                      </h4>
          
                  
              </div>
      </div>
      
      <h3 style={{ textAlign: "center" }}>List of Users </h3>

      <div className='row around' style={{marginBottom:"50px"}}>
        <div> <Button variant="contained" color="error" size="small" onClick={blockedUsers}>
                Blocked Users
        </Button></div>
        <div> <Button variant="contained" color="success" size="small" onClick={sellerUsers}>
                Sellers
        </Button></div>
        <div>
          <form style={{backgroundColor:"black"}} onSubmit={handleSearch}>
                <input type="text" id="search" placeholder='Search by name'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              <button style={{backgroundColor:"#000080", color:"white"}} type="submit">
                  <SearchIcon sx={{fontSize:"18px"}} />
                </button>
          </form>
          {
              notFound && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="success" onClose={() => setNotFound(false)}>User Not Found</Alert>
      
            </Stack>
              }
              {
              emptySearch && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="warning" onClose={() => setEmptySearch(false)}>Search cannot be empty.</Alert>
      
            </Stack>
          }
          {
              searchError && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="warning" onClose={() => setSearchError(false)}>Error loading user.</Alert>
      
            </Stack>
          }
          {
            searchLoading && <LoadingBox></LoadingBox>
          }
        </div>
       
      </div>
      <div>
        {
               loadBannedUsers && <Stack sx={{ maxWidth: '70%' }} spacing={2}>
                  <Alert severity="success" onClose={() => setLoadBannedUsers(false)} sx={{fontSize:"20px"}}>List of blocked users below</Alert>
      
                </Stack>
        }
        {
               loadSellers && <Stack sx={{ maxWidth: '70%' }} spacing={2}>
                  <Alert severity="success" onClose={() => setLoadSellers(false)} sx={{fontSize:"20px"}}>List of sellers below</Alert>
      
                </Stack>
        }
        

         
        {
               searchResult?.map((user) => (
                    <div key={user._id} style={{border:"1px solid black", marginBottom:"2px",backgroundColor:"#f8f8f8"}}>
                   <h4 style={{ marginBottom: "1px", marginLeft: "5px" }}>Id: {user._id} {" "} <span><Button variant="contained" color="primary" type="submit" size="small" sx={{ mb: 2 }} onClick={()=> props.history.push(`/viewuser/${user._id}`)}>
                            View
                       </Button></span></h4>
                   
                        <table className="table">
                            <thead>
                                <tr>
                                
                                    <th>Name</th>
                                    <th>EMAIL</th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                        
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{ user.isSeller && user.isBanned? "Seller/Blocked": user.isSeller? "Seller":  user.isBanned?"Blocked":"" }</td>
                                
                            </tr>
                    
                
                            
                        </tbody>
                    </table >
                                            
                        
                    </div>
                    ))
            }
        
         
        {
            users.map((user) => (
              loadBannedUsers && user.isBanned === true &&
                   <div key={user._id} style={{ border: "1px solid black", marginBottom: "2px", backgroundColor: "#f8f8f8" }}>
                     
                        <h4 style={{ marginBottom: "1px", marginLeft: "5px" }}>Id: {user._id} {" "} <span><Button variant="contained" color="primary" type="submit" size="small" sx={{ mb: 2 }} onClick={()=> props.history.push(`/viewuser/${user._id}`)}>
                            View
                       </Button></span></h4>
                        <table className="table">
                            <thead>
                                <tr>
                                
                                    <th>Name</th>
                                    <th>EMAIL</th>
                                    <th>STATUS</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                        
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{ user.isSeller && user.isBanned? "Seller/Blocked": user.isSeller? "Seller":  user.isBanned?"Blocked":"" }</td>
                                <td>
                                    <Button variant="contained" color="primary" type="submit" size="small" sx={{ mb: 2 }} onClick={()=> props.history.push(`/viewuser/${user._id}`)}>
                            View
                       </Button>
                                </td>
                                
                            </tr>
                    
                
                            
                        </tbody>
                    </table >
                                            
                        
                  </div>
                 
                    ))
        }
        

        {
            users.map((user) => (
              loadSellers && user.isSeller === true &&
                   <div key={user._id} style={{ border: "1px solid black", marginBottom: "2px", backgroundColor: "#f8f8f8" }}>
                     
                        <h4 style={{ marginBottom: "1px", marginLeft: "5px" }}>Id: {user._id} {" "} <span><Button variant="contained" color="primary" type="submit" size="small" sx={{ mb: 2 }} onClick={()=> props.history.push(`/viewuser/${user._id}`)}>
                            View
                       </Button></span></h4>
                        <table className="table">
                            <thead>
                                <tr>
                                
                                    <th>Name</th>
                                    <th>EMAIL</th>
                                    <th>STATUS</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                        
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{ user.isSeller && user.isBanned? "Seller/Blocked": user.isSeller? "Seller":  user.isBanned?"Blocked":"" }</td>
                                <td>
                                    <Button variant="contained" color="primary" type="submit" size="small" sx={{ mb: 2 }} onClick={()=> props.history.push(`/viewuser/${user._id}`)}>
                            View
                       </Button>
                                </td>
                                
                            </tr>
                    
                
                            
                        </tbody>
                    </table >
                                            
                        
                  </div>
                 
                    ))
        }
        

        
      </div>
      {
                loading && <LoadingBox></LoadingBox>
            }
            
            {
                error && <MessageBox variant="danger">Error loading orders</MessageBox>
          }
          
      <div className='row center'>
        {
               !loadBannedUsers && !loadSellers && searchResult.length < 1 && users?.map((user) => (
                    <div key={user._id} style={{border:"1px solid black", margin:"2px",backgroundColor:"#f8f8f8"}}>
                   <h4 style={{ marginBottom: "1px", marginLeft: "5px" }}>Id: {user._id} {" "} <span><Button variant="contained" color="primary" type="submit" size="small" sx={{ mb: 2 }} onClick={()=> props.history.push(`/viewuser/${user._id}`)}>
                            View
                       </Button></span></h4>
                   
                        <table className="table">
                            <thead>
                                <tr>
                                
                                    <th>Name</th>
                                    <th>EMAIL</th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                        
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{ user.isSeller && user.isBanned? "Seller/Blocked": user.isSeller? "Seller":  user.isBanned?"Blocked":"" }</td>
                                
                            </tr>
                    
                
                            
                        </tbody>
                    </table >
                                            
                        
                    </div>
                    ))
            }
            
        
          </div>
          
    </div>
  )
}

export default Dashboard