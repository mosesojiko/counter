// craete OrderHistoryScreen.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function OrderHistoryPage(props) {

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    console.log(userInfo);
    
    const orderMineList = useSelector(state => state.orderMineList);
    const { loading, error, orders } = orderMineList

    const dispatch = useDispatch();
    useEffect(()=>{
        //call listOrderMine form orderActions
        dispatch(listOrderMine())

    }, [dispatch])
    return (
        <div>
            <h1> Order History</h1>
            {
                loading? <LoadingBox></LoadingBox>:
                error? <MessageBox variant="danger">{error}</MessageBox>:
                (
                    <table className ="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((order) =>(
                                    <tr key = {order._id}>
                                        <td>{order._id}</td>
                                        {/* get only the date part, and leave the time*/}
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice.toFixed(2)}</td>
                                        <td>{order.isPaid? order.paidAt.substring(0, 10): "No"}</td>
                                        <td>{order.deliveredAt? order.deliveredAt.substring(0, 10): "No"}</td>
                                        <td>
                                            <button type ="button" className="small"
                                            onClick = {()=> {props.history.push(`/order/${order._id}`)}}>
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}

export default OrderHistoryPage
