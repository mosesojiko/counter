import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderActions';

import CheckoutSteps from '../components/CheckoutSteps'
import { CREATE_ORDER_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function PlaceOrderPage(props) {
    //get cart from redux store
    const basket = useSelector((state) => state.basket)
    //check if user entered payment method, if not redirect the user to payment method
    if(!basket.paymentMethod) {
        props.history.push('/payment')
    }
    //get orderCreate from redux store
    const orderCreate = useSelector(state => state.orderCreate);
    const { loading, success, error, order } = orderCreate
    //define a helper function for order summary
    const toPrice = (num) => Number(num.toFixed(2)); //e.g  5.123 => "5.12" => 5.12
    //using toPrice for cartItems
    basket.itemsPrice = toPrice(basket.basketItems.reduce((a, c) => a + c.qty * c.price, 0));
    //using toPrice for shippingAddress
    basket.shippingPrice = basket.itemsPrice > 100? toPrice(0): toPrice(10)
    //using it for tax
    basket.taxPrice = toPrice(0.15 * basket.itemsPrice);
    //for total price
    basket.totalPrice = basket.itemsPrice + basket.shippingPrice + basket.taxPrice

    //function for placeOrderHandler
    const dispatch = useDispatch();
    const placeOrderHandler = () => {
        //here, rename cart to orderItems bcos that is what we have in the backent
        dispatch(createOrder({ ...basket, orderItems: basket.basketItems }))
    }

    useEffect(() =>{
        if(success) {
            //redirect the user to order details screen
            props.history.push(`/order/${order._id}`);
            dispatch({
                type: CREATE_ORDER_RESET
            })
        }

    }, [dispatch, order, props.history, success])
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
            <div className = "row top">
                <div className = "col-2">
                    <ul>
                        <li>
                            <div className ="card card-body">
                                <h2>Shipping</h2>
                                <p> <strong>Name:</strong> { basket.shippingAddress.fullName } <br />
                                <strong>Address:</strong> { basket.shippingAddress.address },
                                { basket.shippingAddress.city }, { basket.shippingAddress.postalCode },
                                { basket.shippingAddress.country }
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
                                        <div className ="row">
                                            <div>
                                                <img src = { item.image } alt = { item.name } className="small"></img>
                                            </div>
                                            <div className ="min-30">
                                                <Link to = {`/product/${item.product}`}>{item.name}</Link>
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
                                    <div>Shipping</div>
                                    <div>#{basket.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className = "row">
                                    <div>Tax</div>
                                    <div>#{basket.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
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
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrderPage
