import React from "react";
import { useSelector } from "react-redux";
import { ChatState } from "../../context/ChatProvider";
import { getSender, getSenderFull } from "../../config/ChatLogics";
import ProfileModal from "./ProfileModal";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import { useEffect, useState } from "react";
import LoadingBox from "../LoadingBox";
import axios from "axios";
import "./SingleChat.css";
import ScrollableChat from "./ScrollableChat";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


import io from "socket.io-client";

//for socket io connection
const ENDPOINT = "http://localhost:5000";
let socket, selectedChatCompare;

function SingleChat({ fetchAgain, setFetchAgain }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorFetchMessage, setErrorFetchMessage] = useState(false)
  const [newMessage, setNewMessage] = useState();
  const[sendMessageError, setSendMessageError] = useState(false)
  const [socketConnected, setSocketConnected] = useState(false);
  //state for typing functionality
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  

  //get login user details from store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //import state from context
  const { selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();

  //useEffect to connect socket io
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userInfo);
    socket.on("connected", () => setSocketConnected(true));

    //connect to the typing room
    //If typing is going on
    socket.on("typing", () => setIsTyping(true));
    //if typing is not going on
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  //send message function
  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      //if message has been sent, emit stop typing
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          "Content-Type": "apllication/json",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/v1/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        console.log(data)
        //send new messages with socket
        socket.emit("new message", data);
        setMessages([...messages, data]);
        //set notification
        notified(selectedChat._id)
      } catch (error) {
        setSendMessageError(true) //failed to send message
      }
    }
  };

  //using button to send message
  const sendMessageWithButton = async () => {
    //if message has been sent, emit stop typing
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          "Content-Type": "apllication/json",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/v1/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        //console.log(data)
        //send new messages with socket
        socket.emit("new message", data);
        setMessages([...messages, data]);
        //give notification
        notified(selectedChat._id)
      } catch (error) {
        setSendMessageError(true) //failed to send message
      }
  } 
  //get all the messages for a particular chat
  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        // "Content-Type": "apllication/json",
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      //user join room with the chat id
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      setErrorFetchMessage(true) //Failed to load messages
      setLoading(false)
    }
  };



  //call the fetch message in a useEffect everytime selectedChat changes
  useEffect(() => {
    fetchMessages();
    //make the messages real time
    //keep the backup of whatever selected chat state is, in other to decide whether to emit the message or give notification
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  //remove the depency array for this useEffect because we want to update this useEffect everytime our state changes
  //if it received any message, it should put it in the chat
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      //monitor the socket for new messages
      //if non of the chat is selected or the one selected does not match the one that received the message, give notification
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        //give notification
        //add the new message to notification if it is not in the notification array
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification])
          
          //update our messages again to add the new message
          setFetchAgain(!fetchAgain)
        }
      } else {
        //add the new message to the existing list of messages
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });
  

  //edit chat and set notification true when there is a notification
  const notified = async (id) => {
    try {
      const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

      const { data } = await axios.put("/api/v1/chat/notification", { id }, config);
      
    } catch (error) {
      console.log(error)
    }
  }

  // //typing handler function
   const typingHandler = (e) => {
     setNewMessage(e.target.value);
    //typing indicator logic
    //if socket is not connected
    if (!socketConnected) return;
    //if socket is connected, and typing is going on i.e typing=true. remenber typing is false by default
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    //decide when to stop typing
    let lastTypingTime = new Date().getTime();
    //decide after 3 second
    let timerLength = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };
  

  

  return (
    <>
      {
        selectedChat ? (
          <>
            <Typography 
              sx={{
                fontSize: { sm: "28px", md: "35px" },
                pb: 3,
                px: 2,
                width: "100%",
                display: "flex",
                justifyContent: { sm: "space-between" },
                alignItems:"center"
              }}
          >
              <IconButton
                sx={{
                  display:{ sm: "flex", md: "none"}
                }}
             
              onClick={() => setSelectedChat("")}
              >  <ArrowBackIcon /></IconButton>
              
              {!selectedChat.isGroupChat ? (
              <>
                {getSender(userInfo, selectedChat.users)}
                <ProfileModal
                  userInfo={getSenderFull(userInfo, selectedChat.users)}
                />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
            </Typography>
            <Box sx={{
              display:"flex",
            flexDirection:"column",
            justifyContent:"flex-end",
            p:3,
            bgcolor:"#E8E8E8",
            width:"100%",
              height: "100%",
            borderRadius:"10px",
              overflowY: "hidden",
           
            }}>
              {
                loading ? (<LoadingBox sx={{alignSelf:"center", margin:"auto"}}></LoadingBox>) :
                  (
                    <div className="messages">
                      <ScrollableChat messages={messages} />
                    </div>
                  )
              }
              {
            sendMessageError && <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error" onClose={() => setSendMessageError(false)}>Failed to send message.</Alert>
      
    </Stack>
              }
              {
            errorFetchMessage && <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error" onClose={() => setErrorFetchMessage(false)}>Failed to load messages.</Alert>
      
    </Stack>
              }
              {isTyping && <p style={{ color:"#023c3f"}}>Typing...</p>}
              <div className="messageSender">
                <input type="text" placeholder="Enter your message"
                  onChange={typingHandler}
                  value={newMessage}
                  onKeyDown={sendMessage}
                />
                <button type="button" onClick={sendMessageWithButton}>send</button>
              </div>
            </Box>
            </>
        ): (
            <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", height:"100%"}} >
          <Typography sx={{fontSize:"30px", p:3}}>
            Click on a user to start chatting.
          </Typography>
        </Box>
        )
      }
      
    </>
  );
}

export default SingleChat;
