import React from "react";
import axios from 'axios';
import { useState } from "react";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  Input,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Avatar } from "@chakra-ui/avatar";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import ProfileModal from "./ProfileModal";
import { useDisclosure } from "@chakra-ui/hooks";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useToast,
} from "@chakra-ui/react";
import ChatLoading from "./ChatLoading";
import UserListItem from "./userAvatar/UserListItem";
import { ChatState } from '../../context/ChatProvider'
import LoadingBox from "../LoadingBox";
import { getSender } from "../../config/ChatLogics";



function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState()
  
  
  
  //get login user details from store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //import state from context
  const { setSelectedChat, chats, setChats, notification, setNotification } =
    ChatState();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast()


  //handleSearch function to search for users
  const handleSearch = async() => {
    if (!search) {
      toast({
        title: "Search cannot be empty",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left"
      });
      return
    }
    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}`},
      }

      const { data } = await axios.get(`/api/v1/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data)
    } catch (error) {
      toast({
        title: "Got an error",
        status: "Cannot load search result",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }

  //accessChat function. Click on a user to create a chat
  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type":"application/json",
          Authorization: `Bearer ${userInfo.token}`
        },
      };
      const { data } = await axios.post('/api/v1/chat', { userId }, config);

      //if it finds an existing chat, just append the data
      if(!chats.find((c) => c._id === data._id)) setChats([data, ...chats])
      setLoadingChat(false);
      setSelectedChat(data)
      onClose() //close the sidedrawer after we click on it
    } catch (error) {
      toast({
        title: "Error fetching chats",
        description: error.message,
        status: "Error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }
 
  return (
    <>
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search user by name" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i class="fa fa-search"></i>
            <Text d={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl">Chat With Customers</Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1} />
              <span className="badge">{notification.length}</span>
            </MenuButton>
            <MenuList p={2}>
              {!notification.length && "No New Message(s)"}
              {notification?.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(
                        userInfo,
                        notif.chat.users
                      )}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={userInfo.name}
                src={userInfo.image}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal userInfo={userInfo}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              {/* <MenuDivider />
              <MenuItem>Logout</MenuItem> */}
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" color="white">
            Search User
          </DrawerHeader>

          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                placeholder="Search user by name"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <LoadingBox></LoadingBox>}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
