import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileBase64 from "react-file-base64";
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
//import { GoogleLogin } from 'react-google-login';



function RegisterPage(props) {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState('')
    const [show, setShow] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false);
  const [terms, setTerms] = useState('')
  const [successMessage, setSuccessMessage] = useState(false)
  

    const redirect = props.location.search? props.location.search.split('=')[1] : '/';

    //get access to userRegister from redux store
    const userRegister = useSelector((state) => state.userRegister)
    const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  //view password in input field
  const handleClick = () => setShow(!show)
  const ConfirmPassword = () => setShowConfirm(!showConfirm)

    //function to submit the form
    const handleSummit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
          alert("Password and confirm password are not the same.")
          return
        } else if (name === "Mosganda" || name === "mosganda" || name === "MOSGANDA") {
          alert("You cannot register with the company's name")
          return
        } 
        else {
            dispatch(register(name, email, password, image, terms))
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
  
  
  // const clientId = "947788433833-1p9dkgdr6r3edb7qss6k8quuifiu00ih.apps.googleusercontent.com"

  // const handleLogin = async googleData => {
  // const res = await fetch("/api/v1/user/auth/google", {
  //     method: "POST",
  //     body: JSON.stringify({
  //     token: googleData.tokenId
  //   }),
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // })
  // const data = await res.json()
  // // store returned user somehow
  //   console.log(data)
  // }
  

    return (
        <div className='login'>
        <form className="form" onSubmit={handleSummit}>
          <div style={{margin:"0 5px"}}>
            <h1 style={{margin:"0 5px"}}>Create Account</h1>
          </div>
          
          <div style={{margin:"1 5px"}}>
            <label style={{margin:"0 5px"}} htmlFor="name">Name</label>
            <input style={{margin:"0 5px"}}
              type="text"
              id="name"
              placeholder="Enter your full name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={{margin:"1 5px"}}>
            <label style={{margin:"0 5px"}} htmlFor="email">Email</label>
            <input style={{margin:"0 5px"}}
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={{margin:"1 5px"}}>
            <label style={{margin:"0 5px"}} htmlFor="password">Password</label>
            <div  className="register-password">
              <input style={{margin:"0 5px"}}
                type={show ? "test" : "password"}
                id="password"
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={handleClick}>
                {show ? (
                  <i class="fa fa-eye-slash" aria-hidden="true"></i>
                ) : (
                  <i class="fa fa-eye"></i>
                )}
              </button>
            </div>
          </div>
          <div style={{margin:"1 5px"}}>
            <label style={{margin:"0 5px"}} htmlFor="confirmPassword">Confirm Password</label>
            <div className="register-password">
              <input style={{margin:"0 5px"}}
                type={showConfirm ? "test" : "password"}
                id="confrimPassword"
                placeholder="Confirm password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="button" onClick={ConfirmPassword}>
                {showConfirm ? (
                  <i class="fa fa-eye-slash" aria-hidden="true"></i>
                ) : (
                  <i class="fa fa-eye"></i>
                )}
              </button>
            </div>
          </div>
          <div style={{margin:"0 5px"}}>
            <p style={{margin:"0 5px"}}>Add your photo (optional)</p>
            <FileBase64
              type="file"
              multiple={false}
              onDone={({ base64 }) => setImage(base64)}
            />
          </div>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">Failed to register, try again later.</MessageBox>}
          
          <div style={{display:"flex", alignItems:"center", flexDirection:"row", margin:"0 5px"}}>
                        <input type = "radio" id ="terms" 
                        value ="agreed" name ="terms"
                        required onChange ={(e) => setTerms(e.target.value)} />
                        <label style={{marginTop:"0", marginBottom:"0"}} htmlFor ="terms"><Link to="/termsandconditions" style={{fontSize:"12px"}}> I agree to the terms and conditions</Link></label>
                    </div>
          <div style={{margin:"0 5px"}}>
            <label />
            <button style={{margin:"0 5px"}} type="submit" className="primary">
              Register
            </button>
          </div>
          <div>
            <label />
            <div>
              Already have an account?{" "}
              <Link to={`/login?redirect=${redirect}`}>Login</Link>
            </div>
          </div>
        </form>
        {/* <GoogleLogin
    clientId={clientId}
    buttonText="Log in with Google"
    onSuccess={handleLogin}
    onFailure={handleLogin}
            cookiePolicy={'http://localhost:3000'}
            isSignedIn={true}
/> */}
        {
              successMessage && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="success" onClose={() => setSuccessMessage(false)}>Successful. A verification link has been sent to your email.</Alert>
      
            </Stack>
              }
      </div>
    );
}

export default RegisterPage
