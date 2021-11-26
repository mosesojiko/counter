import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { getProductDetails } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from "../components/Rating"


function ProductPage(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [ qty, setQty ] = useState(1);

    //read product details from redux store
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product} = productDetails;
    console.log(product)

    useEffect(() => {
        dispatch(getProductDetails(productId));
    },[dispatch, productId]);

    //function to handle add to basket button
    const addToBasketHandler = () => {
        props.history.push(`/basket/${productId}?qty=${qty}`)
    }

    return (
        <div>
            {
                loading? <LoadingBox></LoadingBox>:
                error? <MessageBox variant="danger">{error}</MessageBox>:
                <div>
            <Link to ="/">Back to result</Link>
           <div className = "row top">
               <div className = "col-2">
                   <img className = "large" src ={product.image} alt = {product.name} />
                   <Link to ={`/store/${product.productStoreId}`}><p>View store</p></Link>
               </div>
               <div className = "col-1">
                   <ul>
                       <li>
                           <h1>{ product.name }</h1>
                       </li>
                       <li>
                           <Rating
                           rating = {product.rating}
                           numReviews = {product.numReviews}
                           ></Rating>
                       </li>
                       <li>
                           Price: #{product.price}
                       </li>
                       <li>
                           Description:
                           <p>{ product.description }</p>
                       </li>
                       <li>
                           Store: {product.storeName}
                       </li>
                       <li>
                           Address: {product.storeAddress}, {product.storeCity}
                       </li>
                   </ul>
               </div>
               <div className = "col-1">
                   <div className = "card card-body">
                       <ul>
                           <li>
                               <div className ="row">
                                   <div>Price</div>
                                   <div className="price">#{ product.price }</div>
                               </div>
                           </li>
                           <li>
                               <div className ="row">
                                   <div>Status</div>
                                   <div>
                                       { product.countInStock > 0? (<span className="success">In Stock</span>):
                                       (<span className="danger">Unavailable</span>)
                                       }</div>
                               </div>
                           </li>
                           {
                               product.countInStock > 0 && (
                                   <>
                           <li>
                               <div className = "row">
                                   <div>Qty</div>
                               </div>
                               <div>
                                   <select value = {qty} onChange = {(e) => setQty(e.target.value)}>
                                      {
                                          /* map through the value of countInStock and increament it by 1*/
                                          [...Array(product.countInStock).keys()].map((x)=>(
                                            <option key ={x + 1} value = {x + 1}>{x + 1}</option> 
                                          ))
                                      }
                                   </select>
                               </div>
                           </li>
                           <li>
                               <button onClick={addToBasketHandler} className="primary block"> Add to shopping basket</button>
                           </li>
                           </>
                            )
                        }
                       </ul>
                   </div>
               </div>
           </div>
        </div>
            }
        </div>
    )
  }
  
  export default ProductPage
  