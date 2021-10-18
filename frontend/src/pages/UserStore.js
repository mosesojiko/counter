import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { getUserStore } from '../actions/storeActions';


function UserStore() {
    //get user details from store
    const userLogin = useSelector(state =>state.userLogin);
    const { userInfo } = userLogin;
    console.log(userInfo)

    const userStoreDetails = useSelector((state) => state.userStoreDetails);
    const { userStore } = userStoreDetails
   
    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch(getUserStore())
    },[dispatch])

    return (
        <div>
                   <div className="row top bottom">
                       <div className="col-1">
                           <div className ="profile-card">
                               <div className="row around">
                                   
                                   <div>
                                       <h3>Store owner</h3>
                                   <img className="img medium" src ={userInfo.image} alt="profile" />
                                   </div>
                                   <div>
                                       <div>
                                           <h2>Name: {userInfo.name} </h2>
                                           <div className="contact">
                                               <p><span><i class="fa fa-phone-square" aria-hidden="true"></i></span> {userInfo.phone}</p>
                                               <p><span><i class="fa fa-envelope" aria-hidden="true"></i></span>{userInfo.businessEmail}</p>
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
                               <div>
                                   {
                                   <Link to="/profile"><button className="profile-button">Edit profile</button></Link>
                                   }
                               </div>
                           </div>
                       </div>
                       <div className="col-2">
                       <div className="row around">
                           <div className="store-image">
                           <h1 className="store-name">Store Name: <strong>{userStore && userStore.name}</strong> </h1>
                           <img className="img large" src ={userStore && userStore.image} alt="store" />
                           </div>
                           <div className="description">
                                   <h2>Store Details</h2>
                                   <p>Business Address: <strong>{userStore && userStore.address}</strong></p>
                                   <p>City/Town: <strong>{userStore && userStore.city}</strong></p>
                                   <p>State: <strong>{userStore && userStore.state}</strong></p>
                                   <p>Country: <strong>{userStore && userStore.country}</strong></p>
                                   <p>Description: <strong>{userStore && userStore.description}</strong></p>
                                   <div>
                                   {
                                   <Link to="/editstore"><button className="profile-button">Edit store</button></Link>
                                   }
                               </div>
                                   
                           </div>
                       </div>
                       </div>
                       
                   </div>
                   
                  


               <div>
                   <h2 className="store-name">Checkout list of my items below for your shopping pleasure.</h2>
               </div>
         
              
        </div>
    )
}

export default UserStore
