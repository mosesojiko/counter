import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { PaystackButton } from 'react-paystack'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { detailsOrder, payOrder } from '../actions/orderActions';
import { paidProduct } from '../actions/productActions';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_PAY_RESET } from '../constants/orderConstants';



function OrderPage(props) {
    const orderId = props.match.params.id;
    //const publicKey = "pk_test_863b631d2a66390b101d9b0be373f958bad8ac59"
    //const amount = 1000000 // Remember, set in kobo!
    const [publicKey, setPublicKey]=useState("")
    const [email, setEmail ] = useState("")
    const [name, setName ] = useState("")
    const [phone, setPhone ] = useState("")
    const [ amount, setAmount ] = useState(0)
    

    //get login user details from store
//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;
//   console.log(userInfo);

     //get order details from redux store
    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;

    //get the orderPay from redux store
    const orderPay = useSelector(state => state.orderPay);
    //in other to use error, and success in orderPay, we rename it
    const { loading: loadingPay, error: errorPay, success: successPay } = orderPay

    //get productPaid from redux store
    const productPaid = useSelector((state) => state.productPaid);
    const {loading: loadingPaid, error: errorPaid } = productPaid

    const dispatch = useDispatch();

    useEffect(() =>{
        const getPaystackKey = async () => {
            const { data } = await Axios.get('/api/v1/config/paystack');
            setPublicKey(data)
            
        }
        
        getPaystackKey()
        
    },[])
   

    useEffect(()=>{
        if(!order || successPay || (order && order._id !== orderId)) {
            dispatch({
                type: ORDER_PAY_RESET
            })
            dispatch(detailsOrder(orderId)); //load the order
        }
        
    },[dispatch, order, orderId, successPay])

    useEffect(() =>{
        if(order) {
            setAmount((order.totalPrice * 100).toFixed(2))
            setEmail(email)
            setPhone(phone)
            setName(name)
        }
       
    },[email, name, order, phone])
    
    

    const componentProps = {
        email,
        amount,
        metadata: {
          name,
          phone,
        },
        publicKey,
        text: "Pay Now (Paystack)",
        onSuccess: () =>
        alert("Thanks for doing business with us. Payment receipt has been sent to your email."),
        onClose: () => alert("Wait! You've not completed your payment."),
      }
      
      //get sellerEmail id
    //  const sellerEmail = order && order.orderItems.map((x) => {
    //       return x.sellerEmail
    //   })[0]
     

      const paymentResult = {id: orderId, name: name, email: email, phone: phone, amount:amount/100}
      const successHandler = () => {
          dispatch(payOrder(order, paymentResult));

          //update paid products
        order.orderItems.map((x) => {
            return dispatch(paidProduct({id: x.product }))
        });
      }

    return loading? (<LoadingBox></LoadingBox>):
    error? (<MessageBox variant="danger">{error}</MessageBox>):
    (
        <div>
            <h1>Order {order._id} </h1>
            <div className = "row top">
                <div className = "col-2">
                    <ul>
                        <li>
                            <div className ="card card-body">
                                <h2>Shipping/Buyer Information</h2>
                                <p> <strong>Name:</strong> { order.shippingAddress.fullName }, <strong>Phone:</strong> { order.shippingAddress.phone } <br />
                                <strong>Address:</strong> { order.shippingAddress.address },
                                { order.shippingAddress.city }, { order.shippingAddress.LGA }, 
                                 { order.shippingAddress.state }, { order.shippingAddress.country }
                                </p>

                                {
                                    order.isPaid && 
                                    <>
                                    <p>Paid By: <strong>{order.paymentResult.name}</strong>, Email: <strong>{order.paymentResult.email}</strong>, Phone: <strong>{order.paymentResult.phone}</strong></p>
                                    </>

                                }

                                { order.isDelivered?
                                 (<MessageBox variant ="success">Delivered at {order.deliveredAt}</MessageBox>):
                                 (<MessageBox variant="danger">Not Delivered</MessageBox>)
                                 }
                            </div>
                        </li>
                        <li>
                            <div className ="card card-body">
                                <h2>Payment</h2>
                                <p> <strong>Method:</strong> { order.paymentMethod } 
                                </p>

                                { order.isPaid?
                                 (<MessageBox variant ="success">Paid at {order.paidAt}</MessageBox>):
                                 (<MessageBox variant="danger">Not Paid</MessageBox>)
                                 }
                            </div>
                        </li>
                        <li>
                            <div className ="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                            {
                                order.orderItems.map((item) =>(
                                    <li key = { item.product }>
                                        <div className ="row bottom">
                                            <div>
                                                <img src = { item.image } alt = { item.name } className="small"></img>
                                            </div>
                                            <div className ="min-30">
                                                <Link to = {`/product/${item.product}`}>{item.name}</Link>
                                                <h4>Store Information</h4>
                                                <p>Name: <strong>{item.storeName}</strong>, {item.storeId}</p>
                                                <p>Address: <strong>{item.storeAddress}, {item.storeCity}, {item.storeCountry}.</strong></p>
                                                <h4>Store Owner</h4>
                                                <p>Name: <strong>{item.sellerName}</strong> Email: <strong>{item.sellerEmail}</strong> Phone: <strong>{item.sellerPhone}</strong></p>
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
                                    <div>#{order.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className = "row">
                                    <div>Shipping fee</div>
                                    <div>#{order.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            
                            <li>
                                <div className = "row">
                                    <div> <strong>Order Total</strong> </div>
                                    <div> <strong>#{order.totalPrice.toFixed(2)}</strong> </div>
                                </div>
                            </li>
                            {
                                !order.isPaid &&
                            (<li>
                                <div className="form"> 
                                    
                                <div>
                                <h4>Receipt Form</h4>
                                  <label htmlFor="name">Name</label>
                                  <input
                              type="text"
                              id="name" required
                              onChange={(e) => setName(e.target.value)}
                            />
                                </div>
                                
                                <div>
                                  <label htmlFor="email">Email</label>
                                  <input
                              type="text"
                              id="email" required
                              onChange={(e) => setEmail(e.target.value)}
                            />
                                </div>
                                <div>
                                  <label htmlFor="phone">Phone</label>
                                  <input
                              type="text"
                              id="phone" required
                              onChange={(e) => setPhone(e.target.value)}
                            />
                                </div>
                                <>
                                {
                                    errorPay && (<MessageBox variant="danger">{errorPay}</MessageBox>)
                                }
                                {
                                    loadingPay && <LoadingBox></LoadingBox>
                                }
                                {
                                    successPay && (<MessageBox variant="success">Order Paid Successfully.</MessageBox>)
                                }
                                <PaystackButton className="primary" {...componentProps} onSuccess={successHandler} />
                                </>
                           </div>
                               {
                                    errorPaid && (<MessageBox variant="danger">{errorPaid}</MessageBox>)
                                }
                                {
                                    loadingPaid && <LoadingBox></LoadingBox>
                                }
                           </li>)
                             }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderPage
