
import React from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #90c041',
  boxShadow: 24,
  p: 4,
  textAlign: "center",
  borderRadius:"10px"
};


function ProfileModal({ userInfo, children }) {
  
  const [open, setOpen] = React.useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return (
    <>
      {children ? (
        <button onClick={openModal}>{children}</button>

      ) : (
          <IconButton sx={{
             display: { sm:"flex"}
           }} onClick={openModal}>
            <VisibilityIcon />
        </IconButton>
      )}
         
       <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            {userInfo.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             <Box> <img src={userInfo.image} alt={userInfo.name} /></Box>
            <h3>{ userInfo.email }</h3>
          </Typography>
          <Button variant ="outlined" color="error" onClick={closeModal}>Close</Button>
        </Box>
      </Modal>
       
    </>
  )
}

export default ProfileModal


// import React from "react";
// import { IconButton } from "@chakra-ui/button";
// import { ViewIcon } from "@chakra-ui/icons";
// import { useDisclosure } from "@chakra-ui/hooks";
// import { Button } from "@chakra-ui/button";
// import { Image } from "@chakra-ui/react";
// import { Text } from "@chakra-ui/layout";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
// } from "@chakra-ui/react";

// function ProfileModal({ userInfo, children }) {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   return (
//     <>
//       {children ? (
//         <span onClick={onOpen}>{children}</span>
//       ) : (
//         <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
//       )}
//       <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
//         <ModalOverlay />
//         <ModalContent h="400px">
//           <ModalHeader fontIize="40px" d="flex" justifyContent="center" color="white">
//             {userInfo.name}
//           </ModalHeader>
//           <ModalCloseButton />
//                   <ModalBody d="flex" flexDir="column" alignItems="center" justifyContent="space-between">
//                       <Image
//                           borderRadius="full"
//                           boxSize="150px"
//                           src={userInfo.image}
//                           alt={userInfo.name}
//                       />
//                       <Text fontSize={{ base: "18px", md:"22px" }}>
//                           Email: {userInfo.email}
//                       </Text>
//           </ModalBody>

//           <ModalFooter>
//             <Button colorScheme="blue" mr={3} onClick={onClose}>
//               Close
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }

// export default ProfileModal;
