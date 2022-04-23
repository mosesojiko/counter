// craete OrderHistoryScreen.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import axios from 'axios'
import Button from '@mui/material/Button'

function WithdrawHistory(props) {
    const [withdraws, setWithDraws] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            
            const { data } = await axios.get('/api/v1/withdraw/mywithdrawals', config);
            setWithDraws(data)
            setLoading(false)
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }
        fetchData()
    }, [userInfo])

//     const myWidthdraws = useSelector(state => state.myWidthdraws);
//     const { loading, error, widthdraws } = myWidthdraws
// console.log(widthdraws)
    // const dispatch = useDispatch();
    // useEffect(()=>{
    //     //call listOrderMine form orderActions
    //     dispatch(getWidthdrawals())

    // },[])
    return (
        <div style={{backgroundColor:"white"}}>
            <h3 style={{ textAlign: "center", marginBottom:"50px", paddingTop:"10px" }}> Withdrawal History</h3>
            {
                withdraws?.length === 0 ? (<p style={{ backgroundColor: "#f5f5f5", textAlign: "center", height: "50px", padding: "10px" }}>You have not made any withdrawal.</p>) : (<>
                    <div style={{textAlign:"center"}}>
                {
                loading && <LoadingBox></LoadingBox>
            }
                 { error && <MessageBox variant="danger">Failed to load withdrawals.</MessageBox>}
                
                    </div>
                    <div className='row center'>
                        {
                            withdraws?.map((width) => (
                        <div className='withdraw-history' key={width._id}>
                                    <p>Id: { width._id} <Button sx={{m:1}} variant="contained" size="small"
                          onClick={() => { props.history.push(`/product/${width.productId}`) }}>
                          View
                                    </Button></p>
                                    <p>Date: {width.requestedAt.substring(0, 10)}</p>
                                    <p>Amount: {width.amount.toFixed(2)}</p>
                                    <p>Paid Date: {width.isPaid ? width.isPaidAt.substring(0, 10) : "Pending"}</p>
                        </div>
                            ))
                        }
                    </div>
                     
                </>)
            }
             
                
            
        </div>
    )
}

export default WithdrawHistory
