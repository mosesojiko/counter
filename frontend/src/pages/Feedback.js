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
        <div style={{backgroundColor:"#f5f5f5"}}>
            
            <form className="form feedback-form" onSubmit={submitHandler}>
          <div>
            <h1 style={{margin:"0"}}>Feedback Form</h1>
          </div>

          <div>
            <lable htmlFor="name">Name (optional)</lable>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
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
                <div style={{ width: "100%" }}>
            <lable htmlFor="message">Message</lable>
                    <div className='feedback'>
                        <input
              type="text"
              id="message"
              placeholder="Enter feedback/comment" required
              onChange={(e) => setMessage(e.target.value)}
                        />
                        <button type="submit">
              Submit
            </button>
            </div>
          </div>
            </form>
            {
                loading && <LoadingBox></LoadingBox>
            }
            {
            error && <Stack sx={{ width: '50%',textAlign:"center" }} spacing={2}>
              <Alert severity="error" onClose={() => setError(false)}>Error loading feedback.</Alert>
      
            </Stack>
                }
            
            <h2 style={{ textAlign: "center", borderBottom:"1px solid gray" }}>Your Feedback(s) Below:</h2>
            
                {feedback?.map((feed) => (
                <div key={feed._id} className="feedback-content">
                    <p><strong>{feed.name? feed.name:"User"}:</strong></p>
                        <p style={{maxWidth:"300px"}}>{feed.message}</p>
                        </div>
              
            ))}

            </div>
                
    )
}

export default Feedback
