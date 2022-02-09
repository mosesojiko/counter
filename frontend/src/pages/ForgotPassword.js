import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    // const [success, setSuccess] = useState(false)
    // const [successStatement, setSuccessStatement] = useState(false)
    const [result, setResult] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const { data} = await axios.post('/api/v1/user/forgotpassword', { email })
            setLoading(false)
            setResult(data)
            setEmail('')
        } catch (error) {
            setError(true);
            setLoading(false)
        }
    }

console.log(result)
    return (
        <div style={{backgroundColor:"#f5f5f5", textAlign: "center", maxWidth:"100%", padding:"20px"}}>
            <h1>Forgot Password</h1>
            <p>Kindly enter your email in the form below. A link will be sent to your email address.</p>
            <div>
                <form onSubmit={handleSubmit}>
                    {loading && <LoadingBox></LoadingBox>}
                    {
              result && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="success" onClose={() => setResult("")}>Successful. A password reset link has been sent to your email.</Alert>
      
            </Stack>
                    }
                    {
              error && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="error" onClose={() => setError(false)}>Failed to sent password reset link.</Alert>
      
            </Stack>
              }
                    <label htmlFor='email'><strong>Email:</strong></label>
                    <input type="text" id="email" placeholder='Enter your email' required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit" style={{backgroundColor:"brown", color:"white"}}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
