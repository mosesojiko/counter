import React, {useEffect} from 'react'
import { useState } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { createChat, getChats } from '../actions/chatActions';


function ChatPage() {
  //const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [selectedChat, setSelectedChat] = useState('')
  const [disp, setDisp ] = useState('')
  
  const dispatch = useDispatch()
  //get login user details from store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //get create chat from redux store
  const chatCreate = useSelector(state => state.chatCreate);
  const {loading: loadingCreate, error: errorCreate, success: successCreate} = chatCreate


  //get user/my chats from redux store
  const getMyChats = useSelector(state => state.getMyChats);
  const { loading: loadingChats, error: errorChat, myChats } = getMyChats
  console.log(myChats)
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
      setDisp("show")
    } catch (error) {
      setError(error.message);
    }
  };
  console.log(searchResult);
  //<h1>Chat Page</h1>;
  //{
  // chats.map(
  //   (chat) =>
  //    chat._id !== userInfo._id && <div key={chat._id}>{chat.name}</div>
  //);
  //}
 
  
  useEffect(() => {
    if (selectedChat) {
      dispatch(createChat(selectedChat._id));
      setDisp("hide");
    }
    
  },[dispatch, searchResult, selectedChat])
   

  if (successCreate) {
    window.location = '/chatpage'
  }

  useEffect(() => {
    dispatch(getChats())
  },[dispatch])

  return (
    <div>
      <div className="row around">
        <div>
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Search User"
              onChange={(e) => setSearch(e.target.value)}
            />
            <div class="input-group-append">
              <button
                class="btn btn-success"
                type="button"
                onClick={handleSearch}
              >
                <i class="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>

        <div>
          <i class="fa fa-bell"></i>
          {userInfo.name}
        </div>
      </div>
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      <div className={disp}>
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
          {myChats?.map(
            (mychat) =>
              mychat.users[1]._id !== userInfo._id && (
                <div key={mychat._id} className="chat-search-result">
                  <div>
                    <img
                      className="small-chat-img"
                      src={mychat.users[1].image}
                      alt={mychat.users[1].name}
                    />
                  </div>
                  <div>{mychat.users[1].name}</div>
                </div>
              )
          )}
        </div>
        <div className="mychats-box">
          <h3>Chat Messages</h3>
        </div>
      </div>
    </div>
  );
}

export default ChatPage
