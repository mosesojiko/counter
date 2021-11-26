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
    const [ LGA, setLGA ] = useState(shippingAddress.LGA);
    const [ state, setState ] = useState(shippingAddress.state);
    const [ country, setCountry ] = useState(shippingAddress.country);
    const [ phone, setPhone ] = useState(shippingAddress.phone);

    const dispatch = useDispatch();
    //function to handle submit
    const handleSummit = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, address, city, LGA, state, country, phone}));

        //redirect the user to payment
        props.history.push('/payment');
    }
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className = "form" onSubmit = { handleSummit }>
            <div>
                <h1>Shipping Address</h1>
            </div>
            <div>
                    <label htmlFor = "fullName">Fullname</label>
                    <input type="text" id="fullName" placeholder="Enter your fullname" 
                    value = {fullName} onChange = { (e) =>setFullName(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor = "address">Address</label>
                    <input type="text" id="address" placeholder="Enter address" 
                    value = {address} onChange = { (e) =>setAddress(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor = "city">City</label>
                    <input type="text" id="city" placeholder="Enter city" 
                    value = {city} onChange = { (e) =>setCity(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor = "LGA">Local Govt. Area</label>
                    <input type="text" id="LGA" placeholder="Local govt of residence." 
                    value = {LGA} onChange = { (e) =>setLGA(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor = "state">State</label>
                    <input type="text" id="state" placeholder="State of residence" 
                    value = {state} onChange = { (e) =>setState(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor = "country">Country</label>
                    <input type="text" id="country" placeholder="Enter country" 
                    value = {country} onChange = { (e) =>setCountry(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor = "phone">Phone</label>
                    <input type="text" id="phone" placeholder="Enter contact number" 
                    value = {phone} onChange = { (e) =>setPhone(e.target.value)} required></input>
                </div>
               
            <div>
                <label />
                <button type = "submit" className = "primary">Continue</button>
            </div>
            </form>
            
        </div>
    )
}

export default ShippingAddressPage
