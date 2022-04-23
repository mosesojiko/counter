import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FileBase64 from 'react-file-base64';
 import LoadingBox from '../components/LoadingBox';
 import MessageBox from '../components/MessageBox';
import { createProduct } from '../actions/productActions';
import { getUserStore } from '../actions/storeActions';
import Button from "@mui/material/Button";
//for select
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



function CreateProductPage() {
    //name, price, category, image, countInStock, brand, rating, numReviews, description
  const [name, setName ] = useState('')
  const [ price, setPrice ] = useState(0);
  const [ category, setCategory ] = useState('')
  const [ image, setImage ] = useState('');
  const [ countInStock, setCountInStock ] = useState(1);
  const [ brand, setBrand ] = useState('');
  const [description, setDescription ] = useState('')
  const [sellerName, setSellerName ] = useState('');
  const [sellerEmail, setSellerEmail ] = useState('');
  const [sellerId, setSellerId ] = useState('');
  const [sellerPhone, setSellerPhone ] = useState('');
  const [ productStoreId, setProductStoreId ] = useState('')
  const [ storeName, setStoreName ] = useState('')
  const [ storeAddress, setStoreAddress ] = useState('')
  const [storeCity, setStoreCity] = useState('')
  const [storeState, setStoreState] = useState('')
  const [storeCountry, setStoreCountry] = useState('')
  
   //delivery charges
  const [free, setFree] = useState(0)
  const [sameCity, setSameCity] = useState(0)
  const [sameState, setSameState] = useState(0)
  const [nationWide, setNationWide] = useState(0)
  const [deliveryCapacity, setDeliveryCapacity] = useState('')
 

    //const redirect = props.location.search? props.location.search.split('=')[1] : '/stores';

    //get access to userInfo
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
  

     const userStoreDetails = useSelector(state => state.userStoreDetails);
    const { userStore } = userStoreDetails
 

    //get access to createStore from redux store
    const productCreate = useSelector((state) => state.productCreate)
    const { success, loading, error } = productCreate;
  
  

//   const handleFile = (e) =>{
//       //{shareImage && <img src={URL.createObjectURL(shareImage)} alt="" />}
//     const image = e.target.files[0];
//     if(image === '' || image === undefined) {
//       alert("Not an image")
//     }
//     setImage(image)
//   }
const dispatch = useDispatch();
useEffect(() =>{
  if(!userStore) {
    dispatch(getUserStore())
  }
  if(userStore){
    setProductStoreId(userStore && userStore._id);
    setStoreName(userStore && userStore.name);
    setStoreAddress(userStore && userStore.address);
    setStoreCity(userStore && userStore.city);
    setStoreState(userStore && userStore.state)
    setStoreCountry(userStore && userStore.country);
    setDeliveryCapacity(userStore && userStore.deliveryCapacity)
  }
},[dispatch, userStore])

//add user info to product

useEffect(() => {
  if(userInfo){
      setSellerName(userInfo.name);
      setSellerEmail(userInfo.email);
      setSellerId(userInfo._id);
      setSellerPhone(userInfo.phone)
  }
  },[dispatch, userInfo])
//console.log(productStoreId)
 
  const submitHandler = (e) =>{
    e.preventDefault();
    dispatch(createProduct(name, price, category, image, countInStock, brand, description, free, sameCity, sameState, nationWide, sellerName, sellerEmail, sellerId, sellerPhone, productStoreId, storeName, storeAddress, storeCity, storeState, storeCountry,deliveryCapacity,{ ...userStore}));
  
  }
  if (success) {
    setTimeout(() => {
      window.location ="/userstore"
    },2000)
  }

    return (
      <div style={{maxWidth:"100%"}}>
        <div className="row around">
          <div>
            <h4>
              <Link to="/stores"><Button variant="contained" color="success">
                  Stores 
                </Button></Link>
            </h4>
          </div>
          <div>
            <h4>
              <Link to="/"><Button variant="contained" color="success">
                  Products
                </Button></Link>
            </h4>
          </div>
          <div >
            
            <h4>
              <Link to="/guide"><Button variant="contained" color="primary">
                  Guide
                </Button></Link>
            </h4>
          </div>
        </div>
        
        
        <div style={{ backgroundColor: "#fff", padding: "10px", maxWidth:"100%"}}>
          <div style={{padding:"5px"}}>
              <h2 style={{textAlign:"center"}}>Create Product</h2>
            <p style={{ maxWidth: "90%" }}>Do not fake the price of your item/product in other to avoid rejection. </p>
            <p style={{maxWidth:"90%"}}> We will only charge you 3% when you successfully sell this item.</p>
              {/*<pre>{JSON.stringify(imageUrl, null, '\t')}</pre> */}
            </div>
          <form className="create-product" onSubmit={submitHandler}>
            
            <div className='create-product-container'>
              <div className='create-product-one'>
                <div className='create-product-items'>
            <lable htmlFor="name">Product Name</lable>
                  <input
                    className='create-product-input'
              type="text"
              id="name"
              placeholder="Canvass"
              onChange={(e) => setName(e.target.value)}
                  required
            ></input>
                </div>
                
                <div className='create-product-items'>
            <lable htmlFor="price">Price</lable>
                  <input
                    className='create-product-input'
              type="text"
              id="price"
              placeholder="5000"
              onChange={(e) => setPrice(e.target.value)}
                  
                  required
            ></input>
                </div>
                
                <div className='create-product-items'>
            
            <lable htmlFor="category">Product Category</lable>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120, maxWidth:"93%" }}>
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
                <MenuItem value="men">Men's Fashion</MenuItem>
                <MenuItem value="women">Women's Fashion</MenuItem>
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
                
                <div className='create-product-items'>
            <lable htmlFor="countInStock">Count in stock</lable>
                  <input
                    className='create-product-input'
              type="text"
              id="countInStock"
              placeholder="Only 4 left in store."
              onChange={(e) => setCountInStock(e.target.value)}
            ></input>
                </div>
                
                <div className='create-product-items'>
            <lable htmlFor="brand">Brand</lable>
                  <input
                    className='create-product-input'
              type="text"
              id="brand"
              placeholder="Nike"
              onChange={(e) => setBrand(e.target.value)}
              
            ></input>
                </div>
                
                <div className='create-product-items'>
            <lable htmlFor="description">Description</lable>
                  <input
                    className='create-product-input'
              type="text"
              id="description"
              placeholder="size: 42, weight: 0.8 kg, color: blue"
                  onChange={(e) => setDescription(e.target.value)}
                  
                  required
            ></input>
                </div>
                <div>
            <FileBase64
              type="file"
              multiple={false}
              onDone={({ base64 }) => setImage(base64)}
            />
              </div>
              </div>
              {/* div two */}
              <div className='create-product-two'>
                <div>
                  <p style={{maxWidth: "100%"}}>Please, fill in the amount you will charge to send the item to the buyer.</p>
                </div>
                <div className='create-product-items'>
                <lable htmlFor="free">Free</lable>
                  <input
                    className='create-product-input'
              type="text"
              id="free"
              placeholder="00"
                  onChange={(e) => setFree(e.target.value)}
                  
            ></input>
                </div>
                <div className='create-product-items'>
                <lable htmlFor="sameCity">Same towm/city</lable>
                  <input
                    className='create-product-input'
              type="text"
              id="sameCity"
              placeholder="300"
                  onChange={(e) => setSameCity(e.target.value)}
                  
            ></input>
                </div>
                <div className='create-product-items'>
                <lable  htmlFor="sameState">Within the same State</lable>
                  <input
                    className='create-product-input'
              type="text"
              id="sameState"
              placeholder="1000"
                  onChange={(e) => setSameState(e.target.value)}
                  
            ></input>
                </div>
                
                <div className='create-product-items'>
                <lable htmlFor="nationWide">Nationwide</lable>
                  <input
                    className='create-product-input'
              type="text"
              id="nationWide"
              placeholder="1500"
                  onChange={(e) => setNationWide(e.target.value)}
                  
            ></input>
                </div>
                
                <div>
            <label />
            
            <Button variant="contained" color="success" type="submit" size="large" sx={{mb:2}}>
                  Create Product
            </Button>
            </div>
                
                {/* end of two */}
              </div>

                </div>
                
            {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          {success && (
            <MessageBox variant="success">
              Product created successfully.
            </MessageBox>
          )}
              </form>
           </div>

        
        
      </div>
    );
}

export default CreateProductPage
