import React, { useState } from 'react'
import { useDisclosure } from "@chakra-ui/hooks";
import axios from 'axios'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
    ModalCloseButton,
    FormControl,
  Input
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/button";
import { Button } from "@chakra-ui/button";
import { useSelector } from 'react-redux';
import { useToast } from "@chakra-ui/react";
import { Box} from "@chakra-ui/layout";
import { ChatState } from "../../context/ChatProvider";
import UserBadgeItem from './userAvatar/UserBadgeItem';
import LoadingBox from '../LoadingBox';
import UserListItem from './userAvatar/UserListItem';

function UpdateGroupChatModal({ fetchAgain, setFetchAgain }) {
    const [groupChatName, setGroupChatName] = useState('')
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false)

  //get login user details from store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //import state from context
    const { selectedChat, setSelectedChat } = ChatState();
    const toast = useToast();
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    //add user to the group
    const handleAddUser = async (user1) => {
        //check if the user is already in the group
        if (selectedChat.users.find((u) => u._id === user1._id)) {
            toast({
                title: "User already in the group",
                status: "Error",
                duration: 5000,
                isClosable: true,
                position: "top",
            
            })
            return
      }
      //check if the user is an admin. only admins can add users
        if (selectedChat.groupAdmin._id !== userInfo._id) {
            toast({
              title: "Only admin can add user!",
              status: "Error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
            return;
        }
        try {
            setLoading(true)
            const config = {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
            };
            const { data } = await axios.put('/api/v1/chat/groupadd', {
                chatId: selectedChat._id,
                userId: user1._id,
            }, config)

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false)
        } catch (error) {
            toast({
              title: "Error",
              description: error.response.data.message,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
            setLoading(false)
        }
           setGroupChatName("") 
        }
       
  
  //remove a user
  const handleRemove = async (user1) => {
    //check if the user is an admin. only admins can remove users
      if (selectedChat.groupAdmin._id !== userInfo._id && user1._id !== userInfo._id) {
        toast({
          title: "Only admin can remove user!",
          status: "Error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        "/api/v1/chat/groupremove",
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );
      //if the user has removed himself or left the group, we dont want him to see that chat anymore
      user1._id === userInfo._id ? setSelectedChat() : setSelectedChat(data);
              setFetchAgain(!fetchAgain)
              setLoading(false)
    } catch (error) {
      toast({
              title: "Error",
              description: error.response.data.message,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
            setLoading(false)
    }
    setGroupChatName("")
  }
        
    //rename a group chat
    const handleRename = async () => {
        if (!groupChatName) return
        
        try {
            setRenameLoading(true);
            const config = {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
            };
            const { data } = await axios.put('/api/v1/chat/rename', {
                chatId: selectedChat._id,
                chatName: groupChatName
            }, config);
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setRenameLoading(false)
        } catch (error) {
          toast({
            title: "Error",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
            setRenameLoading(false)
        }
        setGroupChatName('')
     }
    
    //search users to add to group
    const handleSearch = async(query) => {
        setSearch(query);
        if (!query) {
          return;
        }
        try {
          setLoading(true);
          const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          };
          const { data } = await axios.get(
            `/api/v1/user?search=${search}`,
            config
          );
          setLoading(false);
          //console.log(data);
          setSearchResult(data);
        } catch (error) {
          toast({
            title: "Got an error",
            description: "Cannot load search result",
            status: "Error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
           setLoading(false);
        }
    }
  return (
    <>
      <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="25px" d="flex" justifyContent="center">
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="100%" d="flex" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  admin={selectedChat.groupAdmin}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl d="flex">
              <Input
                placeholder="Group name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                bg="teal"
                ml={1}
                isLoading={renameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add users"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {/* show result of search */}
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleAddUser(user)}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" onClick={() => handleRemove(userInfo)}>
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateGroupChatModal
