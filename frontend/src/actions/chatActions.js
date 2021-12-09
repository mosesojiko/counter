import Axios from 'axios';
import { CREATE_CHAT_FAIL, CREATE_CHAT_REQUEST, CREATE_CHAT_SUCCESS, GET_MY_CHAT_FAIL, GET_MY_CHAT_REQUEST, GET_MY_CHAT_SUCCESS } from '../constants/chatConstants';

// Create a chat
export const createChat = (userId) => async (dispatch, getState) => {
  dispatch({
    type: CREATE_CHAT_REQUEST,
    payload: userId
  });

  //get user info
  const {
    userLogin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.post(`/api/v1/chat`, {userId}, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        dispatch({
          type: CREATE_CHAT_SUCCESS,
          payload: data,
        });
        
    } catch (error) {
        dispatch({
          type: CREATE_CHAT_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
    }
}



// get my chats 
export const getChats = () => async (dispatch, getState) => {
  dispatch({
    type: GET_MY_CHAT_REQUEST
  });

  //get user info
  const {
    userLogin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(`/api/v1/chat`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        dispatch({
          type: GET_MY_CHAT_SUCCESS,
          payload: data,
        });
        
    } catch (error) {
        dispatch({
          type: GET_MY_CHAT_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
    }
}
