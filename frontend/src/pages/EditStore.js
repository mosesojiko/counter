import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import FileBase64 from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { editStore, getUserStore } from '../actions/storeActions';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Edit_STORE_RESET } from '../constants/storeConstants';


function EditStore(props) {
    const [name, setName ] = useState('')
    const [address, setAddress ] = useState('')
    const [city, setCity ] = useState('')
    const [ state, setState ] = useState('')
    const [ country, setCountry ] = useState('')
    const [description, setDescription ] = useState('')
    const [image, setImage] = useState('');

    const userLogin = useSelector(state =>state.userLogin);
    const { userInfo } = userLogin;
    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user } = userDetails;
    console.log(user)

    const userStoreDetails = useSelector(state => state.userStoreDetails);
    const { userStore } = userStoreDetails
    console.log(userStore)

    //get editUserStore from redux store
    const editUserStore = useSelector(state => state.editUserStore);
    const {success: successEdit, loading: loadingEdit, error: errorEdit} = editUserStore;

    const dispatch = useDispatch();
    useEffect(() => {
        if(!user) {
            dispatch(detailsUser(userInfo._id));
        }
    },[dispatch, user, userInfo._id])

    useEffect(() => {
        if(!userStore){
            //reset successEdit when we open editstore for the second time
            dispatch({type:Edit_STORE_RESET})
            dispatch(getUserStore())
        }else{
            //fill the input fields with store details
            setName(userStore.name);
            setAddress(userStore.address)
            setCity(userStore.city);
            setState(userStore.state);
            setCountry(userStore.country);
            setDescription(userStore.description);
            setImage(userStore.image)
        }
    },[dispatch, userInfo.name, userStore])

    //form handler function
   const submitHandler= (e) =>{
     e.preventDefault();
     dispatch(
       editStore({
         id: userStore._id,
         name,
         address,
         city,
         state,
         country,
         description,
         image,
       })
       );
        
    }
    if (successEdit) {
      setTimeout(() => {
        //reset successEdit when we open editstore for the second time
        dispatch({ type: Edit_STORE_RESET });
        dispatch(getUserStore());
        props.history.push("/userstore");
      }, 2000);
    }
    
    return (
        <div>
            <form className ="form" onSubmit={submitHandler}>
                <div>
                    <h1>Edit Store</h1>
                </div>
                {
                    loading? <LoadingBox></LoadingBox>:
                    error? <MessageBox variant="danger">{error}</MessageBox>:
                    <>
                    {
                        loadingEdit && <LoadingBox></LoadingBox>
                    }
                    {
                        errorEdit && <MessageBox variant ="danger">{errorEdit}</MessageBox>
                    }
                    {
                        successEdit && <MessageBox variant ="success">Store Updated Successfully.</MessageBox>
                    }
                    <div>
                    <label htmlFor="name">Store name</label>
                    <input type="text" id="name" placeholder="Enter store name"
                    value={name} onChange ={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="address">Store address</label>
                    <input type="text" id="address" placeholder="no. 20 Deco road, Warri."
                    value ={address} onChange ={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="city">City/Town</label>
                    <input type="text" id="city" placeholder="Warri"
                    value = {city} onChange ={(e) => setCity(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="state">State</label>
                    <input type="text" id="state" placeholder="Delta State"
                    value = {state} onChange ={(e) => setState(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input type="text" id="country" placeholder="Nigeria"
                    value = {country} onChange ={(e) => setCountry(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" placeholder="We sell all types of books."
                    value = {description} onChange ={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                        <p>Image of your store</p>
                        <FileBase64 type ="file" multiple={false}  
                        value={image} onDone = {({base64}) => setImage(base64)}
                        />
                </div>
                <div>
                    <label />
                    <button className ="primary" type ="submit">Edit store</button>
                </div>

                    </>
                }
                
            </form>
        </div>
    )
}

export default EditStore
