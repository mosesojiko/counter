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
import Button from "@mui/material/Button";
//import { useHistory } from 'react-router-dom'
//for select
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function EditStore() {
    const [name, setName ] = useState('')
    const [address, setAddress] = useState('')
    const [ category, setCategory ] = useState('')
    const [city, setCity ] = useState('')
    const [ state, setState ] = useState('')
    const [ country, setCountry ] = useState('')
    const [description, setDescription ] = useState('')
    const [image, setImage] = useState('');
    const [deliveryCapacity, setDeliveryCapacity] = useState('')

    const userLogin = useSelector(state =>state.userLogin);
    const { userInfo } = userLogin;
    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user } = userDetails;
   
    const userStoreDetails = useSelector(state => state.userStoreDetails);
    const { userStore } = userStoreDetails

    //get editUserStore from redux store
    const editUserStore = useSelector(state => state.editUserStore);
    const {success: successEdit, loading: loadingEdit, error: errorEdit} = editUserStore;

    //const history = useHistory()
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
         category,
         city,
         state,
         country,
         description,
           image,
         deliveryCapacity
       })
       );
        
    }
    if (successEdit) {
      setTimeout(() => {
        //reset successEdit when we open editstore for the second time
        dispatch({ type: Edit_STORE_RESET });
        dispatch(getUserStore());
        window.location ="/userstore";
      }, 2000);
    }
    
    if (errorEdit) {
      setTimeout(() => {
        //reset and clear the message after 3 second
          dispatch({ type: Edit_STORE_RESET });
          
      }, 3000);
    }
    return (
        <div>

        <form className="register" onSubmit={submitHandler}>
          <div>
          <div>
            {/*<pre>{JSON.stringify(imageUrl, null, '\t')}</pre> */}
            <h2 style={{textAlign:"center"}}>Edit Store</h2>
          </div>

          <div className='register-items'>
            <lable htmlFor="name">Store Name</lable>
              <input
                className='register-input'
              type="text"
              id="name"
                placeholder="Enter store name"
                value ={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></input>
          </div>
          <div className='register-items'>
            <lable htmlFor="address">Address</lable>
              <input
                className='register-input'
              type="text"
              id="address"
                placeholder="Enter address"
                value ={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></input>
          </div>
          <div className='register-items'>
            <lable htmlFor="category">Store Category</lable>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={category}
          onChange={(e) =>setCategory(e.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
                </MenuItem>
                <MenuItem value="supermarket">Supermarket</MenuItem>
                <MenuItem value="men">Men's Fashion</MenuItem>
                <MenuItem value="women">Women's Fashion</MenuItem>
                 <MenuItem value="menandwomen">Fashion (Men and Women)</MenuItem>
                <MenuItem value="phone">Phone and Accessories</MenuItem>
                <MenuItem value="computing">Computing</MenuItem>
                <MenuItem value="health">Health and Beauty</MenuItem>
                <MenuItem value="baby">Baby Products</MenuItem>
                <MenuItem value="furniture">Furniture</MenuItem>
                <MenuItem value="automobile">Automobile</MenuItem>
                <MenuItem value="gaming">Gaming</MenuItem>
                <MenuItem value="food">Food</MenuItem>
                <MenuItem value="drinks">Drinks (Beer, wine, water, etc)</MenuItem>
                <MenuItem value="household">household (Kitchen equipment)</MenuItem>
                <MenuItem value="groceries">Groceries</MenuItem>
                <MenuItem value="pharmacy">Pharmacy (drugs)</MenuItem>
                <MenuItem value="others">Others</MenuItem>
        </Select>
      </FormControl>
          </div>
          <div className='register-items'>
            <lable htmlFor="city">City/Towm</lable>
              <input
                className='register-input'
              type="text"
              id="city"
                placeholder="Enter city/towm"
                value ={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></input>
          </div>
          <div className='register-items'>
            <lable htmlFor="state">State</lable>
              <input
                className='register-input'
              type="text"
              id="state"
                placeholder="Delta State"
                value={state}
              onChange={(e) => setState(e.target.value)}
              required
            ></input>
          </div>
          <div className='register-items'>
            <lable htmlFor="city">Country</lable>
              <input
                className='register-input'
              type="text"
              id="country"
                placeholder="Nigeria"
                value={country}
              onChange={(e) => setCountry(e.target.value)}
            ></input>
          </div>
          <div className='register-items'>
            <lable htmlFor="description">Description</lable>
              <input
                className='register-input'
              type="text"
              id="description"
                placeholder="Enter store description"
                value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></input>
          </div>

          <div>
            <p>Image of your store front</p>
            <FileBase64
              type="file"
              multiple={false}
              onDone={({ base64 }) => setImage(base64)}
            />
          </div>
          
          <div className='register-items' style={{marginTop:"5px"}}>
            <label htmlFor="deliveryCapacity">Delivery capacity</label>
    <select className='register-input' id="deliveryCapacity" value={deliveryCapacity} onChange={(e) => setDeliveryCapacity(e.target.value)}>
              <option value="">Select</option>
              <option value="Within-the-same-city">Same town/city only</option>
    <option value="Within-the-same-state">Same State</option>
    <option value="nation-wide">Nation wide</option>
                
  </select>
          </div>
          <div>
            <label />
            <button  className="register-button" type="submit">
              Edit
            </button>
            </div>
          </div>
           {
                        loadingEdit && <LoadingBox></LoadingBox>
                    }
                    {
                        errorEdit && <MessageBox variant ="danger">Failed to edit store. Check your network and try again.</MessageBox>
                    }
                    {
                        successEdit && <MessageBox variant ="success">Store Updated Successfully.</MessageBox>
                    }
        </form>

        </div>
    )
}

export default EditStore
