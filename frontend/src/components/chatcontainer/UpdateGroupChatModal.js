import React, { useState } from "react";
import axios from "axios";

import { useSelector } from "react-redux";
import { ChatState } from "../../context/ChatProvider";
import UserBadgeItem from "./userAvatar/UserBadgeItem";
import LoadingBox from "../LoadingBox";
import UserListItem from "./userAvatar/UserListItem";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function UpdateGroupChatModal({ fetchAgain, setFetchAgain, fetchMessages }) {
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noSearchValue, setNoSearchValue] = useState(false)
  const [ searchError, setSearchError ] = useState(false)
  const [renameLoading, setRenameLoading] = useState(false);
  const [noNewName, setNoNewName] = useState(false)
  const [errorRename, setErrorRename] = useState(false)
  const [successRename, setSuccessRename] = useState(false)
  const [userInGroup, setUserInGroup] = useState(false)
  const [notAdmin, setNotAdmin] = useState(false)
  const [addingUser, setAddingUser] = useState(false)
  const [errorAddingUser, setErrorAddingUser] = useState(false)
  const [notAdminRemove, setNotAdminRemove] = useState(false)
  const [loadingRemove, setLoadingRemove] = useState(false)
  const [errorRemove, setErrorRemove] = useState(false)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  //get login user details from store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //import state from context
  const { selectedChat, setSelectedChat } = ChatState();
  

  //add user to the group
  const handleAddUser = async (user1) => {
    //check if the user is already in the group
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      setUserInGroup(true)
      return;
    }
    //check if the user is an admin. only admins can add users
    if (selectedChat.groupAdmin._id !== userInfo._id) {
      setNotAdmin(true)
      //Only admins can add users
      return;
    }
    try {
      setAddingUser(true);
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        "/api/v1/chat/groupadd",
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setAddingUser(false);
    } catch (error) {
      setErrorAddingUser(true)
      //error adding a user
      setAddingUser(false);
    }
    setGroupChatName("");
  };

  //remove a user
  const handleRemove = async (user1) => {
    //check if the user is an admin. only admins can remove users
    if (
      selectedChat.groupAdmin._id !== userInfo._id &&
      user1._id !== userInfo._id
    ) {
      //only admin can remove user
      setNotAdminRemove(true)
      return;
    }
    try {
      setLoadingRemove(true);
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
      setFetchAgain(!fetchAgain);
      //fetch the messages again after removing someone
      fetchMessages();
      setLoadingRemove(false);
    } catch (error) {
      //error removing a user
      setErrorRemove(true)
      setLoading(false);
    }
    setGroupChatName("");
  };

  //rename a group chat
  const handleRename = async () => {
    if (!groupChatName) {
      setNoNewName(true);
      return
    }

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        "/api/v1/chat/rename",
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
      setSuccessRename(true)
    } catch (error) {
      setErrorRename(true)
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  //search users to add to group
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      setNoSearchValue(true)
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      const { data } = await axios.get(`/api/v1/user?search=${search}`, config);
      setLoading(false);
      //console.log(data);
      setSearchResult(data);
    } catch (error) {
     setSearchError(true)
      setLoading(false);
    }
  };
  
  return (
    <>
      <IconButton sx={{display:{sm:"flex"}}} onClick={handleOpen}><VisibilityIcon/></IconButton>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{textAlign:"center"}} id="modal-modal-title" variant="h4" component="h2">
            {selectedChat.chatName}
          </Typography>
          <Box sx={{width:"100%", display:"flex", flexWrap:"wrap", pb:3}}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  admin={selectedChat.groupAdmin}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
          </Box>
          <Box sx={{display:"flex", alignItems:"center", mb:1}}>
            <input
                placeholder="Group name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="contained"
                color="warning"
                ml={1}
                isLoading={renameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
          </Box>
          {
            noSearchValue && <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="warning" onClose={() => setNoSearchValue(false)}>Search cannot be empty.</Alert>
      
            </Stack>
          }
          {
            searchError && <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error" onClose={() => setSearchError(false)}>Search not successful.</Alert>
      
    </Stack>
          }
          {
            noNewName && <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="warning" onClose={() => setNoNewName(false)}>Enter the new group name.</Alert>
      
    </Stack>
          }
          {
            renameLoading && <LoadingBox></LoadingBox>
          }
          {
            successRename && <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success" onClose={() => setSuccessRename(false)}>Group renamed successfully.</Alert>
      
    </Stack>
          }
          {
            errorRename && <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error" onClose={() => setErrorRename(false)}>Error renaming group.</Alert>
      
    </Stack>
          }
          {
            userInGroup && <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="warning" onClose={() => setUserInGroup(false)}>User is added already.</Alert>
      
    </Stack>
          }
          {
            notAdmin && <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="warning" onClose={() => setNotAdmin(false)}>Only admin can add someone.</Alert>
      
    </Stack>
          }
          {
            addingUser && <LoadingBox></LoadingBox>
          }
          {
            errorAddingUser && <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error" onClose={() => setErrorAddingUser(false)}>Error adding user.</Alert>
      
    </Stack>
          }
          {
            notAdminRemove && <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="warning" onClose={() => setNotAdminRemove(false)}>Only admin can remove someone.</Alert>
      
    </Stack>
          }
          {
            loadingRemove && <LoadingBox></LoadingBox>
          }
          {
            errorRemove && <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="warning" onClose={() => setErrorRemove(false)}>Error removing user.</Alert>
      
    </Stack>
          }
          
          <Box>
            <input
                placeholder="Add users"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
          </Box>
          <Box sx={{width:"90%"}}>
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
          </Box>
          
          <Box sx={{display:"flex", justifyContent:"space-between", mt:1}}>
            <Button variant="contained" color="error" onClick={() => handleRemove(userInfo)}>
              Leave Group
            </Button>
          <Button variant ="outlined" color="error" onClick={handleClose}>Close</Button>
          </Box>
        </Box>
      </Modal>
      {/* <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />

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
      </Modal> */}
    </>
  );
}

export default UpdateGroupChatModal;
