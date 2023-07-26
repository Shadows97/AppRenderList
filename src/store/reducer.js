import {ADD_USER, LOG_USER, LOG_OUT} from './action';

const initialState = {
  users: [],
  user_session: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER: {
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    }
    case LOG_USER: {
      return {
        ...state,
        user_session: action.payload,
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        user_session: null,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
