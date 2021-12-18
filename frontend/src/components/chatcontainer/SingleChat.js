import React from 'react'
import { useSelector } from 'react-redux';
import { ChatState } from "../../context/ChatProvider";
import { Box, Text } from "@chakra-ui/layout";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/button";
import { getSender, getSenderFull } from '../../config/ChatLogics';
import ProfileModal from './ProfileModal';
import UpdateGroupChatModal from './UpdateGroupChatModal';
import {useEffect, useState } from 'react';
import LoadingBox from '../LoadingBox';
import { FormControl } from "@chakra-ui/form-control";
import axios from 'axios';
import { useToast, Input } from "@chakra-ui/react";
import './SingleChat.css'
import ScrollableChat from './ScrollableChat';

function SingleChat({ fetchAgain, setFetchAgain }) {

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage ] = useState()

  //get login user details from store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //import state from context
  const { selectedChat, setSelectedChat } = ChatState();

   const toast = useToast();

  //send message function
  const sendMessage = async (event) => {
    if (event.key === 'Enter' && newMessage) {
      try {
        const config = {
          "Content-Type": "apllication/json",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
         setNewMessage("");
        const { data } = await axios.post('/api/v1/message', {
          content: newMessage,
          chatId: selectedChat._id,
        }, config);
        //console.log(data)
        setMessages([...messages, data])
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
   }
  
  //get all the messages for a particular chat
  const fetchMessages = async () => {
    if (!selectedChat) return
    try {
      const config = {
        // "Content-Type": "apllication/json",
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      setLoading(true);
      const { data } = await axios.get(`/api/v1/message/${selectedChat._id}`, config);
      setMessages(data);
      setLoading(false)
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
   }
  
  //call the fetch message in a useEffect everytime selectedChat changes
  useEffect(() => {
    fetchMessages()
  }, [selectedChat])
  

  //typing handler function
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    //typing indicator logic
  }

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
                      fetchMessages = {fetchMessages}
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
              {
                loading ? (<LoadingBox></LoadingBox>) :
                  (
                    <div className='messages'>
                      <ScrollableChat messages={messages} />
                    </div>
                  )
              }
              <FormControl onKeyDown={sendMessage} isRequired mt={3}>
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

export default SingleChat
