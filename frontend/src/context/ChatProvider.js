import { useState } from 'react';
import { useContext } from 'react'
import { createContext } from 'react'

const ChatContext = createContext()

//create a chatProvider that will wrap the whole of the app.
const ChatProvider = ({ children }) => {
    //store selectedChat in context
    const [selectedChat, setSelectedChat] = useState();
    //chat to hold all of our chats
    const [ chats, setChats ] = useState([])


    return (
      <ChatContext.Provider
        value={{ selectedChat, setSelectedChat, chats, setChats }}
      >
        {children}
      </ChatContext.Provider>
    );
}
//make state accessible to other part of the app
export const ChatState = () => {
    return useContext(ChatContext);
}

export default ChatProvider