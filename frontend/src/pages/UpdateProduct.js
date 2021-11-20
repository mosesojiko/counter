import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import FileBase64 from 'react-file-base64';
import {useDispatch, useSelector } from 'react-redux';
import { findProductForUpdate, updateUserProduct } from '../actions/productActions';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { GET_PRODUCT_FOR_UPDATE_RESET, UPDATE_PRODUCT_RESET } from '../constants/productConstants';


function UpdateProduct(props) {
    //const { name, price, category, numberInStore, image, countInStock, brand, description, sellerName, sellerEmail, sellerId, sellerPhone, productStore } =
    const id = props.match.params.id;

    const [ name, setName ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ numberInStore, setNumberInStore ] = useState('');
    const [ image, setImage ] = useState('');
    const [ countInStock, setCountInStock ] = useState('');
    const [ brand, setBrand ] = useState('');
    const [ description, setDescription ] = useState('');

    //get access to logged in user
    const userLogin = useSelector(state =>state.userLogin);
    const { userInfo } = userLogin;
    console.log(userInfo)

    //get details of a loggged in user
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;
    console.log(user)

    //get access to the product for update
    const productForUpdate = useSelector((state) => state.productForUpdate);
    const {loading: loadingProduct, error:errorProduct, product } = productForUpdate
    console.log(product)

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
            setNumberInStore(product.numberInStore)
            setImage(product.image)
            setCountInStock(product.countInStock)
            setBrand(product.brand)
            setDescription(product.description)
        }
    },[product])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUserProduct({
            id, name, price, category, numberInStore, image, countInStock, brand, description
        }))
       
    }
    return (
        <div>
            <form className = "form" onSubmit = {submitHandler} >
                <div>
                    <h1>Edit Product</h1>
                </div>
                {
                    loading? <LoadingBox></LoadingBox>:
                    error? <MessageBox variant="danger">{error}</MessageBox>:
                    <>
                    {
                        loadingProduct && <LoadingBox></LoadingBox>
                    }
                    {
                        errorProduct && <MessageBox variant="danger">{errorProduct}</MessageBox>
                    }
                    {
                        loadingUpdate && <LoadingBox></LoadingBox>
                    }
                    {
                        errorUpdate && <MessageBox variant ="danger">{errorUpdate}</MessageBox>
                    }
                    {
                        success && <MessageBox variant ="success">Product Updated Successfully.</MessageBox>
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
                    <label htmlFor="category">Category</label>
                    <input type="text" id="category" placeholder="Electronics"
                    value ={category} onChange ={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="numberInStore">Number in store</label>
                    <input type="text" id="numberInStore" placeholder="5252"
                    value ={numberInStore} onChange ={(e) => setNumberInStore(e.target.value)}
                    />
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
                        <p>Image of the product</p>
                        <FileBase64 type ="file" multiple={false}  
                        onDone = {({base64}) => setImage(base64)}
                        />
                    </div>
                    <div>
                        <label />
                        <button className ="primary" type ="submit">Update</button>
                    </div>
                    </>
                  }
                   
            </form>
        </div>
    )
}

export default UpdateProduct
