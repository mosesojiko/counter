import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import FileBase64 from 'react-file-base64';

import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { editStore } from '../actions/storeActions';

function ProfilePage() {
    const [name, setName ] = useState('')
    const [phone, setPhone ] = useState('')
    const [businessEmail, setBusinessEmail ] = useState('')
    const [image, setImage ] = useState('')

    const userLogin = useSelector(state =>state.userLogin);
    const { userInfo } = userLogin;
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;
    console.log(user)

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdateProfile;

    //import user store from redux
    //want to update the userstore when user is updated
    const userStoreDetails = useSelector(state => state.userStoreDetails);
    const { userStore } = userStoreDetails
    console.log(userStore)


   const dispatch = useDispatch()
    useEffect(()=>{
        if(!user){
            //reset successUpdate when we open profile screen for second time
            dispatch({type: USER_UPDATE_PROFILE_RESET})
            dispatch(detailsUser(userInfo._id));
        }else{
            //fill the input fields with user details
            setName(user.name);
            setPhone(user.phone)
            setBusinessEmail(user.businessEmail)
            setImage(user.image)
        }

    }, [dispatch, userInfo._id, user])
    //define submitHandler function
    const submitHandler = (e) =>{
        e.preventDefault();
        //dispatch update profile
        // if(password !== confirmPassword){
        //     alert("Password and confirm password are not matched.")
        // }else{
        //     dispatch(updateUserProfile({
        //         userId: user._id, name, email, password
        //     }))
        // }
        dispatch(updateUserProfile({
                 userId: user._id, name, phone, businessEmail, image
                 }))
        //also update store with the new user details
        dispatch(editStore({
            id: userStore._id, creatorName: name, creatorPhone: phone, creatorEmail:businessEmail, creatorImage:image
        }));
                 //redirect the user to his store page
                //  props.history.push('/userstore')
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
                        <lable htmlFor="businessEmail">Business Email</lable>
                        <input type ="email" id ="email" placeholder="Enter business email"
                        value ={businessEmail} onChange = {(e) =>setBusinessEmail(e.target.value)}>
                        </input>
                    </div>
                    <div>
                        <lable htmlFor="phone">Phone</lable>
                        <input type ="text" id ="phone" placeholder="Enter business number"
                        value = {phone}
                        onChange = {(e) =>setPhone(e.target.value)}
                        >
                        </input>
                    </div>
                    <div>
                        <p>Add your photo</p>
                        <FileBase64 type ="file" multiple={false}  
                        onDone = {({base64}) => setImage(base64)}
                        />
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
