import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/basketActions';
import CheckoutSteps from '../components/CheckoutSteps';

function PaymentMethodPage(props) {
    //user should only see this screen if he has entered shipping info else be redirected to shipping
    const basket = useSelector((state) => state.basket);
    const { shippingAddress } = basket;

    if(!shippingAddress.address){
        props.history.push('/shipping');
    }

    const [paymentMethod, setPaymentMethod ] = useState('PayPal');
    const dispatch = useDispatch();

    //submitHandler function
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        console.log(paymentMethod);
        //redirect the user to finally place the order
        props.history.push('/placeorder');
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className ="form" onSubmit = {submitHandler}>
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                    <div>
                        <input type = "radio" id ="PayPal"
                        value ="PayPal" name ="paymentMethod"
                        required checked onChange ={(e) => setPaymentMethod(e.target.value)} />
                        <label htmlFor ="PayPal">PayPal</label>
                    </div>
                </div>
                
                <div>
                    <div>
                        <input type = "radio" id ="stripe" value = "Stripe" name ="paymentMethod"
                        required onChange = { (e) => setPaymentMethod(e.target.value) }>
                        </input>
                        <label htmlFor ="stripe">Stripe</label>
                    </div>
                </div>
                <div>
                    <button className = "primary" type="submit">Continue</button>
                </div>
            </form>
        </div>
    )
}

export default PaymentMethodPage
