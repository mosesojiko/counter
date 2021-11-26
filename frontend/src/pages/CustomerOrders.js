import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrderedProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function CustomerOrders() {

  //get login user details from store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo);

  //get ordered products from redux store
  const customerOrders = useSelector((state) => state.customerOrders);
  const { loading, error, orderedProducts } = customerOrders
  console.log(orderedProducts);
const dispatch = useDispatch();

useEffect(() =>{
    dispatch(getOrderedProducts())
},[dispatch])

                
    return (
        <div>
            <h1>Customer orders</h1>
            {
                loading? <LoadingBox></LoadingBox>:
                error? <MessageBox variant ="danger"></MessageBox>:
                <div className ="row center">
                    {
                        orderedProducts.map((product) => (
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
                                <p>Payment Status: <strong>{product.isPaid? product.paidAt.substring(0, 10): "Not Yet Paid"}</strong></p>
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

export default CustomerOrders
