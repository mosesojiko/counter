import React from 'react'
import { ChatState } from "../../context/ChatProvider";
import { Box } from "@chakra-ui/layout";
import SingleChat from './SingleChat';


function ChatBox({fetchAgain, setFetchAgain}) {
  //import state from context
  const { selectedChat } = ChatState();
    return (
      <Box
        d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
        alignItems="center"
        flexDir="column"
        p={3}
        bg="white"
        w={{ base: "100%", md: "68%" }}
        borderRadius="lg"
        borderWidth="1px"
      >
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Box>
    );
    
}

export default ChatBox
