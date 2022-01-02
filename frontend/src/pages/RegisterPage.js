import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileBase64 from "react-file-base64";
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function RegisterPage(props) {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState('')
    const [show, setShow] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false);

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
        }else{
            dispatch(register(name, email, password, image))
        }
        
    }
    //keep track of changes to userInfo
    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect);
        }
    },[props.history, redirect, userInfo])
    return (
      <div className='login'>
        <form className="form" onSubmit={handleSummit}>
          <div>
            <h1>Create Account</h1>
          </div>
          
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <label htmlFor="password">Password</label>
            <div className="register-password">
              <input
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
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="register-password">
              <input
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
          <div>
            <p>Add your photo (optional)</p>
            <FileBase64
              type="file"
              multiple={false}
              onDone={({ base64 }) => setImage(base64)}
            />
          </div>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">Failed to register, try again later.</MessageBox>}
          <div>
            <label />
            <button type="submit" className="primary">
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
      </div>
    );
}

export default RegisterPage
