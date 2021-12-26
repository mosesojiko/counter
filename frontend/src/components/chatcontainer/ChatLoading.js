import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

function ChatLoading() {
  return (
     
      <Box sx={{ width: "90%" }}>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
    );
}

export default ChatLoading
