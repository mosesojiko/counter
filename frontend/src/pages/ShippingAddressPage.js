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
    const [address, setAddress ] = useState(shippingAddress.address);
    const [city, setCity ] = useState(shippingAddress.city);
    const [postalCode, setPostalCode ] = useState(shippingAddress.postalCode);
    const [country, setCountry ] = useState(shippingAddress.country);

    const dispatch = useDispatch();
    //function to handle submit
    const handleSummit = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, address, city, postalCode, country}));

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
                <label htmlFor="fullName">Fullname</label>
                <input type ="text" id ="fullName" placeholder="Your fullname" required
                onChange = {(e) => setFullName(e.target.value)}>
                </input>
            </div>
            <div>
                <label htmlFor="address">Address</label>
                <input type ="text" id ="address" placeholder="Your address" required
                onChange = {(e) => setAddress(e.target.value)}>
                </input>
            </div>
            <div>
                <label htmlFor="city">City/Town</label>
                <input type ="text" id ="city" placeholder="Your city" required
                onChange = {(e) => setCity(e.target.value)}>
                </input>
            </div>
            <div>
                <label htmlFor="postalCode">Postal code</label>
                <input type ="text" id ="postalCode" placeholder="Postal code"
                onChange = {(e) => setPostalCode(e.target.value)}>
                </input>
            </div>
            <div>
                <label htmlFor="country">Country</label>
                <input type ="text" id ="country" placeholder="Country"
                onChange = {(e) => setCountry(e.target.value)}>
                </input>
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
