import React from 'react'
import { useSelector } from 'react-redux';
import { ChatState } from "../../context/ChatProvider";
import { Box, Text } from "@chakra-ui/layout";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/button";
import { getSender, getSenderFull } from '../../config/ChatLogics';
import ProfileModal from './ProfileModal';
import UpdateGroupChatModal from './UpdateGroupChatModal';

function SingleChat({ fetchAgain, setFetchAgain }) {
  //get login user details from store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //import state from context
  const { selectedChat, setSelectedChat } = ChatState();

    return (
      <>
        {selectedChat ? (
          <>
            <Text
              fontSize={{ base: "20px", md: "25px" }}
              pb={3}
              px={2}
              w="100%"
              d="flex"
              justifyContent={{ base: "space-between" }}
              alignItems="center"
            >
              <IconButton
                d={{ base: "flex", md: "none" }}
                icon={<ArrowBackIcon />}
                onClick={() => setSelectedChat("")}
              />
              {/* display the name of the chat if its group chat */}
              {!selectedChat.isGroupChat ? (
                <>
                  {getSender(userInfo, selectedChat.users)}
                  <ProfileModal
                    userInfo={getSenderFull(userInfo, selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                                    fetchAgain={fetchAgain}
                                    setFetchAgain={setFetchAgain}
                                />
                </>
              )}
                    </Text>
                    <Box
                        d="flex"
                        flexDir="column"
                        justifyContent="flex-end"
                        p={3}
                        bg="#E8E8E8"
                        w="100%"
                        h="100%"
                        borderRadius="lg"
                        overflowY="hidden"
                    >
                        {/* Messages here */}
                    </Box>
          </>
        ) : (
          <Box d="flex" alignItems="center" justifyContent="center" h="100%">
            <Text fontSize="3xl" p={3}>
              Click on a user to start chatting.
            </Text>
          </Box>
        )}
      </>
    );
}

export default SingleChat
