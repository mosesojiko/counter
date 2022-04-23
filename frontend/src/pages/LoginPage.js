import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

function LoginPage(props) {
    const [ email, setEmail ] = useState('');
    const [password, setPassword] = useState('');
  const [show, setShow] = useState()
  


    const redirect = props.location.search? props.location.search.split('=')[1] : '/';

    //get access to userLogin from redux store
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo, loading, error } = userLogin;

    const dispatch = useDispatch();

    //function to submit the form
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }
    //keep track of changes to userInfo
    useEffect(() => {
      if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo])
  
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className='login'>
            <h1 style={{ textAlign: "center" }}>Login</h1>
            <div className='register-items'>
            <label htmlFor="email">Email</label>
              <input
                className='login-input'
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            
            <div>
              <div className='login-forgot-password-container'>
                <label htmlFor="password">Password </label>
              <Link to="/forgotpassword" style={{fontSize:"14px", color:"blue"}}>
                forgot password?
              </Link>
              </div>
            <div className="login-password">
                <input
                  className='login-input-password'
                type={show ? "test" : "password"}
                id="password"
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" className='login-view-button' onClick={() => setShow(!show)}>
                {show ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </button>
            </div>
            </div>
            
            <button type="submit" class="register-button">Login</button>
            <div class="signin">
            <p>New user? <Link to="/register">Create Account</Link>.</p>
            </div>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            
          </div>
          
        </form>








        {/* <form className="form" onSubmit={handleSummit}>
          <div>
            <h1>Login</h1>
          </div>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="password">Password <Link to="/forgotpassword" style={{fontSize:"14px", color:"blue"}}>
                forgot password?
              </Link></label>
            <div className="register-password">
              <input
                type={show ? "test" : "password"}
                id="password"
                placeholder="Enter your password"
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
            <label />
            <button type="submit" className="primary">
              Login
            </button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            
            <div>
              <label />
            <div style={{marginBottom: "10px"}}>
              New user?{" "}
              <Link to={`/register?redirect=${redirect}`}>
                Create an account
              </Link>
              </div>
            </div>
          </div>
        </form>
         */}
      </div>
    );
}

export default LoginPage
