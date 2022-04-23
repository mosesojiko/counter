import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import axios from 'axios'
import Button from '@mui/material/Button';

function OrderList(props) {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [orders, setOrders] = useState([])

    //get access to userLogin from redux store
  const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    
    if (!userInfo.isAdmin) {
        window.location="/"
    }
   
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true)
            const { data } = await axios.get('/api/v1/order/admin', {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
            setLoading(false)
            setOrders(data)
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }

        fetchOrders()
    },[userInfo.isAdmin])


    return (
        <div>
            <h3 style={{textAlign:"center"}}>List of orders</h3>
            {
                loading && <LoadingBox></LoadingBox>
            }
            {
                error && <MessageBox variant="danger">Error loading orders</MessageBox>
            }
            
            
                                   
            {
                orders?.map((order) => (
                    <div key={order._id} style={{border:"1px solid black", marginBottom:"2px",backgroundColor:"#f8f8f8"}}>
                        <h4 style={{marginBottom:"1px",marginLeft:"5px"}}>Order Id: {order._id}</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th>DETAILS</th>
                                    <th>RECIEVED</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                        
                                {/* get only the date part, and leave the time*/}
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice.toFixed(2)}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                                <td>{order.deliveredAt ? order.deliveredAt.substring(0, 10) : "No"}</td>
                                <td>
                                    <Button variant="contained" size="small"
                                        onClick={() => { props.history.push(`/order/${order._id}`) }}>
                                        Details
                                    </Button>
                                </td>
                                {/* <td>
                                        {
                                            order.isDelivered ?"Recieved":
                                                (<Button variant="contained" color="success" size="small"
                                        onClick={() => {
                                            deliveredOrder(order._id)
                                          order.orderItems.map((item) => productDelivered(item.product))
                                        }}>
                                        Confirm Delivered
                                    </Button>)
                                    }
                                </td> */}
                            </tr>
                    
                
                            
                        </tbody>
                    </table >
                                            
                        
                    </div>
                    ))
            }
        </div>
    )
}

export default OrderList
