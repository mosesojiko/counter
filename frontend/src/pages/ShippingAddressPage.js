import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/basketActions';
import CheckoutSteps from '../components/CheckoutSteps';

function ShippingAddressPage(props) {
    //Only login user should see this page
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    //get userInfo from basket
    const basket = useSelector((state) =>state.basket);
    const { shippingAddress } = basket;
    if(!userInfo) {
        props.history.push('/login')
    }

    //instaed of empty values, default values for these fields should come from the information in shippingAddress
    const [ fullName, setFullName ] = useState(shippingAddress.fullName);
    const [ address, setAddress ] = useState(shippingAddress.address);
    const [ city, setCity ] = useState(shippingAddress.city);
    const [ landmark, setLandmark ] = useState(shippingAddress.landmark);
    const [ state, setState ] = useState(shippingAddress.state);
    const [ country, setCountry ] = useState(shippingAddress.country);
    const [phone, setPhone] = useState(shippingAddress.phone);
    
    
    
    const dispatch = useDispatch();
    //function to handle submit
    const handleSummit = (e) => {
        e.preventDefault();
            
        dispatch(saveShippingAddress({fullName, address, city, landmark, state, country, phone}));

        //redirect the user to payment
        props.history.push('/payment');
    }
    return (
        <div style={{width:"100%"}}>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form style={{maxWidth:"100%"}} className = "register" onSubmit = { handleSummit }>
                <div className='register-item'>
                    <div>
                <h1>Shipping Address</h1>
            </div>
            <div className='shipping-container'>
                    <label htmlFor = "fullName">Fullname</label>
                    <input className='register-input' type="text" id="fullName" placeholder="Enter your fullname" 
                    value = {fullName} onChange = { (e) =>setFullName(e.target.value)} required></input>
                </div>
                <div className='shipping-container'>
                    <label htmlFor = "address">Address (point of collection)</label>
                    <input className='register-input' type="text" id="address" placeholder="Enter address" 
                    value = {address} onChange = { (e) =>setAddress(e.target.value)} required></input>
                </div>
                <div className='shipping-container'>
                    <label htmlFor = "city">City</label>
                    <input className='register-input' type="text" id="city" placeholder="Enter city" 
                    value = {city} onChange = { (e) =>setCity(e.target.value)} required></input>
                </div>
                <div className='shipping-container'>
                    <label htmlFor = "landmark">Nearest landmark</label>
                    <input className='register-input' type="text" id="landmark" placeholder="Agofure park" 
                    value = {landmark} onChange = { (e) =>setLandmark(e.target.value)} required></input>
                </div>
                <div className='shipping-container'>
                    <label htmlFor = "state">State</label>
                    <input className='register-input' type="text" id="state" placeholder="State of residence" 
                    value = {state} onChange = { (e) =>setState(e.target.value)} required></input>
                </div>
                <div className='shipping-container'>
                    <label htmlFor = "country">Country</label>
                    <input className='register-input' type="text" id="country" placeholder="Enter country" 
                    value = {country} onChange = { (e) =>setCountry(e.target.value)} required></input>
                </div>
                <div className='shipping-container'>
                    <label htmlFor = "phone">Phone</label>
                    <input className='register-input' type="text" id="phone" placeholder="Enter contact number" 
                    value = {phone} onChange = { (e) =>setPhone(e.target.value)} required></input>
                </div>
               
            <div>
                <label />
                <button type = "submit" className = "primary">Continue</button>
            </div>
            </div>
            </form>
            
        </div>
    )
}

export default ShippingAddressPage
