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
 

  //get ordered products from redux store
  const customerOrders = useSelector((state) => state.customerOrders);
  const { loading, error, orderedProducts } = customerOrders
  
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(getOrderedProducts())
  },[dispatch, userInfo])

                
    return (
        <div style={{backgroundColor:"white"}}>
            <h3 style={{ textAlign: "center",padding:"10px" }}>Customer orders</h3>
            {
                orderedProducts && orderedProducts.length === 0 ? (<p style={{padding:"20px"}}>
                    This is where you see orders placed by your customer that they have not paid-for. Orders that are paid-for will not be displayed here. Such orders are displayed in Sold-Products page.
                </p>) :
                    (<>
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
                                <h3>Product Name: {product.name}</h3>
                                </Link>
                                <div className="price">Price: <strong>#{product.price}</strong></div>
                                <div>
                                <h3>Customer Information</h3>
                                <p>Name: <strong>{product.buyerName}</strong></p>
                                <p>Phone: <strong>{product.buyerPhone}</strong></p>
                                <p style={{maxWidth:"250px"}}>Address: <strong>{product.buyerAddress}</strong></p>
                                <p>Payment Status: <strong>{product.isPaid? "Paid": "Not Yet Paid"}</strong></p>
                                <p>Payment Date: <strong>{product.isPaid? product.isPaidAt.substring(0, 10): "Not Yet Paid"}</strong></p>
                                </div> 
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
                    </>)
            }
            
          </div>  
    )
}

export default CustomerOrders
