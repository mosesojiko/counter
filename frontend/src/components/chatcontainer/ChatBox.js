import React from 'react'
import { ChatState } from "../../context/ChatProvider";
import Box from '@mui/material/Box';
import SingleChat from './SingleChat';



function ChatBox({fetchAgain, setFetchAgain}) {
  //import state from context
  const { selectedChat } = ChatState();
  return (
    
    < Box
    sx = {{
        display: { xs: selectedChat ? "flex" : "none", sm: selectedChat ? "flex" : "none", md: "flex", lg:"flex" },
        alignItems: "center",
        flexDirection: "column",
        p: 3,
        bgcolor: "white",
        width: { sm: "100%", md: "68%" },
        borderRadius: "40px",
      borderWidth:"1px"
    }}
    >
         <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} /> 
      </Box>
    );
    
}

export default ChatBox
