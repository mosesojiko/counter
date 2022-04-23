import React from 'react'
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import SideDrawer from '../components/chatcontainer/SideDrawer';
import MyChats from '../components/chatcontainer/MyChats';
import ChatBox from '../components/chatcontainer/ChatBox';
import { useState } from 'react';




function Chats() {
  //get login user details from store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!userInfo) {
    window.location = "/login";
  }
  //more of a parent state
  //whenever this fetchAgain changes, it is going to fetch all the chats again
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {userInfo && <SideDrawer />}

      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%", height: "70vh",
        padding: '10px',
      }}>
         {userInfo && <MyChats fetchAgain={fetchAgain} />}
        {userInfo && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
        </Box>
    </div>
  );
}

export default Chats
