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


function CreateProductPage(props) {
    //name, price, category, image, countInStock, brand, rating, numReviews, description
  const [name, setName ] = useState('')
  const [ price, setPrice ] = useState(0);
  const [ category, setCategory ] = useState('')
  const [numberInStore, setNumberInStore] = useState(0)
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
  const [ storeCity, setStoreCity ] = useState('')
  const [ storeCountry, setStoreCountry ] = useState('')
 

    //const redirect = props.location.search? props.location.search.split('=')[1] : '/stores';

    //get access to userInfo
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
     console.log(userInfo)

     const userStoreDetails = useSelector(state => state.userStoreDetails);
    const { userStore } = userStoreDetails
    console.log(userStore)

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
    setStoreCountry(userStore && userStore.country);
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
console.log(productStoreId)
 
  const submitHandler = (e) =>{
    e.preventDefault();
    dispatch(createProduct(name, price, category, numberInStore, image, countInStock, brand, description, sellerName, sellerEmail, sellerId, sellerPhone, productStoreId, storeName, storeAddress, storeCity, storeCountry,{ ...userStore}));
  
  }
  if (success) {
    setTimeout(() => {
      window.location ="/userstore"
    },2000)
  }

    return (
        <div>
          <Link to ="/stores">Stores Page</Link>
          <Link to ="/">Product Page</Link>
         
          <form className = "form" onSubmit={submitHandler}>

           <div>
           {/*<pre>{JSON.stringify(imageUrl, null, '\t')}</pre> */}
           <h1>Create Product</h1>
           </div>
           {loading && <LoadingBox></LoadingBox>}
           { error && <MessageBox variant="danger">{error}</MessageBox> }
           { success && <MessageBox variant="success">Product created successfully.</MessageBox> }
            <div>
                <lable htmlFor="name">Product Name</lable>
                <input type ="text" id ="name" placeholder="Iphone 3"
                 onChange = {(e) =>setName( e.target.value)} >   
                </input>
           </div>
           <div>
                <lable htmlFor="price">Price</lable>
                <input type ="text" id ="price" placeholder="10000"
                 onChange = {(e) =>setPrice( e.target.value)} >   
                </input>
           </div>
           <div>
                <lable htmlFor="category">Product Category</lable>
                <input type ="text" id ="category" placeholder="Electronics"
                 onChange = {(e) =>setCategory( e.target.value)} >   
                </input>
           </div>
           <div>
                <lable htmlFor="numberInStore">Number in store</lable>
                <input type ="text" id ="numberInStore" placeholder="Unique code e.g 1234"
                 onChange = {(e) =>setNumberInStore( e.target.value)} >   
                </input>
           </div>
           <div>
                <lable htmlFor="countInStock">Count in stock</lable>
                <input type ="text" id ="countInStock" placeholder="How many in store? e.g 12"
                 onChange = {(e) =>setCountInStock( e.target.value)} >   
                </input>
           </div>
           <div>
                <lable htmlFor="brand">Brand</lable>
                <input type ="text" id ="brand" placeholder="Apple"
                 onChange = {(e) =>setBrand( e.target.value)} >   
                </input>
           </div>
                    <div>
                        <lable htmlFor="description">Description</lable>
                        <input type ="text" id ="description" placeholder="Enter store description"
                        onChange = {(e) =>setDescription( e.target.value)}
                        >
                        </input>
                    </div>
                    
                    <div>
                        
                        <FileBase64 type ="file" multiple={false}  
                        onDone = {({base64}) => setImage(base64)}
                        />
                    </div>
                    
            <div>
                        <label />
                        <button className ="primary" type ="submit">Create Product</button>
                    </div>
            </form>
      </div>  
    )
}

export default CreateProductPage
