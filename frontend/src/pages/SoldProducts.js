import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSoldProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function SoldProducts() {

  //get login user details from store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo);

  //get ordered products from redux store
  const productSold = useSelector((state) => state.productSold);
  const { loading, error, soldProducts } = productSold
  console.log(soldProducts);
const dispatch = useDispatch();

useEffect(() =>{
    dispatch(getSoldProducts())
},[dispatch])

                
    return (
        <div>
            <h1>Sold Items</h1>
            {
                loading? <LoadingBox></LoadingBox>:
                error? <MessageBox variant ="danger"></MessageBox>:
                <div className ="row center">
                    {
                        soldProducts.map((product) => (
                            product.buyerName && <div key ={product._id} className="card">
                                <Link to={`/product/${product._id}`}>
                                {/* image size should be 680px by 830px */}
                                <img
                                className="medium"
                                src={product.image}
                                alt={product.name}
                                />
                                </Link>
                                <div className ="card-body">
                                <Link to={`/product/${product._id}`}>
                                <h2>Product Name: {product.name}</h2>
                                </Link>
                                <div className="price">Price: <strong>#{product.price}</strong></div>
                                <div>
                                <h3>Customer Information</h3>
                                <p>Name: <strong>{product.buyerName}</strong></p>
                                <p>Phone: <strong>{product.buyerPhone}</strong></p>
                                <p>Address: <strong>{product.buyerAddress}</strong></p>
                                <p>Payment Status: <strong>{product.isPaid? "Paid": "Not Yet Paid"}</strong></p>
                                <p>Payment Date: <strong>{product.isPaid? product.isPaidAt.substring(0, 10): "Not Yet Paid"}</strong></p>
                                </div> 
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
          </div>  
    )
}

export default SoldProducts
