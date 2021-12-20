import React from "react";
import { useSelector } from "react-redux";
import { ChatState } from "../../context/ChatProvider";
import { Box, Text } from "@chakra-ui/layout";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/button";
import { getSender, getSenderFull } from "../../config/ChatLogics";
import ProfileModal from "./ProfileModal";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import { useEffect, useState } from "react";
import LoadingBox from "../LoadingBox";
import { FormControl } from "@chakra-ui/form-control";
import axios from "axios";
import { useToast, Input } from "@chakra-ui/react";
import "./SingleChat.css";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";

//for socket io connection
const ENDPOINT = "http://localhost:5000";
let socket, selectedChatCompare;

function SingleChat({ fetchAgain, setFetchAgain }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
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

  const toast = useToast();

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
        //console.log(data)
        //send new messages with socket
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Got an error",
          description: "Failed to send your message",
          status: "Error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

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
      toast({
        title: "Got an error",
        description: "Failed to load messages.",
        status: "Error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
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
  

  //typing handler function
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
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "20px", md: "25px" }}
            pb={3}
            px={2}
            w="100%"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {/* display the name of the chat if its group chat */}
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
          </Text>
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {/* Messages here */}
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              {isTyping ? <div>Typing...</div> : <></>}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter your message here"
                onChange={typingHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" p={3}>
            Click on a user to start chatting.
          </Text>
        </Box>
      )}
    </>
  );
}

export default SingleChat;
