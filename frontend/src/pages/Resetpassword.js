import React, { useState } from 'react'
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import LoadingBox from '../components/LoadingBox';

function Resetpassword(props) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [show, setShow] = useState()
    const [showConfirm, setShowConfirm] = useState()

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

  const id = props.match.params.id

    
    const handleSubmit = async(e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Password and confirm password are not the same.")
          return
        } else {
            try {
                setLoading(true)
              await axios.put(`/api/v1/user/resetpassword/${id}`, { password });
                setLoading(false);
                setPassword("")
                setConfirmPassword('')
                setSuccess(true)
            } catch (error) {
                setError(true);
                setLoading(false)
            }
        }
    }
    return (
        <div style={{backgroundColor:'#f5f5f5', maxWidth:"100%", textAlign:"center"}}>
            <h1>Reset Password</h1>
            <div className='login'>
                <form className='form' onSubmit={handleSubmit}>
                   
                    <div>
            <label htmlFor="password">Password</label>
            <div className="register-password">
              <input
                type={show ? "test" : "password"}
                id="password"
                placeholder="New password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={() => setShow(!show)}>
                {show ? (
                  <i class="fa fa-eye-slash" aria-hidden="true"></i>
                ) : (
                  <i class="fa fa-eye"></i>
                )}
              </button>
            </div>
                    </div>
                    <div>
            <label htmlFor="confirmpassword">Confirm Password</label>
            <div className="register-password">
              <input
                type={showConfirm ? "test" : "password"}
                id="confirmpassword"
                placeholder="Confirm new password"
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? (
                  <i class="fa fa-eye-slash" aria-hidden="true"></i>
                ) : (
                  <i class="fa fa-eye"></i>
                )}
              </button>
            </div>
                    </div>
                    
          <div>
            <label />
            <button type="submit" className="primary">
              Reset
            </button>
          </div>
                </form>
                {
                loading && <LoadingBox></LoadingBox>
            }
            {
              success && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="success" onClose={() => setSuccess(false)}>Password reset successful.</Alert>
      
            </Stack>
            }
            {
              error && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="error" onClose={() => setError(false)}>Failed to reset password. Try again later.</Alert>
      
            </Stack>
                    }
            </div>
            

        </div>
    )
}

export default Resetpassword
