import React from "react";
import axios from 'axios';
import { useState } from "react";
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
//import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Popover from '@mui/material/Popover';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useSelector } from "react-redux";
import ChatLoading from "./ChatLoading";
import UserListItem from "./userAvatar/UserListItem";
import { ChatState } from '../../context/ChatProvider'
//import LoadingBox from "../LoadingBox";
//import { getSender } from "../../config/ChatLogics";
import ProfileModal from "./ProfileModal";
import LoadingBox from "../LoadingBox";


function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState()
  const [searchError, setSearchError] = useState(false)
  const [searchResultError, setSearchResultError] = useState(false)
  const [accessChatError, setAccessChatError] = useState(false)
  
  
  //get login user details from store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //import state from context
  //removed notification, setNotification form ChatState()
  const { setSelectedChat, chats, setChats } =
    ChatState();
  // //notification menu 
  // const [notific, setNotific] = React.useState(null);
  // const openNotific = Boolean(notific);
  // const handleOpen = (event) => {
  //   setNotific(event.currentTarget);
  // };
  // const closeNotific = () => {
  //   setNotific(null);
  // };
  
  //profile menu 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //popover things
   const [searchPop, setSearchPop] = React.useState(null);

  const handlePopClick = (event) => {
    setSearchPop(event.currentTarget);
  };

  const handlePopClose = () => {
    setSearchPop(null);
  };

  const openPop = Boolean(searchPop);
  const id = openPop ? 'simple-popover' : undefined;


  // //handleSearch function to search for users
  const handleSearch = async() => {
    if (!search) {
      setSearchError(true)
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
      setSearchResultError(true)
      setLoading(false)
    }
  }

  // //accessChat function. Click on a user to create a chat
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
      //onClose() //close the popover after we click on it
      handlePopClose()
    } catch (error) {
      setAccessChatError(true)
    }
  }

  
  return (
    <>
      <Box 
         sx={{
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
        justifyContent: "space-between",
        bgcolor: "white",
        padding:"5px 10px 5px 10px"
      }}>
        <Tooltip title="Search user to chat" placement="bottom-end">
          <Button aria-describedby={id} variant="contained" onClick={handlePopClick}> <i style={{color:"white"}} class="fa fa-search"></i>
            <Box component="span" sx={{
             display: {xs:"none", sm:"flex", md:"flex"}
           }}>Search users</Box>
          </Button>
        </Tooltip>
        <Box>Business Chat</Box>
        
        <div>
          {/* <Button
        id="notific-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={openNotific ? 'true' : undefined}
        onClick={handleOpen}
      >
            <NotificationsIcon />
            {notification.length > 0 && 
              (<span className="badge">{notification.length}</span>)} 
            
      </Button> */}
      {/* <Menu
        id="basic-menu"
        anchorEl={notific}
        open={openNotific}
        onClose={closeNotific}
        MenuListProps={{
          'aria-labelledby': 'notific-button',
        }}
      >
            <MenuItem onClick={closeNotific}>
              {
                !notification.length && "No New Message(s)"
              }

             
               {
                notification.map((notif) => (
                  <Box key={notif._id} onClick={() => {
                    setSelectedChat(notif.chat)
                    //unNotified(notif.chat._id)//set notification to false
                    // romove the notification from the notification array onClick
                     setNotification(notification.filter((n) => n !== notif))
                  }}>
                    {
                      notif.chat.isGroupChap ? `New message in ${notif.chat.chatName}` :
                      `New message from ${getSender(userInfo, notif.chat.users)}`  
                        
                    }
                  </Box>
                ))
              } 
            </MenuItem>
      </Menu>
          */}
          <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
            <Avatar sx={{ width: 24, height: 24 }} alt={userInfo.name} src={userInfo.image} />
            <span><ExpandMoreIcon /></span>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
            <ProfileModal userInfo={userInfo}>
               <MenuItem>Profile</MenuItem> 
                </ProfileModal>
      </Menu>
          
        </div>
      </Box>

      {/* bring in the popover */}
      <div>
      {/* <Button aria-describedby={id} variant="contained" onClick={handlePopClick}>
        Open Popover
      </Button> */}
      <Popover
        id={id}
        open={openPop}
        anchorEl={searchPop}
        onClose={handlePopClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
          }}
        >
          <Box sx={{
            display: "flex",
            padding: "3px",
            margin:"2px"
          }}>
             <input
                 placeholder="Search user by name"
                mr={2}
                value={search}
               onChange={(e) => setSearch(e.target.value)}
              />
             <Button onClick={handleSearch}><strong>Go</strong></Button>
          </Box> 
          {
            searchError && <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="warning" onClose={() => setSearchError(false)}>Search cannot be empty</Alert>
      
    </Stack>
          }
          {
            searchResultError && <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error" onClose={() => setSearchResultError(false)}>Error in search</Alert>
      
    </Stack>
          }
          {
            loadingChat && <LoadingBox></LoadingBox>
          }
          {
            accessChatError && <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error" onClose={() => setAccessChatError(false)}>Error accessing chat.</Alert>
      
    </Stack>
          }
          {
            loading ? (
              <ChatLoading />
            ) : (
               searchResult?.map((user) => (
                 <UserListItem
                   key={user._id}
                   user={user}
                   handleFunction={() => accessChat(user._id)}
                  />
                ))
            )
          }
          <Button variant="contained" size="small" color="error" onClick={handlePopClose}
            sx={{margin:"5px"}}
          >Close</Button>
      </Popover>
    </div>

    </>
    
  );
}

export default SideDrawer;
