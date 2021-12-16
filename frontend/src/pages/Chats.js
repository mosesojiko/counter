import React from 'react'
import './Chats.css'
//import {Container} from '@chakra-ui/react'
import { Box } from '@chakra-ui/layout'
import { useSelector } from 'react-redux';
import SideDrawer from '../components/chatcontainer/SideDrawer';
import MyChats from '../components/chatcontainer/MyChats';
import ChatBox from '../components/chatcontainer/ChatBox';


function Chats() {
  //get login user details from store
  const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    console.log(userInfo)
  return (
    <div style={{ width: "100%" }}>
      {userInfo && <SideDrawer />}
          <Box d="flex"
              justifyContent="space-between"
              w="100%"
              h="90vh"
              p="10px"
          >
        {userInfo && <MyChats/>} 
        {userInfo && <ChatBox/>}
      </Box>
    </div>
  );
}

export default Chats
