import React from 'react'
import { Button } from '@chakra-ui/button';
import { useDisclosure } from "@chakra-ui/hooks";
import { FormControl } from '@chakra-ui/form-control'
import { Box } from "@chakra-ui/layout";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
    ModalCloseButton,
    useToast,
  Input,
} from "@chakra-ui/react";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ChatState } from "../../context/ChatProvider";
import axios from 'axios';
import LoadingBox from '../LoadingBox';
import UserListItem from './userAvatar/UserListItem';
import UserBadgeItem from './userAvatar/UserBadgeItem';

function GroupChatModal({children}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);


  const toast = useToast();

  //when we create a group chat, we are going to append it to whatever chat we have
  //so we get our chat from context
  const { chats, setChats } = ChatState();

  //get login user details from store
  const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    
    //handle search
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
            console.log(data)
            setSearchResult(data)
        } catch (error) {
            toast({
                title: "Got an error",
                description:"Cannot load search result",
              status: "Error",
              duration: 5000,
              isClosable: true,
              position: "bottom-left",
            });
        }
    }
    
    //handle submit, to create the group chat
    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
            toast({
              title: "Please, fill all the fields",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
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

            //close the modal
            onClose();
            setChats([data, ...chats])
            toast({
              title: "Your group has being created",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
        } catch (error) {
            toast({
                title: "Failed to create group chat",
                description:"Error",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
        }
     };

    //handle group
    //click on the searched user, add it to the selectedUsers array
    const handleGroup = (userToAdd) => {
        //check if the user has already being added
        if (selectedUsers.includes(userToAdd)) {
            toast({
              title: "User already added",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
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
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            d="flex"
            justifyContent="center"
            color="white"
          >
            My Customers
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users e.g Mosganda, Moses"
                mb={3}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {/* selected users */}
                      <Box
                         w="100%" d="flex" flexWrap="wrap" 
                      >
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
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
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default GroupChatModal
