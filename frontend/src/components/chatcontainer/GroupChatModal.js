import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ChatState } from "../../context/ChatProvider";
import axios from 'axios';
import LoadingBox from '../LoadingBox';
import UserListItem from './userAvatar/UserListItem';
import UserBadgeItem from './userAvatar/UserBadgeItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
//import TextField from '@mui/material/TextField'
//import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';



//styles for modal
  const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



function GroupChatModal({children}) {
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState('')
  const [requirement, setRequirement] = useState(false);
  const [createGroupSuccess, setCreateGroupSuccess] = useState(false);
  const [createError, setCreateError] = useState(false)
  const [handleGroupWarning, sethandleGroupWarning] = useState(false)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);




  //when we create a group chat, we are going to append it to whatever chat we have
  //so we get our chat from context
  const { chats, setChats } = ChatState();

  //get login user details from store
  const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

  
    
  //   //handle search
    const handleSearch = async(query) => { 
        setSearch(query)
        if(!query){
            return
        }
        try {
            setLoading(true)
            const config = {
              headers: { Authorization: `Bearer ${userInfo.token}` },
            };
            const { data } = await axios.get(`/api/v1/user?search=${search}`, config);
            setLoading(false);
            setSearchResult(data)
        } catch (error) {
          setSearchError(true);
          setLoading(false)
        }
    }
    
  //   //handle submit, to create the group chat
    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
            setRequirement(true)
            return
        }
        try {
            const config = {
              headers: { Authorization: `Bearer ${userInfo.token}` },
            };
            const { data } = await axios.post('/api/v1/chat/group', {
                name: groupChatName,
                users: JSON.stringify(selectedUsers.map((u)=>u._id))
            }, config);

            // //close the modal
            // onClose();
          setChats([data, ...chats])
          setCreateGroupSuccess(true) //your group has been created
          setSelectedUsers([])
          setSearchResult([])
        } catch (error) {
          setCreateError(true);//Failed to create group
          setLoading(false)
        }
     };

    //handle group
    //click on the searched user, add it to the selectedUsers array
    const handleGroup = (userToAdd) => {
        //check if the user has already being added
        if (selectedUsers.includes(userToAdd)) {
            sethandleGroupWarning(true) //User already added
            return
        }
        setSelectedUsers([...selectedUsers, userToAdd])
    }

    //delete a selected user
    const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter((sel) =>sel._id !== delUser._id ))
  }
  

  return (
    <>
       <div>
        <span onClick={handleOpen}>{ children}</span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{textAlign:"center"}} id="modal-modal-title" variant="h4" component="h2">
            Group Chat
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexWrap:"wrap",
              }}
              
              >
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              alignItems:"center",
            }}>
              <Box sx={{mb:1}}><input
                placeholder="Chat Name"
                onChange={(e) => setGroupChatName(e.target.value)}
              /></Box>
               <Box sx={{mb:1}}><input
                placeholder="Add Users e.g Moses"
                onChange={(e) => handleSearch(e.target.value)}
              /></Box>
            </Box>
            {
            searchError && <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error" onClose={() => setSearchError(false)}>Error in search</Alert>
      
    </Stack>
          }
            <Box
              sx={{
                width: "80%",
                p: 2,
                m:2
              }}
            >
              {loading ? (
              <LoadingBox></LoadingBox>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
            </Box>
            {
            handleGroupWarning && <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="warning" onClose={() => sethandleGroupWarning(false)}>User already added.</Alert>
      
    </Stack>
            }
            {
            requirement && <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="warning" onClose={() => setRequirement(false)}>All fields are required</Alert>
      
    </Stack>
              }
              {
            createGroupSuccess && <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success" onClose={() => setCreateGroupSuccess(false)}>Your group has been created.</Alert>
      
    </Stack>
              }
              {
            createError && <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error" onClose={() => setCreateError(false)}>Error creating group.</Alert>
      
    </Stack>
          }
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems:"center"
              }}
            >
              
              <Button variant="contained" color="success" onClick={handleSubmit}>
              Create Chat
            </Button>
            <Button variant ="outlined" color="error" onClick={handleClose}>Close</Button>
            </Box>
          </Box>
           
      </Modal>
    </div>
      </>
  )
}

export default GroupChatModal
