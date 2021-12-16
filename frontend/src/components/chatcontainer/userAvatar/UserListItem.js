import React from 'react'
import { Box, Text } from "@chakra-ui/layout";
 import { Avatar } from "@chakra-ui/avatar";

function UserListItem({user, handleFunction }) {
  
    return (
      <Box
        onClick={handleFunction}
        cursor="pointer"
        bg="#e8e8e8"
        _hover={{
          background: "#38B2AC",
          color: "white",
        }}
        width="100%"
        d="flex"
        alignItems="center"
        color="black"
        px={3}
        py={3}
        mb={2}
        borderRadius="lg"
      >
            <Avatar
                mr={2}
          size="sm"
          cursor="pointer"
          name={user.name}
          src={user.image}
            />
            <Box>
                <Text>{user.name}</Text>
                <Text fontSize="xs">
                    <b>Email: </b>
                    {user.email}
                </Text>
            </Box>
      </Box>
    );
}

export default UserListItem

