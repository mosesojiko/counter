import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ChatState } from "../../context/ChatProvider";
import { useEffect } from 'react';
import ChatLoading from './ChatLoading';
import Box from '@mui/material/Box';
//import { getSender } from '../../config/ChatLogics';
import GroupChatModal from './GroupChatModal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { getSenderImage } from '../../chatLogics';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function MyChats({fetchAgain}) {
  const [loggedUser, setLoggedUser] = useState()
  const [loading, setLoading] = useState(false);
  //const [getChatError, setGetChatError] = useState(false)
  
 
  //get login user details from store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //import state from context
    const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
   

    //function to fetch all the chats
    const fetchChats = async () => {
      // console.log(user._id);
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

          const { data } = await axios.get("/api/v1/chat", config);
        setChats(data);
        setLoading(false)
      } catch (error) {
       
        setLoading(false)
        return
      }
  };
 

  //edit chat and set notification to false when a chat is selected
  const clearNotified = async (id) => {
    try {
      const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

       await axios.put("/api/v1/chat/unnotification", { id }, config);

      //fetch chats again
      fetchChats()

    } catch (error) {
      console.log(error)
    }
  }


    //call the function in a useEffect
  //whenever the fetchAgain changes, this useEffect runs again
    useEffect(() => {
        setLoggedUser(userInfo)
        fetchChats()
    }, [fetchAgain])
  
  
  //fetch all user notifications
  const myNotification = async () => {
    try {
      const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

      const { data } = await axios.get("/api/v1/chat/findnotification", config);
      console.log(data)

    } catch (error) {
      console.log(error)
    }
  }
 
  useEffect(() => {
    myNotification()
  },[userInfo, selectedChat])
  
  return (
    
    <Box
      sx={{
        display:{xs: selectedChat? "none":"flex", sm: selectedChat? "none":"flex", md:"flex"},
        flexDirection: "column",
        alignItems: "center",
        p:3,
        bgcolor: "white",
        width: {xs:"100%", sm: "100%", md: "31%",  },
        borderRadius: "10px",
        borderWidth: "1px",
      }}
      >
      <Box
        sx={{
          pb: 3,
          px: 3,
          fontSize: { xs: "20px", sm: "20px", md: "22px" },
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems:"center",
        }}
        >
       <Box> My Chats</Box>
      
        <GroupChatModal>
          <Button
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems:"center"
              // fontSize: {xs:"17px", sm:"10px", md:"17px"}
            }}
            >
              Create Group <span><AddIcon /></span>
            </Button>
          
          </GroupChatModal>
      </Box>
      
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 3,
          bgcolor: "#f8f8f8",
          width: "100%",
          height: "100%",
          borderRadius: "40px",
          overflowY:"hidden"
        }}
         
        >
          {loading ? (
            <ChatLoading />
          ) : (
            <Box>
              {
                chats.length === 0 &&
                <p style={{color:"gray"}}>You have not added any user in your chat list. To add user(s), click on <strong>search users or search icon</strong> at the top of the page, type in the name of the user and click on <strong>Go</strong>. In the search result, click on the user and send your message(s).</p>
              }
              {chats.map((chat) => (
                <Box
                  onClick={() => {
                    setSelectedChat(chat)
                    chat.notification && chat.latestMessage.sender._id !== userInfo._id && clearNotified(chat._id)
                  }}
                  sx={{
                    cursor: "pointer",
                    bgcolor: { xs: selectedChat === chat ? "#38B2AC" : "#e8e8e8", sm: selectedChat === chat ? "#38B2AC" : "#e8e8e8", md: selectedChat === chat ? "#38B2AC" : "#e8e8e8", lg: selectedChat === chat ? "#38B2AC" : "#e8e8e8" },
                    color: { xs: selectedChat === chat ? "white" : "black", sm: selectedChat === chat ? "white" : "black", md: selectedChat === chat ? "white" : "black", lg: selectedChat === chat ? "white" : "black" },
                    px: 3,
                    py: 2,
                    borderRadius: "10px",
                    my:1
                  }}
                  key={chat._id}
                >
                  <Typography sx={{display:"flex"}}>
                    
                    {!chat.isGroupChat
                      ? getSenderImage(loggedUser, chat.users)
                      : (<Box sx={{display:"flex", alignItems:"center",}}>
                        <Stack sx={{mr:1}} direction="row" spacing={2}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 24, height: 24 }}/>
                        </Stack>
                        {chat.chatName}
                      </Box>)}
                     {chat.notification && chat.latestMessage.sender._id !== userInfo._id &&
                      (<span className="badge">!</span>)
                    }   
                   
                  </Typography>
                  {chat.latestMessage && (
                    <Typography sx={{fontSize:"12px"}}>
                      <b>{chat.latestMessage.sender.name} : </b>
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                    </Typography>
                  )}
                  
                </Box>
              ))}
            </Box>
            
          )}
        </Box>
      </Box>
    );
}

export default MyChats
