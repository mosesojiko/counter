import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import FileBase64 from 'react-file-base64';
import { useHistory } from 'react-router-dom'
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { editStore } from '../actions/storeActions';
import Button from '@mui/material/Button';
//import Stack from '@mui/material/Stack';
//import Alert from '@mui/material/Alert';

function ProfilePage(props) {
    const [name, setName ] = useState('')
    const [phone, setPhone ] = useState('')
    const [address, setAddress ] = useState('')
    const [image, setImage ] = useState('')

    const userLogin = useSelector(state =>state.userLogin);
    const { userInfo } = userLogin;
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;
    //console.log(user)

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdateProfile;

    //import user store from redux
    //want to update the userstore when user is updated
    const userStoreDetails = useSelector(state => state.userStoreDetails);
    const { userStore } = userStoreDetails
    //console.log(userStore)

 
    const history = useHistory()
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
            setAddress(user.address)
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
                 userId: user._id, name, phone, address, image
                 }))
        //also update store with the new user details
        dispatch(editStore({
            id: userStore._id, creatorName: name, creatorPhone: phone, creatorAddress:address, creatorImage:image
        }));
    }
    if (successUpdate) {

        setTimeout(() => {
            //reset redirect to the right page
            dispatch({ type: USER_UPDATE_PROFILE_RESET })
            if (userInfo.isSeller) {
                history.push("/userstore");
        } else {
            history.push('/')
            }
    }, 2000);
    }

    //refresh the page if there is error update
  if (errorUpdate) {
    setTimeout(() => {
      dispatch({ type: USER_UPDATE_PROFILE_RESET })
    }, 3000);
  }
    return (
        <div>
            <form className ="form" onSubmit = { submitHandler }>
                <div><h1>Edit Profile</h1></div>
                {
                    loading? <LoadingBox></LoadingBox>:
                    error? <MessageBox variant ="danger">{error}</MessageBox>:
                    <>
                    {
                        loadingUpdate && <LoadingBox></LoadingBox>
                    }
                     {
                        errorUpdate && <MessageBox variant ="danger">Failed to update profile.</MessageBox>
                    } 
                      {/* {
            errorUpdate && <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="warning" onClose={() => setErrorUpdate(false)} sx={{width:"80%", fontSize:"15px"}}>Failed to update profile</Alert>
      
    </Stack>
          }           */}
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
                        <lable htmlFor="address">Address</lable>
                        <input type ="text" id ="address" placeholder="House no, street, town/city,,LGA, state, country "
                        value ={address} onChange = {(e) =>setAddress(e.target.value)}>
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
                        <p>{userInfo.image? "Change photo?":"Add your photo"}</p>
                        <FileBase64 type ="file" multiple={false}  
                        onDone = {({base64}) => setImage(base64)}
                        />
                    </div>
                    <div>
                        <label />
                                    {/* <button className ="primary" type ="submit">Update</button> */}
                                    <Button sx={{mb:2}} type="submit" variant="contained" color="success" size="large">Update</Button>
                    </div>
                    </>
                }
            </form>
        </div>
    )
}

export default ProfilePage
