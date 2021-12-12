import React, {useEffect} from 'react'
import { useState } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { createChat, getChats } from '../actions/chatActions';
import { createMessage, getMessages } from '../actions/messageActions';
import ScrollableChat from '../components/ScrollableChat';
import './ChatPage.css'
//import styled from "styled-components";


function ChatPage() {
  //const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [selectedChat, setSelectedChat] = useState("");
  const [show, setShow] = useState("");
  const [chatNow, setChatNow] = useState();
  const [newMessage, setNewMessage] = useState();
 
  //npm install react-scrollable-feed, used for the Scrollable component
  

  const dispatch = useDispatch();
  //get login user details from store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //get create chat from redux store
  const chatCreate = useSelector((state) => state.chatCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = chatCreate;

  //get user/my chats from redux store
  const getMyChats = useSelector((state) => state.getMyChats);
  const { loading: loadingChats, error: errorChat, myChats } = getMyChats;
  console.log(myChats);

  //create message from redux store
  const messageCreate = useSelector((state) => state.messageCreate);
  const { loading: loadCreateMessage, error: errorCreateMessage, messages, success} =
    messageCreate;

  console.log(messages)
  //get all message from a chat from redux store
  const getAllMessages = useSelector((state) => state.getAllMessages);
  const {
    loading: loadingMessage,
    error: errorMessage,
    myMessages,
  } = getAllMessages;

  // useEffect(() => {
  //   const getChats = async () => {
  //     const { data } = await Axios.get("/api/v1/user/chat", {
  //       headers: { Authorization: `Bearer ${userInfo.token}` },
  //     });
  //     console.log(data);
  //     setChats(data);
  //   };
  //   getChats();
  // }, [userInfo.token]);

  //handle search
  const handleSearch = async () => {
    try {
      setLoading(true);
      const { data } = await Axios.get(`/api/v1/user/chat?search=${search}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setLoading(false);
      setSearchResult(data);
      setShow("show");
    } catch (error) {
      setError(error.message);
    }
  };
  console.log(searchResult);
  

  useEffect(() => {
    if (selectedChat) {
      dispatch(createChat(selectedChat._id));
      setShow("hide");
    }
  }, [dispatch, searchResult, selectedChat]);

  if (successCreate) {
    window.location = "/chatpage";
  }

  useEffect(() => {
    dispatch(getChats());
  }, [dispatch]);

  //typing handler
  const typingHandler = (e) => {
    setNewMessage(e.target.value)
    //typing indicator logic here
  };

  //send message
  // const sendMessage = async() => {
  //   try {
  //     if (chatNow) {
  //       setLoadingMessage(true)
  //       const { data } = await Axios.get(
  //         `/api/v1/message`,
  //         {
  //           content: newMessage,
  //           chatId: chatNow._id,
  //         },
  //         {
  //           headers: { Authorization: `Bearer ${userInfo.token}` },
  //         }
  //       );
  //       setLoadingMessage(false)
  //       console.log(data);
  //       setNewMessage("");
  //       setMessages([...messages, data]);
  //     }
      
  //   } catch (error) {
  //     setErrorMessage(error.message);
  //   }
  //  };
 
  //send message with keybord
  // const handleKeyDown = async (event) => {
  //   if (event.key === "enter" && newMessage) {
  //     try {
  //       const { data } = await Axios.get(`/api/v1/message`, {
  //         content: newMessage,
  //         chatId: chatNow._id
  //       }, {
  //         headers: { Authorization: `Bearer ${userInfo.token}` },
  //       });
  //       console.log(data)
  //       setNewMessage("");
  //       setMessages([...messages, data])
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //   }
  // }
  const sendMessage = () => {
    if (chatNow) {
      dispatch(createMessage(newMessage, chatNow._id));
      setNewMessage('')
    }
  }

  //call the function to get all messages from a chat
  useEffect(() => {
    if (chatNow || success) {
      dispatch(getMessages(chatNow._id))
    }
  }, [chatNow, dispatch, success])
  console.log(myMessages)
  console.log(myChats)
  
  return (
    <div>
      <div className="row around">
        <div className="search">
          <div className="search-input">
            <input
              type="text"
              placeholder="Search by name"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="search-button">
            <button type="button" onClick={handleSearch}>
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>

        <div className="chat-profile">
          <span>
            <i class="fa fa-bell"></i>
          </span>
          <span>
            <img className="small-chat-img" src={userInfo.image} alt="" />
          </span>
          <span>{userInfo.name}</span>
        </div>
      </div>
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      <div className={show}>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {searchResult?.map(
          (user) =>
            user._id !== userInfo._id && (
              <div
                key={user._id}
                className="chat-search-result"
                onClick={() => setSelectedChat(user)}
              >
                <div>
                  {" "}
                  <img
                    className="small-chat-img"
                    src={user.image}
                    alt={user.name}
                  />
                </div>
                <div>{user.name}</div>
              </div>
            )
        )}
      </div>

      <h1>Chat With Customers/Store-Owners</h1>
      <div className="mychats">
        <div className="mychats-1">
          {loadingChats && <LoadingBox></LoadingBox>}
          {errorChat && <MessageBox variant="danger">{errorChat}</MessageBox>}
          <h3>My Chats</h3>
          {myChats?.map((mychat) => (
            <div
              key={mychat._id}
              className="chat-search-result"
              onClick={() => setChatNow(mychat)}
            >
              {mychat.users.map(
                (chat) =>
                  chat._id !== userInfo._id && (
                    <>
                      <div key={chat._id}>
                        <img
                          className="small-chat-img"
                          src={chat.image}
                          alt={chat.name}
                        />
                      </div>
                      <div>{chat.name}</div>
                    </>
                  )
              )}
            </div>
          ))}
        </div>
        <div className="mychats-box">
          <h3>Chat Messages</h3>
          {/* <i class="fa fa-arrow-left"></i> */}
          {chatNow ? (
            <>
              {loadCreateMessage && <LoadingBox></LoadingBox>}
              {errorCreateMessage && (
                <MessageBox variant="danger">{errorCreateMessage}</MessageBox>
              )}
              {loadingMessage && <LoadingBox></LoadingBox>}
              {errorMessage && (
                <MessageBox variant="danger">{errorMessage}</MessageBox>
              )}

              <div className="messages">
                <ScrollableChat messages={myMessages} />
              </div>

              <div class="send chatbottom">
                <div className='sendInput'>
                  <input
                    type="text"
                    placeholder="Enter your message"
                    value={newMessage}
                    onChange={typingHandler}
                  />
                </div>
                <div className='sendButton'>
                  <button
                    class="primary"
                    type="button"
                    onClick={sendMessage}
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <h4>Click on a user to start chatting.</h4>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatPage
