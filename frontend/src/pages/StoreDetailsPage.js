import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSingleStore } from '../actions/storeActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function StoreDetailsPage(props) {
    const dispatch = useDispatch();
    const storeId = props.match.params.id;
   
    //get store details from redux store
    const storeDetails = useSelector((state) =>state.storeDetails);
    const { loading, error, store } = storeDetails;
    console.log(store)

    useEffect(() => {
        dispatch(getSingleStore(storeId));
    }, [dispatch, storeId])
    
    //get user details from store
     const userLogin = useSelector(state =>state.userLogin);
     const { userInfo } = userLogin;
    //  const userDetails = useSelector(state => state.userDetails);
    //  const { user } = userDetails;
    
    
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
                                   <img className="img medium" src ={store.creatorImage} alt="profile" />
                                   </div>
                                   <div>
                                       <div>
                                           <h2>Name: {store.creatorName} </h2>
                                           <div className="contact">
                                               <p><span><i class="fa fa-phone-square" aria-hidden="true"></i></span> {store.creatorPhone}</p>
                                               <p><span><i class="fa fa-envelope" aria-hidden="true"></i></span>{store.creatorEmail}</p>
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
                           <h1 className="store-name">Store Name: <strong>{store.name}</strong> </h1>
                           <img className="img large" src ={store.image} alt="store" />
                           </div>
                           <div className="description">
                                   <h2>Store Details</h2>
                                   <p>Business Address: <strong>{store.address}</strong></p>
                                   <p>City/Town: <strong>{store.city} </strong></p>
                                   <p>State: <strong>{store.state}</strong></p>
                                   <p>Country: <strong>{store.country}</strong></p>
                                   <p>Description: <strong>{store.description}</strong></p>
                                   
                           </div>
                       </div>
                       </div>
                       
                   </div>
               <div>
                   <h2 className="store-name">Checkout list of my items below for your shopping pleasure.</h2>
               </div>
           </>
               }
        </div>
    )
}

export default StoreDetailsPage
