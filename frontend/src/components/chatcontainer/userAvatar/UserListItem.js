import React from 'react'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography';

function UserListItem({user, handleFunction }) {
  
  return (
     
      <Box
      onClick={handleFunction}
      sx={{
        cursor: "pointer",
        bgcolor:"#e8e8e8",
         ":hover":{
          bgcolor: "#38B2AC",
          color: "white",
        },
        width: "100%",
        display: "flex",
        alignItems: "center",
        color: "black",
        px: 3,
        py: 1,
        mb: 2,
        
      }}

      >
      <Avatar
        sx={{width:"24px", height:"24px", cursor:"pointer",mr:2}}
          name={user.name}
          src={user.image}
            />
            <Box>
                <Typography>{user.name}</Typography>
                <Typography fontSize="xs">
                    <b>Email: </b>
                    {user.email}
                </Typography>
            </Box>
      </Box>
    );
}

export default UserListItem

