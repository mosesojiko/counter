import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import FileBase64 from 'react-file-base64';
import {useDispatch, useSelector } from 'react-redux';
import { findProductForUpdate, updateUserProduct } from '../actions/productActions';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
    GET_PRODUCT_FOR_UPDATE_RESET,
    UPDATE_PRODUCT_RESET
} from '../constants/productConstants';
import Button from '@mui/material/Button';

//for select
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



function UpdateProduct(props) {
    //const { name, price, category, numberInStore, image, countInStock, brand, description, sellerName, sellerEmail, sellerId, sellerPhone, productStore } =
    const id = props.match.params.id;

    const [ name, setName ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ image, setImage ] = useState('');
    const [ countInStock, setCountInStock ] = useState('');
    const [ brand, setBrand ] = useState('');
    const [description, setDescription] = useState('');
    
    //delivery charges
  const [free, setFree] = useState(0)
  const [sameCity, setSameCity] = useState(0)
  const [sameState, setSameState] = useState(0)
  const [nationWide, setNationWide] = useState(0)

    //get access to logged in user
    const userLogin = useSelector(state =>state.userLogin);
    const { userInfo } = userLogin;
    

    //get details of a loggged in user
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;
  

    //get access to the product for update
    const productForUpdate = useSelector((state) => state.productForUpdate);
    const {loading: loadingProduct, error:errorProduct, product } = productForUpdate
  

    //get access to update product from redux store
    const updateProduct = useSelector((state) => state.updateProduct);
    const {loading:loadingUpdate, error: errorUpdate, success,} = updateProduct



    const dispatch = useDispatch();
    useEffect(() => {
        if(!user) {
            dispatch(detailsUser(userInfo._id));
        }
    },[dispatch, user, userInfo])

    useEffect(() =>{
        if(!id) {
            dispatch({type: GET_PRODUCT_FOR_UPDATE_RESET})
            dispatch({type: UPDATE_PRODUCT_RESET})
        }else{
            dispatch(findProductForUpdate(id))
        }
            
    },[dispatch, id])

    useEffect(() =>{
        if(product) {
            setName(product.name)
            setPrice(product.price)
            setCategory(product.category)
            setImage(product.image)
            setCountInStock(product.countInStock)
            setBrand(product.brand)
            setDescription(product.description)
            setFree(product.free)
            setSameCity(product.sameCity)
            setSameState(product.sameState)
            setNationWide(product.nationWide)
        }
    },[product])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUserProduct({
            id, name, price, category, image, countInStock, brand, description, free, sameCity, sameState, nationWide
        }))
       
    }

    if (success) {
        setTimeout(() => {
            dispatch({ type: GET_PRODUCT_FOR_UPDATE_RESET });
            dispatch({ type: UPDATE_PRODUCT_RESET });
            window.location ="/userstore"
        },2000)
    }
    if (errorUpdate) {
        setTimeout(() => {
            dispatch({ type: GET_PRODUCT_FOR_UPDATE_RESET });
            dispatch({ type: UPDATE_PRODUCT_RESET });
        },2000)
    }


    return (
        <div>
            <div style={{padding:"5px", backgroundColor:"white", padding:'10px', width:"100%"}}>
              <h2 style={{textAlign:"center"}}>Edit Product</h2>
              <p style={{ maxWidth: "90%" }}>Do not fake the price of your item/product in other to avoid rejection. </p>
                {/*<pre>{JSON.stringify(imageUrl, null, '\t')}</pre> */}
                {
                    loading && <LoadingBox></LoadingBox>
                }
                {
                    error && <MessageBox variant="danger">Error</MessageBox>
                }
                    
                
                    {
                        loadingProduct && <LoadingBox></LoadingBox>
                    }
                    {
                        errorProduct && <MessageBox variant="danger">Could not load product.</MessageBox>
                    }
                    
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
               value={name}                 
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
                value={price}                
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
                value={countInStock}            
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
              value={brand}                  
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
                 value={description}               
                  onChange={(e) => setDescription(e.target.value)}
                  
                  required
            ></input>
                </div>
                <div>
                <p>Change Image?</p>
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
               value={free}                 
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
               value={sameCity}                 
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
               value={sameState}     
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
               value={nationWide}                 
                  onChange={(e) => setNationWide(e.target.value)}
                  
            ></input>
                </div>
                
                <div>
            <label />
            
            <Button variant="contained" color="success" type="submit" size="large" sx={{mb:2}}>
                  Edit Product
            </Button>
            </div>
                
                {/* end of two */}
              </div>

                </div>
                
             {
                        loadingUpdate && <LoadingBox></LoadingBox>
                    }
                    {
                        errorUpdate && <MessageBox variant ="danger">Failed to update product.</MessageBox>
                    }
                    {
                        success && <MessageBox variant ="success">Product Updated Successfully.</MessageBox>
                    } 
              </form>

        </div>
    )
}

export default UpdateProduct
