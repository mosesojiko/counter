import Axios from 'axios';
import { CREATE_MESSAGE_FAIL, CREATE_MESSAGE_REQUEST, CREATE_MESSAGE_SUCCESS, GET_MY_MESSAGE_FAIL, GET_MY_MESSAGE_REQUEST, GET_MY_MESSAGE_SUCCESS } from "../constants/messageConstants";

// Create a message
export const createMessage = ( content, chatId) => async (dispatch, getState) => {
  dispatch({
    type: CREATE_MESSAGE_REQUEST,
    payload: { content, chatId},
  });

  //get user info
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `/api/v1/message`,
      {  content, chatId },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: CREATE_MESSAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_MESSAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};




// get all messages from a chat 
export const getMessages = (chatId) => async (dispatch, getState) => {
  dispatch({
    type: GET_MY_MESSAGE_REQUEST,
    payload: chatId
  });

  //get user info
  const {
    userLogin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(`/api/v1/message/${chatId}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        dispatch({
          type: GET_MY_MESSAGE_SUCCESS,
          payload: data,
        });
        
    } catch (error) {
        dispatch({
          type: GET_MY_MESSAGE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
    }
}

