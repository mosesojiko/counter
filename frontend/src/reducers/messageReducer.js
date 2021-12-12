import { CREATE_MESSAGE_FAIL, CREATE_MESSAGE_REQUEST, CREATE_MESSAGE_SUCCESS, GET_MY_MESSAGE_FAIL, GET_MY_MESSAGE_REQUEST, GET_MY_MESSAGE_SUCCESS } from "../constants/messageConstants";

//create message reducer
export const createMessageReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_MESSAGE_REQUEST:
      return { loading: true };

    case CREATE_MESSAGE_SUCCESS:
      return { loading: false, success: true, messages: action.payload };

    case CREATE_MESSAGE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};



//get all message reducer
export const getMessageReducer = (state = { myMessages: []}, action) => {
    switch (action.type) {
      case GET_MY_MESSAGE_REQUEST:
        return { loading: true };

      case GET_MY_MESSAGE_SUCCESS:
        return { loading: false, myMessages: action.payload };

      case GET_MY_MESSAGE_FAIL:
        return { loading: false, error: action.payload };

      default:
        return state;
    }
}
