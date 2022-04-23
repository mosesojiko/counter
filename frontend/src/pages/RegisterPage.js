import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
//import { GoogleLogin } from 'react-google-login';



function RegisterPage(props) {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [show, setShow] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)
  

    const redirect = props.location.search? props.location.search.split('=')[1] : '/';

    //get access to userRegister from redux store
    const userRegister = useSelector((state) => state.userRegister)
    const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  //view password in input field
  const handlePassword = () => setShow(!show);

    //function to submit the form
    const handleSummit = (e) => {
        e.preventDefault();
        if(!password) {
          alert("Password cannot be empty.")
          return
        } else if (name === "Mosganda" || name === "mosganda" || name === "MOSGANDA") {
          alert("You cannot register with the company's name")
          return
        } 
        else {
          dispatch(register(name, email, password));
          setName("");
          setEmail("");
          setPassword("");
        }
        
  }
  
  
    //keep track of changes to userInfo
    useEffect(() => {
      if (userInfo) {
            props.history.push("/register");
      }
       if(userInfo && !error) {
         setSuccessMessage(true)
       }
    }, [props.history, redirect, userInfo])
  
  
  
    return (
      <div>
        <form onSubmit={handleSummit}>
          <div className='register'>
            <h1 style={{textAlign:"center"}}>Register</h1>
            <p>Please fill in this form to create an account.</p>
            
            <div className='register-items'>
              <div className='reister-item-option'>
                <label htmlFor='name'>Name</label>
                <input className='register-input' type="text" placeholder='Fullname' id="name" required
                  onChange={(e) => setName(e.target.value)}
                  value ={name}
                />
              </div>

              <div className='reister-item-option'>
              <label htmlFor='email'>Email</label>
                <input className="register-input" type="text" id="email" placeholder='Enter email' required
                  onChange={(e) => setEmail(e.target.value)}
                  value = {email}
                />
              </div>
              
            <div className='reister-item-option'>
              <label htmlFor='password'>Password</label>
                <div className='register-password-container'>
                  <input className="register-input-password" placeholder="Enter Password" id="password" required
                    type={show ? "test" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    value = {password}
                  />
                  <button type="button" className='password-view-button' onClick={handlePassword}>
                {show? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </button>
            </div>
              </div>
              
            </div>
            <p>By creating an account you agree to our <Link to="/termsandconditions">Terms and Privacy</Link>.</p>
            <button type="submit" class="register-button">Register</button>
            <div class="signin">
            <p>Already have an account? <Link to="/login">Login</Link>.</p>
            </div>
            {
              successMessage && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="success" onClose={() => setSuccessMessage(false)}>Successful. A verification link has been sent to your email.</Alert>
      
            </Stack>
            }
            {
              loading && <LoadingBox></LoadingBox>
            }
            {
              error && <MessageBox className="danger">Failed to register.</MessageBox>
            }

          </div>
          
        </form>

      </div>
    );
}

export default RegisterPage
