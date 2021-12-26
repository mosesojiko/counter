import React from 'react'
import Box from '@mui/material/Box';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

function UserBadgeItem({user, handleFunction}) {
    return (
       
        <Box
            sx={{
                px: 2,
                py: 1,
                borderRadius: "40px",
                m: 1,
                mb: 2,
                fontSize: "12px",
                backgroundColor: "#023c3f",
                color: "white",
                cursor:"pointer"
            }}
            onClick={handleFunction}
        >
            {user.name}
            <CancelPresentationIcon sx={{ pl: 2 }}/>
        </Box>
    )
}

export default UserBadgeItem
