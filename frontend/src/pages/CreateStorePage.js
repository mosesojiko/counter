import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FileBase64 from 'react-file-base64';
import { createStore, getUserStore } from '../actions/storeActions';
 import LoadingBox from '../components/LoadingBox';
 import MessageBox from '../components/MessageBox';
//import { USER_CREATE_STORE_RESET } from '../constants/userConstants';
import { updateUserCreateStore } from '../actions/userActions';
import { CREATE_STORE_RESET } from '../constants/storeConstants';
import Button from "@mui/material/Button";
import { useHistory } from 'react-router-dom'

//for select
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function CreateStore(props) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [ category, setCategory ] = useState('')
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [creatorId, setCreatorId] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [creatorEmail, setCreatorEmail] = useState("");
  const [creatorPhone, setCreatorPhone] = useState("");
  const [creatorImage, setCreatorImage] = useState("");
  const [storeOwner, setStoreOwner] = useState(false)
  const [deliveryCapacity, setDeliveryCapacity] = useState('')
  
 //Only login user should be able to create a store
 const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

 
  
  const history = useHistory()

    if (!userInfo) {
        //window.location = '/login';
      history.push("/login");
  }
  
  if (userInfo && userInfo.isSeller === true) {
    window.location = "/userstore"
  }

 const dispatch = useDispatch();
//get user details
// const userDetails = useSelector(state => state.userDetails);
//     const { user } = userDetails;
//    console.log(user)

// const userCreateStore = useSelector(state => state.userCreateStore);
// const { success } = userCreateStore
 
useEffect(() => {
  if (userInfo) {
    setCreatorId(userInfo._id);
    setCreatorName(userInfo.name);
    setCreatorEmail(userInfo.email);
    setCreatorPhone(userInfo.phone);
    setCreatorImage(userInfo.image);
  }
}, [dispatch, userInfo]);
 
  

    //const redirect = props.location.search? props.location.search.split('=')[1] : '/createstore';
    //get access to createStore from redux store
    const createdStore = useSelector((state) => state.createdStore)
    const { loading, error, success } = createdStore;
  
//   const handleFile = (e) =>{
//       //{shareImage && <img src={URL.createObjectURL(shareImage)} alt="" />}
//     const image = e.target.files[0];
//     if(image === '' || image === undefined) {
//       alert("Not an image")
//     }
//     setImage(image)
//   }


  // const storeInfo = useSelector((state) => state.storeInfo);
  // const { loading, error, stores } = storeInfo;
 

  

  const submitHandler = (e) =>{
    e.preventDefault();
    if (userInfo.isSeller === true) {
      setStoreOwner(true);
      return
    } else {
       dispatch(
         createStore(
           name,
           address,
           category,
           city,
           state,
           country,
           description,
           image,
           deliveryCapacity,
           creatorId,
           creatorName,
           creatorEmail,
           creatorPhone,
           creatorImage,
         )
       );
    }
    
  }

  if (success) {
    //update isSeller
    dispatch(
      updateUserCreateStore({
        user: userInfo._id,
      })
    );
dispatch(getUserStore());
    setTimeout(() => {
      //redirect the user to his store page
      dispatch({type: CREATE_STORE_RESET})
    props.history.push('/userstore')
    }, 5000)
  }
  console.log(deliveryCapacity)
    return (
      <div>
        <Link to="/stores">
          <Button variant="contained" color="success">
                  Stores Page
                </Button></Link>
        {storeOwner && (
          <MessageBox variant="danger">
            Yuo have created a store already.
          </MessageBox>
        )}
        <form className="form" onSubmit={submitHandler}>
          <div>
            {/*<pre>{JSON.stringify(imageUrl, null, '\t')}</pre> */}
            <h1>Create Store</h1>
          </div>

          <div>
            <lable htmlFor="name">Store Name</lable>
            <input
              type="text"
              id="name"
              placeholder="Enter store name"
              onChange={(e) => setName(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <lable htmlFor="address">Address</lable>
            <input
              type="text"
              id="address"
              placeholder="Enter address"
              onChange={(e) => setAddress(e.target.value)}
              required
            ></input>
          </div>
          <div>
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
          <div>
            <lable htmlFor="city">City/Towm</lable>
            <input
              type="text"
              id="city"
              placeholder="Enter city/towm"
              onChange={(e) => setCity(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <lable htmlFor="state">State</lable>
            <input
              type="text"
              id="state"
              placeholder="Delta State"
              onChange={(e) => setState(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <lable htmlFor="city">Country</lable>
            <input
              type="text"
              id="country"
              placeholder="Nigeria"
              onChange={(e) => setCountry(e.target.value)}
            ></input>
          </div>
          <div>
            <lable htmlFor="description">Description</lable>
            <input
              type="text"
              id="description"
              placeholder="Enter store description"
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
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          {success && (
            <MessageBox variant="success">
              Store created successfully.
            </MessageBox>
          )}
          <div>
            <label htmlFor="deliveryCapacity">Delivery of goods</label>
    <select id="deliveryCapacity" value={deliveryCapacity} onChange={(e) => setDeliveryCapacity(e.target.value)}>
              <option value="">Select</option>
              <option value="Within-the-same-city">Same town/city only</option>
    <option value="Within-the-same-state">Same State</option>
    <option value="nation-wide">Nation wide</option>
                
  </select>
          </div>
          <div>
            <label />
            <button style={{marginBottom:"5px"}} className="primary" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    );
}

export default CreateStore
