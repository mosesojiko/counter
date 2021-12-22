import React, {useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderActions';

import CheckoutSteps from '../components/CheckoutSteps'
import { CREATE_ORDER_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { orderedProduct } from '../actions/productActions';
import { UPDATE_ORDERED_PRODUCT_RESET } from '../constants/productConstants';

function PlaceOrderPage(props) {
    const dispatch = useDispatch();
    const [buyerName, setBuyerName ] = useState('')
    const [buyerAddress, setBuyerAddress ] = useState('')
    const [buyerPhone, setBuyerPhone ] = useState('')
   

    //get cart from redux store
    const basket = useSelector((state) => state.basket)
    //check if user entered payment method, if not redirect the user to payment method
    if(!basket.paymentMethod) {
        props.history.push('/payment')
    }
    //get orderCreate from redux store
    const orderCreate = useSelector(state => state.orderCreate);
    const { loading, success, error, order } = orderCreate

    const productOrdered = useSelector(state => state.productOrdered)
    const {loading: loadingProduct, error: errorProduct, success: successProduct} = productOrdered
    //define a helper function for order summary
    const toPrice = (num) => Number(num.toFixed(2)); //e.g  5.123 => "5.12" => 5.12
    //using toPrice for cartItems
    basket.itemsPrice = toPrice(basket.basketItems.reduce((a, c) => a + c.qty * c.price, 0));
    //using toPrice for shippingAddress
    basket.shippingPrice = basket.itemsPrice > 100? toPrice(0): toPrice(10)
    //using it for tax
    //basket.taxPrice = toPrice(0.15 * basket.itemsPrice);
    //for total price
    
    //service charge
    const service = 0.02 * basket.itemsPrice
    basket.totalPrice = basket.itemsPrice + basket.shippingPrice + service // + basket.taxPrice
console.log(basket)
console.log(basket.basketItems)
console.log(buyerName)
useEffect(() =>{
    if(basket) {
        setBuyerName(basket.shippingAddress.fullName);
        setBuyerPhone(basket.shippingAddress.phone);
        setBuyerAddress(`${basket.shippingAddress.address},${basket.shippingAddress.city},${basket.shippingAddress.LGA},${basket.shippingAddress.state},${basket.shippingAddress.country}.`)
    }
},[basket])



//get sellerEmail id
// const sellerEmail = basket.basketItems.map((x) => {
//     return x.sellerEmail
// })[0]
// console.log(sellerEmail)

    //edit product 
    
   
    
    //function for placeOrderHandler

    const placeOrderHandler = () => {
        //here rename basket to orderItems bcos that is what we have in backend
        dispatch(createOrder({...basket, orderItems: basket.basketItems}));
        //update ordered product
        basket.basketItems.map((x) => {
            return dispatch(orderedProduct({id: x.product,buyerName,buyerPhone,buyerAddress }))
        });
    }

    useEffect(() =>{
        if(success && successProduct) {
            //redirect the user to order details screen
            props.history.push(`/order/${order._id}`);
            dispatch({
                type: CREATE_ORDER_RESET
            })
            dispatch({
                type: UPDATE_ORDERED_PRODUCT_RESET
            })
        }
    
    }, [dispatch, order, props.history, success, successProduct])
    
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
            <div className = "row top">
                <div className = "col-2">
                    <ul>
                        <li>
                            <div className ="card card-body">
                                <h2>Shipping/Buyer Information</h2>
                                <p> <strong>Name:</strong> { basket.shippingAddress.fullName }, <strong>Phone:</strong> { basket.shippingAddress.phone } <br />
                                <strong>Address:</strong> { basket.shippingAddress.address },
                                { basket.shippingAddress.city }, { basket.shippingAddress.LGA }, 
                                 { basket.shippingAddress.state }, { basket.shippingAddress.country }
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className ="card card-body">
                                <h2>Payment</h2>
                                <p> <strong>Method:</strong> { basket.paymentMethod } 
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className ="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                            {
                                basket.basketItems.map((item) =>(
                                    <li key = { item.product }>
                                        <div className ="row bottom">
                                            <div>
                                                <img src = { item.image } alt = { item.name } className="small"></img>
                                            </div>
                                            <div className ="min-30">
                                                <Link to = {`/product/${item.product}`}>{item.name}</Link>
                                                <h4>Store Information</h4>
                                                <p>Name: {item.storeName}, {item.storeId}</p>
                                                <p>Address: {item.storeAddress}, {item.storeCity}, {item.storeCountry}.</p>
                                                <h4>Store Owner</h4>
                                                <p>Name: {item.sellerName} Email: {item.sellerEmail} Phone: {item.sellerPhone}</p>
                                            </div>
                                            
                                            <div>

                                                {item.qty} x {item.price} = #{item.qty * item.price}
                                            </div>
                                            
                                        </div>
                                        
                                        
                                    </li>
                                ))
                            }
                        </ul>
                            </div>
                        </li>
                    </ul>

                </div>
                <div className = "col-1">
                    <div className ="card card-body">
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className = "row">
                                    <div>Items</div>
                                    <div>#{basket.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className = "row">
                                    <div>Service</div>
                                    <div>#{0.02 * basket.itemsPrice.toFixed(2)}</div>
                                    {/* <div>#{basket.shippingPrice.toFixed(2)}</div> */}
                                </div>
                            </li>
                            {
                                /*
                                <li>
                                <div className = "row">
                                    <div>Tax</div>
                                    <div>#{basket.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                                 */
                            }
                            <li>
                                <div className = "row">
                                    <div> <strong>Order Total</strong> </div>
                                    <div> <strong>#{basket.totalPrice.toFixed(2)}</strong> </div>
                                </div>
                            </li>
                            <li>
                                <button type ="button" onClick = {placeOrderHandler}
                                className ="primary block"
                                disabled = { basket.basketItems.length === 0 }
                                >Place Order</button> 
                            </li>
                            {
                                loading && <LoadingBox></LoadingBox>
                            }
                            {
                                error && <MessageBox variant ="danger">{error}</MessageBox>
                            }
                            {
                                loadingProduct && <LoadingBox></LoadingBox>
                            }
                            {
                                errorProduct && <MessageBox variant ="danger">{errorProduct}</MessageBox>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrderPage
