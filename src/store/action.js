export const ADD_USER = 'ADD_USER';
export const LOG_USER = 'LOG_USER';
export const LOG_OUT = 'LOG_OUT';

export const addUser = function (user) {
  return {
    type: ADD_USER,
    payload: user,
  };
};

export const logUser = function (user) {
  return {
    type: LOG_USER,
    payload: user,
  };
};
export const logOut = function () {
  return {
    type: LOG_OUT,
  };
};
