import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { getProductDetails } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
//import Rating from "../components/Rating"
import Button from "@mui/material/Button";


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
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
              <div style={{backgroundColor:"#f5f5f5", padding:"10px"}}>
                <h1 style={{textAlign:"center"}}>Product Detail</h1>
            <Link to="/">
              <Button variant="contained" color="success" size="small">
                Back to homepage
              </Button>
            </Link>
            <div className="row top">
              <div className="col-2">
                <img className="large" src={product.image} alt={product.name} />
                <Link to={`/store/${product.productStoreId}`}>
                  <p>
                    <Button variant="contained" color="success" size="small">
                      View-store
                    </Button>
                  </p>
                </Link>
              </div>
              <div className="col-1">
                <ul>
                  <li>
                    <h1>{product.name}</h1>
                  </li>
                  {/* <li>
                           <Rating
                           rating = {product.rating}
                           numReviews = {product.numReviews}
                           ></Rating>
                       </li> */}
                  <li>
                    Price: <strong>#{product.price}</strong>
                  </li>
                  <li>
                    Description:<strong>{product.description}</strong>
                  </li>
                  <li>
                    Store-Name: <strong>{product.storeName}</strong>
                  </li>
                  <li>
                    Address:{" "}
                    <strong>
                      {product.storeAddress}, {product.storeCity}
                    </strong>
                      </li>
                      <li>
                    Seller-Name: <strong>{product.sellerName}</strong>
                  </li>
                </ul>
              </div>
              <div className="col-1">
                    {
                      product.isPaid ? (<div>
                        <h4>Buyer Information</h4>
                <p>Buyer Name: <b>{product.buyerName}</b>, Buyer Phone: <b>{product.buyerPhone}</b>, Buyer Email: <b>{product.buyerEmail}</b></p>
                <p>Buyer Address: { product.buyerAddress}</p>
                      </div>) :
                        (<div className="card card-body">
                  <ul>
                    <li>
                      <div className="row">
                        <div>Price</div>
                        <div className="price"><b>#{product.price}</b></div>
                      </div>
                    </li>
                    <li>
                      <div className="row">
                        <div>Status</div>
                        <div>
                          {product.countInStock > 0 ? (
                            <span className="success">In Stock</span>
                          ) : (
                            <span className="danger">Unavailable</span>
                          )}
                        </div>
                      </div>
                    </li>
                    {product.countInStock > 0 && (
                      <>
                        <li>
                          <div className="row">
                            <div>Qty</div>
                          </div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {
                                /* map through the value of countInStock and increament it by 1*/
                                [...Array(product.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )
                              }
                            </select>
                          </div>
                        </li>
                        <li>
                          <button
                            onClick={addToBasketHandler}
                            className="primary block"
                          >
                            {" "}
                            Add to shopping basket
                          </button>
                        </li>
                      </>
                    )}
                  </ul>
                </div>)
                }
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  export default ProductPage
  