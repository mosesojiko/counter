import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import axios from 'axios'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function WithdrawList(props) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [withdraws, setWithdraws] = useState([])
    const [successPay, setSuccessPay] = useState(false)
    const [errorPay, setErrorPay] = useState(false)
    const [loadingPay, setLoadingPay] = useState(false)
    const [successProduct, setSuccessProduct] = useState(false)
    const [errorProduct, setErrorProduct] = useState(false)
    const [loadingProduct, setLoadingProduct] = useState(false)


    //get access to userLogin from redux store
  const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    
    if (!userInfo.isAdmin) {
        window.location="/"
    }
   
    useEffect(() => {
        const fetchWithdraws = async () => {
            try {
                setLoading(true)
            const { data } = await axios.get('/api/v1/widthdraw/admin', {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
            setLoading(false)
            setWithdraws(data)
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }

        fetchWithdraws()
    },[userInfo.isAdmin])

    console.log(withdraws)
    //handle settlement
    const handlePayment = async(id) => {
        try {
            setLoadingPay(true)
             await axios.put("/api/v1/widthdraw/ispaid", { id });
            setSuccessPay(true)
            setLoadingPay(false)
        } catch (error) {
            console.log(error)
            setErrorPay(true)
            setLoadingPay(false)
        }
    }
    
    //handle settlement
    const handleSettled = async(id) => {
        try {
            setLoadingProduct(true)
             await axios.put("/api/v1/product/issettled", { id });
            setSuccessProduct(true)
            setLoadingProduct(false)
        } catch (error) {
            console.log(error)
            setErrorProduct(true)
            setLoadingProduct(false)
        }
    }

    

    return (
        <div style={{backgroundColor:"#f5f5f5"}}>
            <h1 style={{ textAlign: "center" }}> List Of Withdraw request</h1>
            {
                withdraws && withdraws.length === 0 ? (<p style={{ backgroundColor: "#f5f5f5", textAlign: "center", height: "50px", padding: "20px" }}>No seller has made request for widthdrawal.</p>) : (<>
                    <div style={{textAlign:"center"}}>
                {
                loading && <LoadingBox></LoadingBox>
            }
                        {error && <MessageBox variant="danger">Failed to load withdrawals.</MessageBox>}
                        {
                loadingPay && <LoadingBox></LoadingBox>
                        }
                        
                        
                        {
            successPay && <Stack sx={{ width: '90%' }} spacing={2}>
               <Alert severity="success" onClose={() => setSuccessPay(false)}>Your product has been updated.</Alert>
      
             </Stack>
                        }
                        
                        
                        {
            errorPay && <Stack sx={{ width: '90%' }} spacing={2}>
               <Alert severity="error" onClose={() => setErrorPay(false)}>Failed to update withdraw</Alert>
      
             </Stack>
                        }
                       
                        {
                loadingProduct && <LoadingBox></LoadingBox>
                        }
                        {
            successProduct && <Stack sx={{ width: '90%' }} spacing={2}>
               <Alert severity="success" onClose={() => setSuccessProduct(false)}>Your product has been updated.</Alert>
      
             </Stack>
                        }
                        {
            errorProduct && <Stack sx={{ width: '90%' }} spacing={2}>
               <Alert severity="error" onClose={() => setErrorProduct(false)}>Failed to update</Alert>
      
             </Stack>
                        }
                        
                
            </div>
                    
                            {
                        withdraws?.map((width) => (
                            <div key={width._id} style={{border:"1px solid green", marginBottom:"2px"}} >
                                <p style={{padding:"1px",margin:"0"}}>Withdraw Id: { width._id}</p>
                                <table className ="table">
                        <thead>
                            <tr>
                                <th>DATE</th>
                                <th>AMOUNT</th>
                                <th>PAID</th>
                                <th>Product</th>
                                <th>Settled?</th>
                            </tr>
                        </thead>
                        <tbody>
                                    <tr>
                                        {/* get only the date part, and leave the time*/}
                                        <td>{width.requestedAt.substring(0, 10)}</td>
                                        <td>{width.amount.toFixed(2)}</td>
                                        <td>{width.isPaid? width.isPaidAt.substring(0, 10): "Pending"}</td>                             
                                        <td>
                                            <Button sx={{m:1}} variant="contained" size="small"
                          onClick={() => { props.history.push(`/product/${width.productId}`) }}>
                          View
                </Button>
                                            </td>
                                            <td>
                                                {
                                                    width.isPaid? "Settled" : <Button sx={{ m: 1 }} variant="contained" size="small" color="secondary" onClick={() => {
                                                handlePayment(width._id)
                                                handleSettled(width.productId)
                                            }}>
                          Pay
                </Button>
                                                }
                                            </td>
                                            
                                    </tr>
                                    </tbody>
                    </table>
                                    </div>
                                ))
                            }
                        
                </>)
            }
            
        </div>
    )
}

export default WithdrawList
