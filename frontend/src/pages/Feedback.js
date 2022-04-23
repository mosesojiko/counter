import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './Feedback.css';
import LoadingBox from "../components/LoadingBox";
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

function Feedback() {

    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [loadingFeed, setLoadingFeed] = useState(false)
    const [errorFeed, setErrorFeed] = useState(false)
    const [successFeed, setSuccessFeed] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [feedback, setFeedback] = useState([])
    
    // const sendMessage = async (event) => {
    //     if (event.key === "Enter") {
    //         try {
    //         setLoadingFeed(true)
    //         await axios.post('/api/v1/feedback', { name, message });
    //         setName("")
    //         setMessage("")
    //         setLoadingFeed(false)
    //         setSuccessFeed(true)
    //     } catch (error) {
    //         setErrorFeed(true);
    //         setLoadingFeed(false)
    //     }
    //     }
    // }
    const submitHandler = async() => {
       
        try {
            setLoadingFeed(true)
            await axios.post('/api/v1/feedback', { name, message });
            setName("")
            setMessage("")
            setLoadingFeed(false)
            setSuccessFeed(true)
        } catch (error) {
            setErrorFeed(true);
            setLoadingFeed(false)
        }
    }
    //fetch feedbacks
    useEffect(() => {
        const fetchFeed = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get('/api/v1/feedback');
                setLoading(false)
                setFeedback(data)
            } catch (error) {
                setError(true)
                setLoading(false)
                return
            }
        }
        fetchFeed()
    },[successFeed])
    return (
        <div style={{backgroundColor:"#f5f5f5", width:"100%"}}>
            
            <form className="register" onSubmit={submitHandler}>
          
            <h3 style={{margin:"10px", textAlign:"center"}}>Feedback Form</h3>
          

          <div className='reister-item-option'>
            <lable htmlFor="name">Name (optional)</lable>
            <input
              className="register-input"
              type="text"
              id="name"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
                
                <div>
            <lable htmlFor="message">Message</lable>      
              <input
                className="register-input"
              type="text"
              id="message"
              placeholder="Enter feedback/comment" required
              onChange={(e) => setMessage(e.target.value)}
                        />
          </div>
          <button type="submit" class="register-button">Submit</button>
          {
                    loadingFeed && <LoadingBox></LoadingBox>
                }
                {
            errorFeed && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="error" onClose={() => setErrorFeed(false)}>Error sending feedback.</Alert>
      
            </Stack>
                }
                {
            successFeed && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="success" onClose={() => setSuccessFeed(false)}>Your feedback has been sent.</Alert>
      
            </Stack>
          }
        </form>
        




        <div className='feedback-result'>
          
          <div className='feedback-content'>
            <h3>Your feedback below</h3>
            {
                loading && <LoadingBox></LoadingBox>
            }
            {
            error && <Stack sx={{ width: '50%',textAlign:"center" }} spacing={2}>
              <Alert severity="error" onClose={() => setError(false)}>Error loading feedback.</Alert>
      
            </Stack>
                }
            {feedback?.map((feed) => (
                <div key={feed._id} className="feedback-content-item">
                    <p className='feedback-content-item-name'><strong>{feed.name? feed.name:"User"}:</strong></p>
                        <p className='feedback-content-item-message'> {feed.message}</p>
                        </div>
              
          ))}
          </div>
          
          
        </div>
            
            
           
            
                

            </div>
                
    )
}

export default Feedback
