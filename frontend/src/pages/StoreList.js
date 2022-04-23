import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox'
// import Store from '../components/Store';
import axios from 'axios'
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

function StoreList(props) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [stores, setStores] = useState([])

    const [search, setSearch] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchResult, setSearchResult] = useState([])
  const [searchError, setSearchError] = useState(false)
  const [notFound, setNotFound] = useState(false);
  const [emptySearch, setEmptySearch] = useState(false)

  const [loadBlockedStores, setLoadBlockedStores] = useState(false)

    //get access to userLogin from redux store
  const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    
    if (!userInfo.isAdmin) {
        window.location="/"
    }
   //console.log(stores)
    useEffect(() => {
        const fetchStores = async () => {
            try {
                setLoading(true)
            const { data } = await axios.get('/api/v1/store/admin', {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
            setLoading(false)
            setStores(data)
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }

        fetchStores()
    }, [userInfo.isAdmin])
    

    //handleSearch function
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) {
      setEmptySearch(true);
      return
    }
    try {
      setSearchLoading(true)
        const { data } = await axios.get(`/api/v1/store/searchforadmin?search=${search}`, {
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

  const blockedStores = () => setLoadBlockedStores(true)
    return (
        <div style={{backgroundColor:"#f5f5f5"}}>
            <h3 style={{ textAlign: "center" }}>List of stores</h3>
            <div className='row around' style={{ marginBottom: "50px" }}>
                <div> <Button variant="contained" color="error" size="small" onClick={blockedStores}>
                Blocked stores
                </Button></div>
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
              <Alert severity="success" onClose={() => setNotFound(false)}>Store Not Found</Alert>
      
            </Stack>
              }
              {
              emptySearch && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="warning" onClose={() => setEmptySearch(false)}>Search cannot be empty.</Alert>
      
            </Stack>
                }
                {
              searchLoading && <LoadingBox></LoadingBox>
                }
                {
              searchError && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="warning" onClose={() => setSearchError(false)}>Error loading search.</Alert>
      
            </Stack>
                }
        
            </div>
            

            

            <div className="row center">
        
                {
                searchResult?.map((store) => (
                    <div key={store._id} style={{border:"1px solid black", margin:"3px",backgroundColor:"#f8f8f8"}}>
                   <h4 style={{ marginBottom: "1px", marginLeft: "5px" }}>Id: {store._id} {" "} </h4>
                   
                        <table className="table">
                            <thead>
                                <tr>
                                
                                    <th>Name</th>
                                    <th>City</th>
                                    <th>Category</th>
                                   <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                        
                                    <td>{store.name}</td>
                                    <td>{store.city}</td>
                                    <td>{ store.category}</td>
                                    <td><Button variant="contained" color="primary" type="submit" size="small" sx={{ mb: 2 }} onClick={()=> props.history.push(`/store/${store._id}`)}>
                            View
                       </Button></td>
                                
                            </tr>
                    
                
                            
                        </tbody>
                    </table >
                                            
                        
                    </div>
                    ))
                }
                </div>


            <div className="row center">
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">Failed to load stores.</MessageBox>}
        
                {
                !loadBlockedStores && stores?.map((store) => (
                    <div key={store._id} style={{border:"1px solid black", margin:"3px",backgroundColor:"#f8f8f8"}}>
                   <h4 style={{ marginBottom: "1px", marginLeft: "5px" }}>Id: {store._id} {" "} </h4>
                   
                        <table className="table">
                            <thead>
                                <tr>
                                
                                    <th>Name</th>
                                    <th>City</th>
                                    <th>Category</th>
                                   <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                        
                                    <td>{store.name}</td>
                                    <td>{store.city}</td>
                                    <td>{ store.category}</td>
                                    <td><Button variant="contained" color="primary" type="submit" size="small" sx={{ mb: 2 }} onClick={()=> props.history.push(`/store/${store._id}`)}>
                            View
                       </Button></td>
                                
                            </tr>
                    
                
                            
                        </tbody>
                    </table >
                                            
                        
                    </div>
                    ))
          }
          
        </div>

        <div className="row center">
        
                {
                 stores?.map((store) => (
                   loadBlockedStores && store.isBanned === true && <div key={store._id} style={{border:"1px solid black", margin:"3px",backgroundColor:"#f8f8f8"}}>
                   <h4 style={{ marginBottom: "1px", marginLeft: "5px" }}>Id: {store._id} {" "} </h4>
                     <span style={{color:"red",marginLeft:"2px"}}>{ store.isBanned? "Blocked":""}</span>
                        <table className="table">
                            <thead>
                                <tr>
                                
                                    <th>Name</th>
                                    <th>City</th>
                                    <th>Category</th>
                                   <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                        
                                    <td>{store.name}</td>
                                    <td>{store.city}</td>
                                    <td>{ store.category}</td>
                                    <td><Button variant="contained" color="primary" type="submit" size="small" sx={{ mb: 2 }} onClick={()=> props.history.push(`/store/${store._id}`)}>
                            View
                       </Button></td>
                                
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

export default StoreList
