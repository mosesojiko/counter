import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function LoginPage(props) {
    const [ email, setEmail ] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow ] = useState()

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
        if(userInfo) {
            props.history.push(redirect);
        }
    },[props.history, redirect, userInfo])
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
            <label htmlFor="password">Password</label>
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
          <div>
            <label />
            <div style={{marginBottom: "10px"}}>
              New user?{" "}
              <Link to={`/register?redirect=${redirect}`}>
                Create an account
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
}

export default LoginPage
