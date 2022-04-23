import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import axios from 'axios'
import Product from '../components/Product';

function ProductList() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [products, setProducts] = useState([])


     //get access to userLogin from redux store
  const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    
    if (!userInfo.isAdmin) {
        window.location="/"
    }
   
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
            const { data } = await axios.get('/api/v1/product/admin', {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
            setLoading(false)
            setProducts(data)
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }

        fetchProducts()
    },[userInfo.isAdmin])

    //console.log(products)
    return (
        <div style={{backgroundColor:"#f5f5f5"}}>
            <h3 style={{textAlign:"center"}}>List of products</h3>
            <div className="row center">
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">Failed to load products</MessageBox>}
            {products?.map((product) => (
              <Product key={product._id} product={product} showStoreButton={true}></Product>
            ))}
          </div>
        </div>
    )
}

export default ProductList
