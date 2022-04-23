import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import { getSingleStore } from '../actions/storeActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import { Link } from "react-router-dom"
import Button from "@mui/material/Button";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';


function StoreDetailsPage(props) {
    const dispatch = useDispatch();
    const storeId = props.match.params.id;
   
    const [loadProduct, setLoadProduct] = useState(false);
    const [errorProduct, setErrorProduct ] = useState('')
  const [products, setProducts] = useState([])
  //const [loading, setLoading] = useState(false)
  //const [error, setError] = useState(false)
  //const [stores, setStores] = useState()
    //const [email, setEmail] = useState('');
    

    //get store details from redux store
    const storeDetails = useSelector((state) =>state.storeDetails);
    const { loading, error, store } = storeDetails;
    console.log(store)
  
  
    
    useEffect(() => {
        dispatch(getSingleStore(storeId));

    }, [dispatch, storeId])
  
 

    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoadProduct(true);
                const { data } = await axios.get(`/api/v1/product/nonuser/${storeId}`)
                setLoadProduct(false);
                setProducts(data)
            } catch (error) {
                setErrorProduct(error.message);
                setLoadProduct(false);
                
            }
        }
        fetchProduct()
    }, [storeId])
    //console.log(products)
 
  
    
    return (
        <div>
            {
                   loading? (<LoadingBox></LoadingBox>):
                   error? (<MessageBox variant="danger">{error}</MessageBox>):
                        <>
                            {
                                store.singleStore.isClosed?
                                (<div className='close-store' style={{maxWidth:"100%"}}>
          <h1>Business Activities Closed.</h1>
          <p>To be opened: </p>
                                    <h3>{store.singleStore.toBeOpened}</h3>
                                    </div>) :
                                    (
                                        <div>
                                            <div className="row top bottom">
                    <div className="col-1">
          <div className="profile-card">
            <div>
              
                <h3 className="profile-header">
                  <span className="name-description">Seller Name:</span>{" "}
                  {store.singleStore.creatorName}
                        </h3>  
                                    
             
              <div>
                        <div className="row around">
                          <div>
                             <img
                  className="profile-img"
                  src= {store.singleStore.creatorImage}
                  alt="profile"
                /> 
                          </div>
                  <div className="contact">
                    <p>
                      <span>
                        <PhoneIcon />
                      </span>{" "}
                      {store.singleStore.creatorPhone}
                    </p>
                    <p>
                      <span>
                        <EmailIcon />
                      </span>
                      {store.singleStore.creatorEmail}
                      </p>
                      <p><Link to='/chats'>
                        <Button variant="contained" color="primary" size="small">
                      Chat
                    </Button>
                      </Link></p>
                  </div>
                </div>
                
              </div>
            </div>
            
          </div>
        </div>
                   
                       <div className="col-2">
                       <div className="row around nonuser-col2">
                           <div className="store-image">
                           <h3 className="store-name"><span className="name-description">Store Name:</span>{" "} <strong>{store.singleStore.name}</strong> </h3>
                           <img className="img large" src ={store.singleStore.image} alt="store" />
                           </div>
                           <div className="description">
                                   <h3>Store Details</h3>
                                   <p>Business Address: <strong>{store.singleStore.address}</strong></p>
                                   <p>City/Town: <strong>{store.singleStore.city} </strong></p>
                                   <p>State: <strong>{store.singleStore.state}</strong></p>
                                   <p>Country: <strong>{store.singleStore.country}</strong></p>
                                            <p>Description: <strong>{store.singleStore.description}</strong></p>
                                            <p>
                Delivery: <strong>{store.singleStore.deliveryCapacity}</strong>
                                            </p>
                                            
                                   
                           </div>
                       </div>
                       </div>
                       
                   </div>
                            <div style={{backgroundColor:"white", padding:"10px"}}>
                                
                   <h3 style={{textAlign:"center"}}>Checkout list of our items below, for your shopping pleasure.</h3>
               </div>
                            <div className="row center">
                                {loadProduct && <LoadingBox></LoadingBox>}
                                {errorProduct && <MessageBox variant="danger">{ errorProduct}</MessageBox>}
                   {
                       products.map((product) =>(
                        <Product key = {product._id} product = {product} showStoreButton={false}></Product>
                       ))
                   }

                            </div>
                                        </div>
                                    )
                            }
                   
                            
           </>
            }
            
            
                        </div>
                    
    )
}

export default StoreDetailsPage
