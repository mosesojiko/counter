import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

//if its the same sender that is logged in, return 33 margin otherwise return 0 margin
export const isSameSenderMargin = (messages, m, i, userId) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 2;
  else return "auto";
};

//Takes all of our messages, the current message, the index of the current message, and the logged in userId
//proceed if the message is less than the array length, and if the next message is not equal to the current sender
// and if the next message is undefined or not, if the message is not equal to the current logged in user
//Only then, display the image
export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

//takes in the current message array, the index, and the userId
//check if it is the last message of the messages that the guest user has sent
//To know this, the guest user id should !== the logged in user id. then return true or false
export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

//display the sender name
export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

//display everything about the sender
export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

//display both the image and name of the sender
export const getSenderImage = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? <Box sx={{display:"flex", alignItems:"center"}}><Avatar
                  sx={{ 
                  mr:1,
                    width: "20px",
                  height: "20px",
                  cursor:"pointer"
                  }}
                  name={users[1].name}
                  src={users[1].image}
  />{users[1].name}</Box> : <Box sx={{display:"flex", alignItems:"center"}}><Avatar
                  sx={{
                  mr:1,
                    width: "20px",
                  height: "20px",
                  cursor:"pointer"
                  }}
                  name={users[0].name}
                  src={users[0].image}
  />{users[0].name}</Box> ;
}
