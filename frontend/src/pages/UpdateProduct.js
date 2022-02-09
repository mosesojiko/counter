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
            <form className = "form" onSubmit = {submitHandler} >
                <div>
                    <h1>Edit Product</h1>
                </div>
                {
                    loading? <LoadingBox></LoadingBox>:
                    error? <MessageBox variant="danger">Error</MessageBox>:
                    <>
                    {
                        loadingProduct && <LoadingBox></LoadingBox>
                    }
                    {
                        errorProduct && <MessageBox variant="danger">Could not load product.</MessageBox>
                    }
                    
                <div>
                    <label htmlFor="name">Product Name</label>
                    <input type="text" id="name" placeholder="Product name"
                    value ={name} onChange ={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input type="text" id="price" placeholder="10000"
                    value ={price} onChange ={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div>
                    <lable style={{margin:"0 2px"}} htmlFor="category">Product Category</lable>
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
                
                <div>
                    <label htmlFor="countInStock">How many in store?</label>
                    <input type="text" id="countInStock" placeholder="5"
                    value ={countInStock} onChange ={(e) => setCountInStock(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="brand">Brand</label>
                    <input type="text" id="brand" placeholder="LG"
                    value ={brand} onChange ={(e) => setBrand(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" placeholder="Description"
                    value ={description} onChange ={(e) => setDescription(e.target.value)}
                    />
                                </div>
                                <div>
                                    <h4>Delivery Fee</h4>
                                </div>
                                <div>
                    <label htmlFor="free">Free</label>
                    <input type="text" id="free" placeholder="00"
                    value ={free} onChange ={(e) => setFree(e.target.value)}
                    />
                                </div>
                                <div>
                    <label htmlFor="sameCity">Same towm/city</label>
                    <input type="text" id="sameCity" placeholder="300"
                    value ={sameCity} onChange ={(e) => setSameCity(e.target.value)}
                    />
                                </div>
                                <div>
                    <label htmlFor="sameState">Same State</label>
                    <input type="text" id="sameState" placeholder="1000"
                    value ={sameState} onChange ={(e) => setSameState(e.target.value)}
                    />
                                </div>
                                <div>
                    <label htmlFor="nationWide">Nation Wide</label>
                    <input type="text" id="nationWide" placeholder="1500"
                    value ={nationWide} onChange ={(e) => setNationWide(e.target.value)}
                    />
                </div>
                <div>
                        <p>{product.image?"Change image?": "Image of the product"}</p>
                        <FileBase64 type ="file" multiple={false}  
                        onDone = {({base64}) => setImage(base64)}
                        />
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
                    <div>
                        <label />
                         {/* <button className ="primary" type ="submit">Update</button> */}
                         <Button type="submit" sx={{mb:2}} variant="contained" color="success" size="large">
                        Update
                      </Button>
                    </div>
                    </>
                  }
                   
            </form>
        </div>
    )
}

export default UpdateProduct
