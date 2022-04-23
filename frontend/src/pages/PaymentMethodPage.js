import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/basketActions';
import CheckoutSteps from '../components/CheckoutSteps';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

function PaymentMethodPage(props) {
    //user should only see this screen if he has entered shipping info else be redirected to shipping
    const basket = useSelector((state) => state.basket);
    const { shippingAddress } = basket;

    if(!shippingAddress.address){
        props.history.push('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('Paystack');
    const [errorPaymentMethod, setErrorPaymentMethod ] = useState(false)
    const dispatch = useDispatch();

    //submitHandler function
    const submitHandler = (e) => {
        e.preventDefault();
        if (paymentMethod === "payU" || paymentMethod === "eNaira") {
            setErrorPaymentMethod(true);
            setPaymentMethod("Paystack")
            return
        } else {
            dispatch(savePaymentMethod(paymentMethod));
        }
        
        //redirect the user to finally place the order
        props.history.push('/placeorder');
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className ="register" onSubmit = {submitHandler}>
                <div>
                    <h3>Payment Method</h3>
                </div>
                
                    <div className='payment-method'>
                        <input type = "radio" id ="Paystack"
                        value ="Paystack" name ="paymentMethod"
                        required checked onChange ={(e) => setPaymentMethod(e.target.value)} />
                        <label htmlFor ="Paystack">Paystack</label>
                    </div>
                
                
                
                    <div className='payment-method'>
                        <input type = "radio" id ="payU" value = "payU" name ="paymentMethod"
                        required onChange = { (e) => setPaymentMethod(e.target.value) }>
                        </input>
                        <label htmlFor ="payU">payU</label>
                    </div>
                
                
                    <div className='payment-method'>
                        <input type = "radio" id ="eNaira" value = "eNaira" name ="paymentMethod"
                        required onChange = { (e) => setPaymentMethod(e.target.value) }>
                        </input>
                        <label htmlFor ="eNaira">eNaira</label>
                    </div>
                
                {
            errorPaymentMethod && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="error" onClose={() => setErrorPaymentMethod(false)}>Please, use Paystack. We are yet to integrate PayU and eNaira.</Alert>
      
            </Stack>
                }
                <div>
                    <button className = "primary" type="submit">Continue</button>
                </div>
            </form>
        </div>
    )
}

export default PaymentMethodPage
