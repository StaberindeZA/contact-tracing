import { ADD_USER, SET_AUTH } from './actionTypes';

export const addUser = content => ({
  type: ADD_USER,
  payload: content
});

export const setAuth = isAuthenticated => ({
  type: SET_AUTH,
  isAuthenticated
});