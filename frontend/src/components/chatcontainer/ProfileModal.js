import React from "react";
import { IconButton } from "@chakra-ui/button";
import { ViewIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/hooks";
import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/react";
import { Text } from "@chakra-ui/layout";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function ProfileModal({ userInfo, children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="400px">
          <ModalHeader fontIize="40px" d="flex" justifyContent="center" color="white">
            {userInfo.name}
          </ModalHeader>
          <ModalCloseButton />
                  <ModalBody d="flex" flexDir="column" alignItems="center" justifyContent="space-between">
                      <Image
                          borderRadius="full"
                          boxSize="150px"
                          src={userInfo.image}
                          alt={userInfo.name}
                      />
                      <Text fontSize={{ base: "18px", md:"22px" }}>
                          Email: {userInfo.email}
                      </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileModal;
