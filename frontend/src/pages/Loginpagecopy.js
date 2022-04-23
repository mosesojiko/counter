import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
//import { GoogleLogin } from 'react-google-login';

function LoginPage(props) {
    const [ email, setEmail ] = useState('');
    const [password, setPassword] = useState('');
  const [show, setShow] = useState()
  
  //const clientId = "947788433833-1p9dkgdr6r3edb7qss6k8quuifiu00ih.apps.googleusercontent.com"

    const redirect = props.location.search? props.location.search.split('=')[1] : '/';

    //get access to userLogin from redux store
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo, loading, error } = userLogin;

    const dispatch = useDispatch();

    //function to submit the form
    const handleSummit = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }
    //keep track of changes to userInfo
    useEffect(() => {
      if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo])
  
  
  

//   const handleLogin = async googleData => {
//   const res = await fetch("/api/v1/user/auth/google", {
//       method: "POST",
//       body: JSON.stringify({
//       token: googleData.tokenId
//     }),
//     headers: {
//       "Content-Type": "application/json"
//     }
//   })
//   const data = await res.json()
//   // store returned user somehow
// }
    return (
      <div className='login'>
        <form className="form" onSubmit={handleSummit}>
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
          {/* <div>
                    <label htmlFor = "password">Password</label>
                    <input type = "password" id ="password" placeholder ="Enter your password" required
                    onChange = { (e) => setPassword(e.target.value)} />
                </div> */}
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
        {/* <div>
            <GoogleLogin
    clientId={clientId}
    buttonText="Log in with Google"
    onSuccess={handleLogin}
    onFailure={handleLogin}
            cookiePolicy={'http://localhost:3000'}
            isSignedIn={true}
/>
            </div> */}
      </div>
    );
}

export default LoginPage
