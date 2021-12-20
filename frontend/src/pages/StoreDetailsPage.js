import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getSingleStore } from '../actions/storeActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';

function StoreDetailsPage(props) {
    const dispatch = useDispatch();
    const storeId = props.match.params.id
    const [loadProduct, setLoadProduct] = useState(false);
    const [errorProduct, setErrorProduct ] = useState('')
    const [products, setProducts ] = useState([])
    const [email, setEmail] = useState('');
    

    //get store details from redux store
    const storeDetails = useSelector((state) =>state.storeDetails);
    const { loading, error, store } = storeDetails;
    console.log(store)
    useEffect(() => {
        if (store) {
            setEmail(store.email)
        }
        
    }, [store])
console.log(email)
    useEffect(() => {
        dispatch(getSingleStore(storeId));

    }, [dispatch, storeId])

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoadProduct(true);
                const { data } = await axios.get('/api/v1/product', { email: store.email })
                setLoadProduct(false);
                setProducts(data)
            } catch (error) {
                setErrorProduct(error.message);
                setLoadProduct(false);
                
            }
        }
        fetchProduct()
    },[store])
    
    return (
        <div>
               {
                   loading? (<LoadingBox></LoadingBox>):
                   error? (<MessageBox variant="danger">{error}</MessageBox>):
                   <>
                   <div className="row top bottom">
                   <div className="col-1">
                           <div className ="profile-card">
                               <div className="row around">
                                   
                                   <div>
                                       <h3>Store owner</h3>
                                   <img className="img medium" src ={store.singleStore.creatorImage} alt="profile" />
                                   </div>
                                   <div>
                                       <div>
                                           <h2>Name: {store.singleStore.creatorName} </h2>
                                           <div className="contact">
                                               <p><span><i class="fa fa-phone-square" aria-hidden="true"></i></span> {store.singleStore.creatorPhone}</p>
                                               <p><span><i class="fa fa-envelope" aria-hidden="true"></i></span>{store.singleStore.creatorEmail}</p>
                                           </div>
                                       </div>
                                    <div className="profile-links">
                                    <Link to="#"><i class="fa fa-instagram"></i></Link> 
                                    <Link to="#"><i class="fa fa-twitter"></i></Link>  
                                    <Link to="#"><i class="fa fa-linkedin"></i></Link>  
                                    <Link to="#"><i class="fa fa-facebook"></i></Link>
                                    </div>
                                   </div>
                               </div>
                               
                           </div>
                       </div>
                       <div className="col-2">
                       <div className="row around">
                           <div className="store-image">
                           <h1 className="store-name">Store Name: <strong>{store.singleStore.name}</strong> </h1>
                           <img className="img large" src ={store.singleStore.image} alt="store" />
                           </div>
                           <div className="description">
                                   <h2>Store Details</h2>
                                   <p>Business Address: <strong>{store.singleStore.address}</strong></p>
                                   <p>City/Town: <strong>{store.singleStore.city} </strong></p>
                                   <p>State: <strong>{store.singleStore.state}</strong></p>
                                   <p>Country: <strong>{store.singleStore.country}</strong></p>
                                   <p>Description: <strong>{store.singleStore.description}</strong></p>
                                   
                           </div>
                       </div>
                       </div>
                       
                   </div>
               <div>
                   <h2 className="store-name">Checkout list of my items below for your shopping pleasure.</h2>
               </div>
                            <div className="row center">
                                {loadProduct && <LoadingBox></LoadingBox>}
                                {errorProduct && <MessageBox variant="danger">{ errorProduct}</MessageBox>}
                   {
                       products.map((product) =>(
                        <Product key = {product._id} product = {product}></Product>
                       ))
                   }

               </div>
           </>
               }
        </div>
    )
}

export default StoreDetailsPage
