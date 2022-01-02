// craete OrderHistoryScreen.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
//import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
    width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
    p: 4,
};

function OrderHistoryPage(props) {
    const [errorUpdate, setErrorUpdate] = useState(false)
    const [successUpdate, setSuccessUpdate] = useState(false)
    const [successProduct, setSuccessProduct] = useState(false)
    const [errorProduct, setErrorProduct] = useState(false)

    //for complain
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState('');
    const [orderId, setOrderId] = useState('');
    const [complain, setComplain] = useState('')
    const [complainLoading, setComplainLoading] = useState(false)
    const [complainError, setComplainError] = useState(false)
    const [complainSuccess, setComplainSuccess] = useState(false)


    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    
    const orderMineList = useSelector(state => state.orderMineList);
    const { loading, error, orders } = orderMineList

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();
    useEffect(() => {
        //call listOrderMine form orderActions
        dispatch(listOrderMine())

    }, [dispatch])
    console.log(orders)

    //set isDelivered to true
    const deliveredOrder = async (id) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

             await axios.put("/api/v1/order/delivered", { id }, config);
            setSuccessUpdate(true)
        } catch (error) {
            setErrorUpdate(true)
        }
    }

    setTimeout(() => {
        if (successUpdate) {
            window.location = '/orderhistory'
        }
    }, 3000)
    
    
    //delivered items
    const productDelivered = async (id) => {
        try {
             await axios.put("/api/v1/product/isdelivered", { id });
            setSuccessProduct(true)
        } catch (error) {
            console.log(error)
            setErrorProduct(true)
        }
    }

    //submit complain
    const submitComplain = async (e) => {
        e.preventDefault();
        try {
            setComplainLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
             await axios.post('/api/v1/reject', { name, email, phone, orderId, complain }, config)
            setComplainLoading(false)
            setComplainSuccess(true)
        } catch (error) {
            setComplainError(true)
            setComplainLoading(false)
        }
     }
    
    return (
        <div>
            {
                orders && orders.length === 0 ? (<div style={{ backgroundColor: "#f5f5f5", padding: "10px", marginBottom: "10px" }}>
                    <h1 style={{ textAlign: "center" }}> Order Items</h1>
                    <p>You have not placed any order. When you buy from someone, all your orders will be listed here.</p>
                </div>) : (<>
                        <div style={{backgroundColor:"#f5f5f5", padding:"10px", marginBottom:"10px"}}>
                <h1 style={{ textAlign: "center" }}> Order Items</h1>
                <h4>Important</h4>
                <p>Click on the <q>Details button</q> if you want to view your order.
                When you recieve your item(s), let Mosganda know by clicking the <q>Confirm Delivery</q> button.</p>
                <p>If you recieved a different thing from what you ordered and paid for, click on the <q>Customer Complain Form</q>, briefly describe your complain and Mosganda will pick it up.</p>
                <p>Want to chat with the seller, get the seller name from the order details. Go to <q>Chat</q> and search the name to start chatting.</p>
                <Button sx={{margin:2}} onClick={handleOpen} variant="contained" color="error" size="large">
                Customer Complain Form
            </Button>
            </div>
            
            <div style={{marginBottom:"10px"}}>
                
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
                <form onSubmit={submitComplain}>
          <Box sx={{textAlign:"center"}}>
            <h1>Complain Form</h1>
          </Box>
          
          <Box sx={{display:"flex", m:1, alignItems:"center"}}>
            <label htmlFor="name">Name</label>
            <input style={{marginLeft:"3px"}}
              type="text"
              id="name"
              placeholder="Enter your full name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box sx={{display:"flex", m:1, alignItems:"center"}}>
            <label htmlFor="email">Email</label>
            <input style={{marginLeft:"3px"}}
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
                            </Box>
            <Box>
             <label htmlFor="phone">Phone</label>
            <input style={{marginLeft:"3px"}}
              type="text"
              id="phone"
              placeholder="Your phone number"
              required
              onChange={(e) => setPhone(e.target.value)}
            />
             </Box>
                <Box sx={{display:"flex", m:1, alignItems:"center"}}>
            <label htmlFor="orderId">Order Id</label>
            <input style={{marginLeft:"3px"}}
              type="text"
              id="orderId"
              placeholder="The order id"
              required
              onChange={(e) => setOrderId(e.target.value)}
            />
          </Box>            

            <Box sx={{display:"flex", m:1, alignItems:"center"}}>
            <label htmlFor="complain">Complain</label>
            <input style={{marginLeft:"3px"}}
              type="text"
              id="complain"
              placeholder="Brief complain"
              required
              onChange={(e) => setComplain(e.target.value)}
            />
            </Box>
                            {
                                complainLoading && <LoadingBox></LoadingBox>
               } 
              {
            complainError && <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="error" onClose={() => setComplainError(false)}>Failed to send complain</Alert>
      
            </Stack>
                            }  
          {
            complainSuccess && <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="success" onClose={() => setComplainSuccess(false)}>Complain sent successfully.</Alert>
      
            </Stack>
          }                  
          <Button sx={{textAlign:"center",m:2}} type="submit" variant="contained" color="success">Submit</Button>
         </form>
         
                        <Button sx={{textAlign:"center",m:2}} onClick ={handleClose} variant="contained" color="error">Close</Button>
        </Box>
      </Modal>
            </div>
            {
                successProduct && <MessageBox variant="success">Product updated</MessageBox>
            }
            {
                errorProduct && <MessageBox variant="danger">Product not updated</MessageBox>
            }
            {
                errorUpdate && <MessageBox variant="danger">Failed to confirm delivery.</MessageBox>
            }
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
                                <td>
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
                                </td>
                            </tr>
                    
                
                            
                        </tbody>
                    </table >
                                            
                        
                    </div>
                    ))
            }
                </>)
            }
            
                
                        
        </div>
    )
}

export default OrderHistoryPage
