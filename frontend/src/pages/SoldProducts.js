import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSoldProducts } from '../actions/productActions';
import { createWithdraw } from '../actions/withdrawActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { CREATE_WITHDRAW_RESET } from '../constants/withdrawConstants';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
//import axios from 'axios';
//import Stack from '@mui/material/Stack';
//import Alert from '@mui/material/Alert';
import './SoldProducts.css'

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

function SoldProducts(props) {

    const [ accountName, setAccountName ] = useState('')
    const [accountNumber, setAccountNumber ] = useState(0)
    const [ bank, setBank ] = useState('')
    const [ amount, setAmount ] = useState(0)
    const [ email, setEmail ] = useState('')
  const [phone, setPhone] = useState('')
  const [productId, setProductId] = useState('')
  const [amountToPay, setAmountToPay] = useState()
  const [serviceCharge, setServiceCharge] = useState()
console.log(productId)

   
  //get login user details from store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
 

  //get sold products from redux store
  const productSold = useSelector((state) => state.productSold);
  const { loading, error, soldProducts } = productSold
  console.log(soldProducts);

  //get widthdrawal from redux store
  const withdrawal = useSelector((state) => state.withdrawal);
  const { loading: loadDraw, error: errorDraw, success } = withdrawal

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

const dispatch = useDispatch();


useEffect(() =>{
    dispatch(getSoldProducts())
},[dispatch])

  const handleWithdraw = () => {
      dispatch(createWithdraw(accountName, accountNumber, bank, amount, email, phone, productId));
      dispatch({type: CREATE_WITHDRAW_RESET})
  }

  if (success) {
    setTimeout(() => {
      window.location='/soldproducts'
    },3000)
  }
  
    return (
      <div style={{maxWidth:"100%", backgroundColor:"white"}}>
        
        <div className='withdrawal-steps'>
          <h2 style={{textAlign:"center",padding:"10px"}}>Sold Items and Payout</h2>
          <div className='withdrawal-information'>
            <div className='withdrawal-information-one'>
              <p style={{maxWidth:"100%"}}>Here are your sold items and steps for withdrawal.</p>
            </div>
            <div className='withdrawal-information-two'>
              <h3>Withdrawal steps</h3>
              <ul >
                <li>Get your product delivered to your customer.</li>
                <li>Click on the payme button to payout the product</li>
              <li>Fill the widthdrawal form and submit.</li>
                <li>Get paid within 48 hours.</li>
            </ul>
            </div>
          </div>
          
              
            <h3 style={{ textAlign: "center" }}>Sold Items</h3>
          </div>
          
        <div>
          
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
                Withdrawal Form
              </Typography>
              <Box>
                You will recieve {amountToPay} - service {serviceCharge} = #{amountToPay-serviceCharge}
              </Box>
              <form>
                <Box sx={{mt: 3}}>
                  <label htmlFor='accountName'>Account Name</label>
                  <input style={{marginLeft:"3px"}} type="text" id="accountName" placeholder='Account Name' required
                    onChange ={(e) =>setAccountName(e.target.value)}
                  />
                </Box>
                <Box sx={{mt:2}}>
                  <label htmlFor='accountNumber'>Account Number</label>
                  <input style={{marginLeft:"3px"}} type="text" id="accountNumber" placeholder='Account Number' required
                    onChange ={(e) =>setAccountNumber(e.target.value)}
                  />
                </Box>
                <Box sx={{mt:2}}>
                  <label htmlFor='bank'>Bank</label>
                  <input style={{marginLeft:"3px"}} type="text" id="bank" placeholder='Bank Name' required
                    onChange ={(e) =>setBank(e.target.value)}
                  />
                </Box>
                {
                  loadDraw && <LoadingBox></LoadingBox>
                }
                {
                  errorDraw && <MessageBox variant="danger">Failed</MessageBox>
                }
                {
                  success && <MessageBox variant="success">successful</MessageBox>
                }
                <Button sx={{textAlign:"center",m:2}} onClick ={handleWithdraw} variant="contained" color="success">Submit</Button>
              </form>
          <Button sx={{textAlign:"center",m:2}} onClick ={handleClose} variant="contained" color="error">Close</Button>
        </Box>
      </Modal>
        </div>

        <div className='row center'>
          {
            soldProducts && soldProducts.length === 0 ? (<p style={{ backgroundColor: "#f5f5f5", textAlign: "center", height: "50px", padding: "20px" }}>There are no sold items at the moment.</p>)
              : ""
          }

          {
          loading && <LoadingBox></LoadingBox>
          }
          {
          error && <MessageBox variant="danger">Error</MessageBox>
          }
          
          {
            soldProducts?.map((product) => (
              <div className='withdraw-history' style={{padding:"1px"}} key={product._id}>
                <div>
                  <div>
                    <h4>Product Information</h4>
                    <p>Product Id: <strong>{product._id}</strong></p>
                    <p style={{display:"flex"}}><img
                        className="small"
                        src={product.image}
                        alt={product.name}
                /><Button sx={{m:1}} variant="contained" size="small"
                          onClick={() => { props.history.push(`/product/${product._id}`) }}>
                          View product
                      </Button></p>
                    <p>
                      <span style={{marginRight:"5px"}}>{product.name}</span>
                      <span>#{product.price}</span>
                      <span style={{marginLeft:"5px"}}>D-cost: #{ product.deliveryCost}</span>
                    </p>
                  </div>
                  <div>
                    <h4>Buyer Information</h4>
                    <p>Name: <b>{product.buyerName}</b>, Phone: <b>{product.buyerPhone}</b> </p>
                    <p>Address: { product.buyerAddress }</p>
                  </div>
                  <div>
                    <h4>Product Status</h4>
                    <p>Payment: {product.isPaid ? "Paid at" : "No"}  { product.isPaid
                              ? product.isPaidAt.substring(0, 10)
                      : ""}</p>
                    <p>Delivery: {product.isDelivererd ? "Delivered at" : "No"}  { product.isDelivererd
                              ? product.isDeliveredAt.substring(0, 10)
                      : ""} </p>
                    <p>Paid by Mosganda: {product.isSettled ? "Paid at" : "Pending"}  { product.isSettled
                              ? product.isSettledAt.substring(0, 10)
                        : ""} </p>
                  </div>
                  <div>
                    {
                !product.isSettled &&
                 <Button sx={{ m: 2 }} variant="contained" size="large" onClick={() => {
                setAmount(product.price)
                setAmountToPay(product.price + product.deliveryCost)
                setServiceCharge(product.service)
                  setProductId(product._id)
                  setEmail(userInfo.email)
                  setPhone(userInfo.phone)
                  handleOpen()
                }}>Pay Me</Button>
               }
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        
        {/* {
          soldProducts && soldProducts.length === 0 ? (<p style={{ backgroundColor: "#f5f5f5", textAlign: "center",height:"50px",padding:"20px" }}>There are no sold items at the moment.</p>) : (<>
            {
          loading && <LoadingBox></LoadingBox>
        }
        {
          error && <MessageBox variant="danger">Error</MessageBox>
        }
        {
          soldProducts?.map((product) => (
              <div key={product._id} className='soldProducts'>
                <div className='soldProduct-items'>
                  <h4>Product Information</h4>
                <p style={{display:"flex"}}><img
                        className="small"
                        src={product.image}
                        alt={product.name}
                /><Button sx={{m:1}} variant="contained" size="small"
                          onClick={() => { props.history.push(`/product/${product._id}`) }}>
                          View product
                </Button></p>
                <p>Product Id: <strong>{product._id}</strong></p>
                  <p>Product Name: <b>{product.name}</b>, Price: <b>{product.price}</b></p>
                  <p>Description: <b>{ product.description}</b></p>
                </div>
                <div className='soldProduct-items'>
                  <h4>Buyer Information</h4>
                <p>Buyer Name: <b>{product.buyerName}</b>, Buyer Phone: <b>{product.buyerPhone}</b>, Buyer Email: <b>{product.buyerEmail}</b></p>
                <p>Buyer Address: { product.buyerAddress}</p>
                </div>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Amount</th>
                      <th>Paid</th>
                      <th>Date</th>
                      <th>Delivered</th>
                    <th>Date</th>
                    <th>D-fee</th>
                      <th>Payout</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{product.price}</td>
                      <td>{product.isPaid ? "Paid" : "No"}</td>
                      <td>{product.isPaid
                              ? product.isPaidAt.substring(0, 10)
                        : "No"}</td>
                      <td>{product.isDelivered ? "Delivered" : "No"}</td>
                      <td>{product.isDelivered
                              ? product.isDeliveredAt.substring(0, 10)
                      : "No"}</td>
                    <td>{ product.deliveryCost}</td>
                      <td>{product.isSettled ? "Paid Out" : "No"}</td>
                      <td>{product.isSettledAt? product.isSettledAt.substring(0,10) : "No"}</td>
                      
                    </tr>
                  </tbody>
              </table>
              {
                product.isSettled? `Paid out by Mosganda`: <p>Total Amount payable: Price (#{product.price}) + delivery fee (#{product.deliveryCost}) = #{product.price + product.deliveryCost }</p>
              }
              {
                !product.isSettled &&
                 <Button sx={{ m: 2 }} variant="contained" size="large" onClick={() => {
                setAmount(product.price)
                setAmountToPay(product.price + product.deliveryCost)
                setServiceCharge(product.service)
                  setProductId(product._id)
                  setEmail(userInfo.email)
                  setPhone(userInfo.phone)
                  handleOpen()
                }}>Pay Me</Button>
               }
              </div>
            
          ))
        }
          </>)
        } */}
        
        
        
           {/* {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger"></MessageBox>
        ) : (
          <div className="row center">
            {soldProducts.map(
              (product) =>
                product?.buyerName && (
                  <div key={product._id} className="card">
                    <Link to={`/product/${product._id}`}>
                      
                      <img
                        className="medium"
                        src={product.image}
                        alt={product.name}
                      />
                    </Link>
                    <div className="card-body">
                      <Link to={`/product/${product._id}`}>
                        <h2>Product Name: {product.name}</h2>
                      </Link>
                      <div className="price">
                        Price: <strong>#{product.price}</strong>
                      </div>
                      <div>
                        <h3>Customer Information</h3>
                        <p>
                          Name: <strong>{product.buyerName}</strong>
                        </p>
                        <p>
                          Phone: <strong>{product.buyerPhone}</strong>
                        </p>
                        <p>
                          Address: <strong>{product.buyerAddress}</strong>
                        </p>
                        <p>
                          Payment Status:{" "}
                          <strong>
                            {product.isPaid ? "Paid" : "Not Yet Paid"}
                          </strong>
                        </p>
                        <p>
                          Payment Date:{" "}
                          <strong>
                            {product.isPaid
                              ? product.isPaidAt.substring(0, 10)
                              : "Not Yet Paid"}
                          </strong>
                        </p>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        )}    */}
      </div>
    );
}

export default SoldProducts
