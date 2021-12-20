import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ChatState } from "../../context/ChatProvider";
import { useToast } from '@chakra-ui/react'
import { useEffect } from 'react';
import { Box, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from './ChatLoading';
import { Stack } from "@chakra-ui/layout";
import { getSender } from '../../config/ChatLogics';
import GroupChatModal from './GroupChatModal';

function MyChats({fetchAgain}) {
  const [loggedUser, setLoggedUser] = useState()
  const [ loading, setLoading ] = useState(false)
  //get login user details from store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //import state from context
    const { selectedChat, setSelectedChat, chats, setChats, notification } = ChatState();
    
    const toast = useToast()

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
        toast({
          title: "Error",
          description: "Failed to Load the chats",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
        setLoading(false)
        return
      }
    };

    //call the function in a useEffect
  //whenever the fetchAgain changes, this useEffect runs again
    useEffect(() => {
        setLoggedUser(userInfo)
        fetchChats()
    },[fetchAgain])
    return (
      <Box
        d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDir="column"
        alignItems="center"
        p={3}
        bg="white"
        w={{ base: "100%", md: "31%" }}
        borderRadius="lg"
        borderWidth="1px"
      >
        <Box
          pb={3}
          px={3}
          fontSize={{ base: "28px", md: "30px" }}
          fontFamily="Work sans"
          d="flex"
          w="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          My Chats
          <GroupChatModal>
            <Button
              d="flex"
              fontSize={{ base: "17px", md: "10px", lg: "17px" }}
              rightIcon={<AddIcon />}
            >
              Create Group
            </Button>
          </GroupChatModal>
        </Box>
        <Box
          d="flex"
          flexDir="column"
          p={3}
          bg="#F8F8F8"
          w="100%"
          h="100%"
          borderRadius="lg"
          overflowY="hidden"
        >
          {loading ? (
            <ChatLoading />
          ) : (
            <Stack overflowY="scroll">
              {chats.map((chat) => (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                >
                  <Text>
                    
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                    
                  </Text>
                  {chat.latestMessage && (
                    <Text fontSize="xs">
                      <b>{chat.latestMessage.sender.name} : </b>
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                    </Text>
                  )}
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      </Box>
    );
}

export default MyChats
