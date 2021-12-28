import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
//import Rating from '../components/Rating'
import { useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from "@mui/material/Button";

function DeleteProduct(props) {
    const id = props.match.params.id
    const [product, setProduct] = useState({});
    const [ loading, setLoading ] = useState(false)
    const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ errorDelete, setErrorDelete ] = useState(false)

    //get login user details from store
    const userLogin = useSelector(state =>state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() =>{
        const fetchData = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get(`/api/v1/product/delete/${id}`,{
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`
                        }
                })
                setLoading(false);
                setProduct(data)
            } catch (error) {
                setError(error.message)
                setLoading(false)
            }
        }
        fetchData()
    },[id, userInfo])

    const handleDelete = async () =>{
        try {
          const { data } = await axios.delete(`/api/v1/product/delete/${id}`,{
            headers: {
                Authorization: `Bearer ${userInfo.token}`
                }
        })
        setProduct(data)
        setSuccess(true)
        } catch (error) {
          setErrorDelete(true)
        }
    }

    //Take us back to userstore after delete
    if (success) {
        setTimeout(() => {
           window.location ="/userstore" 
        },2000)
  }
  if (errorDelete) {
    setTimeout(() => {
      setErrorDelete(false)
    },2000)
  }
    return (
      <div>
        
        <div className="row center">
          
          <div key={product._id} className="card">
            {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">Failed to fetch product.</MessageBox>}
        {success && (
          <MessageBox variant="success">
            Product deleted successfully
          </MessageBox>
        )}
        {
          errorDelete && <MessageBox variant="danger">Failed to delete product.</MessageBox>
        }
            <h1>Delete {product.name}?</h1>
            <Link to={`/product/${product._id}`}>
              {/* image size should be 680px by 830px */}
              <img className="medium" src={product.image} alt={product.name} />
            </Link>
            <div className="card-body">
              <Link to={`/product/${product._id}`}>
                <h2>{product.name}</h2>
              </Link>
              {/* <Rating rating={product.rating} numReviews={product.numReviews} /> */}
              <div className="price">#{product.price}</div>
              <div className='delete-product'>
                <p>
                  <Button variant="contained" color="error" onClick={handleDelete}>
                  Delete
                </Button>
                </p>
                <p>
                  <Link to="/userstore">
                    <Button variant="contained" color="success">
                  Cancel
                </Button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default DeleteProduct
