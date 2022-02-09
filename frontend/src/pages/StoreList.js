import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Store from '../components/Store';
import axios from 'axios'

function StoreList() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [stores, setStores] = useState([])

    //get access to userLogin from redux store
  const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    
    if (!userInfo.isAdmin) {
        window.location="/"
    }
   console.log(stores)
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
    },[userInfo.isAdmin])
    return (
        <div style={{backgroundColor:"#f5f5f5"}}>
            <h1 style={{textAlign:"center"}}>List of stores</h1>
            <div className="row center">
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">Failed to load stores.</MessageBox>}
          {
            stores?.map(store =>(
                <Store key={store._id} store={store}></Store>
            ))
          }
      </div>
    </div>
       
    )
}

export default StoreList
