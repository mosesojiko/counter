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
    const [ show, setShow ] = useState(false)

    const redirect = props.location.search? props.location.search.split('=')[1] : '/';

    //get access to userRegister from redux store
    const userRegister = useSelector((state) => state.userRegister)
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();
    const handleClick = () => setShow(!show)

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
      <div>
        <form className="form" onSubmit={handleSummit}>
          <div>
            <h1>Create Account</h1>
          </div>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
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
            <input
                        type={show? "test":"password"}
              id="password"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
                    /><button type="button"  onClick={ handleClick}>{ show? "Hide":"Show"}</button>
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Enter confirm password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <p>Add your photo</p>
            <FileBase64
              type="file"
              multiple={false}
              onDone={({ base64 }) => setImage(base64)}
            />
          </div>
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
