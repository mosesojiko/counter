import { CREATE_CHAT_FAIL, CREATE_CHAT_REQUEST, CREATE_CHAT_SUCCESS, GET_MY_CHAT_FAIL, GET_MY_CHAT_REQUEST, GET_MY_CHAT_SUCCESS } from "../constants/chatConstants";


//create chat reducer
export const createChatReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_CHAT_REQUEST:
        return { loading: true };

      case CREATE_CHAT_SUCCESS:
        return { loading: false, success: true, };

      case CREATE_CHAT_FAIL:
        return { loading: false, error: action.payload };

      default:
        return state;
    }
}



//get chat reducer
export const getChatsReducer = (state = { myChats: []}, action) => {
    switch (action.type) {
      case GET_MY_CHAT_REQUEST:
        return { loading: true };

      case GET_MY_CHAT_SUCCESS:
        return { loading: false, myChats: action.payload };

      case GET_MY_CHAT_FAIL:
        return { loading: false, error: action.payload };

      default:
        return state;
    }
}