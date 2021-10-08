import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

function ProfilePage() {
    const [name, setName ] = useState('')
    const [email, setEmail ] = useState('')
    const [password, setPassword ] = useState('')
    const [confirmPassword, setConfirmPassword ] = useState('')

    const userLogin = useSelector(state =>state.userLogin);
    const { userInfo } = userLogin;
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdateProfile;
   const dispatch = useDispatch()
    useEffect(()=>{
        if(!user){
            //reset successUpdate when we open profile screen for second time
            dispatch({type: USER_UPDATE_PROFILE_RESET})
            dispatch(detailsUser(userInfo._id));
        }else{
            setName(user.name);
            setEmail(user.email)
        }

    }, [dispatch, userInfo._id, user])
    //define submitHandler function
    const submitHandler = (e) =>{
        e.preventDefault();
        //dispatch update profile
        if(password !== confirmPassword){
            alert("Password and confirm password are not matched.")
        }else{
            dispatch(updateUserProfile({
                userId: user._id, name, email, password
            }))
        }
    }
    return (
        <div>
            <form className ="form" onSubmit = { submitHandler }>
                <div><h1>User Profile</h1></div>
                {
                    loading? <LoadingBox></LoadingBox>:
                    error? <MessageBox variant ="danger">{error}</MessageBox>:
                    <>
                    {
                        loadingUpdate && <LoadingBox></LoadingBox>
                    }
                    {
                        errorUpdate && <MessageBox variant ="danger">{errorUpdate}</MessageBox>
                    }
                    {
                        successUpdate && <MessageBox variant ="success">Profile Updated Successfully.</MessageBox>
                    }
                    <div>
                        <lable htmlFor="name">Name</lable>
                        <input type ="text" id ="name" placeholder="Enter name"
                        value ={name} onChange = {(e) =>setName(e.target.value)} >   
                        </input>
                    </div>
                    <div>
                        <lable htmlFor="email">Email</lable>
                        <input type ="email" id ="email" placeholder="Enter email"
                        value ={email} onChange = {(e) =>setEmail(e.target.value)}>
                        </input>
                    </div>
                    <div>
                        <lable htmlFor="password">Password</lable>
                        <input type ="password" id ="password" placeholder="Enter password"
                        onChange = {(e) =>setPassword(e.target.value)}
                        >
                        </input>
                    </div>
                    <div>
                        <lable htmlFor="confirmPassword">Confirm Password</lable>
                        <input type ="password" id ="confirmPassword" placeholder="Enter confirm password"
                        onChange = {(e) =>setConfirmPassword(e.target.value)}
                        >
                        </input>
                    </div>
                    <div>
                        <label />
                        <button className ="primary" type ="submit">Update</button>
                    </div>
                    </>
                }
            </form>
        </div>
    )
}

export default ProfilePage
