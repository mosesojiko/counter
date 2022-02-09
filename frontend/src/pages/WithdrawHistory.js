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
        <div style={{backgroundColor:"#f5f5f5"}}>
            <h1 style={{ textAlign: "center" }}> Widthdrawal History</h1>
            {
                withdraws && withdraws.length === 0 ? (<p style={{ backgroundColor: "#f5f5f5", textAlign: "center", height: "50px", padding: "20px" }}>You have not made any widthdrawal.</p>) : (<>
                    <div style={{textAlign:"center"}}>
                {
                loading && <LoadingBox></LoadingBox>
            }
                 { error && <MessageBox variant="danger">Failed to load withdrawals.</MessageBox>}
                
            </div>
                    <table className ="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>AMOUNT</th>
                                <th>PAID</th>
                                <th>Item</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                withdraws?.map((width) =>(
                                    <tr key = {width._id}>
                                        <td>{width._id}</td>
                                        {/* get only the date part, and leave the time*/}
                                        <td>{width.requestedAt.substring(0, 10)}</td>
                                        <td>{width.amount.toFixed(2)}</td>
                                        <td>{width.isPaid ? width.isPaidAt.substring(0, 10) : "Pending"}</td>
                                        <td><Button sx={{m:1}} variant="contained" size="small"
                          onClick={() => { props.history.push(`/product/${width.productId}`) }}>
                          View
                </Button></td>
                                        
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </>)
            }
            
                
            
        </div>
    )
}

export default WithdrawHistory
