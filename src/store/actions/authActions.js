import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import jwtDecode from "jwt-decode";

import setAuthToken from "../../utils/setAuthToken";
import { GET_ERRORS, SET_CURRENT_USER, REGISTER } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("http://192.168.100.32:5000/user/register", userData)
    .then(res => dispatch({ type: REGISTER, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Get Login User Toke
export const loginUser = userData => dispatch => {
  axios
    .post("http://192.168.100.32:5000/user/login", userData)
    .then(res => {
      const { token } = res.data;
      try {
        AsyncStorage.setItem("jwtToken", token);
      } catch (err) {
        alert("error in adding token");
      }
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Set Logged In User
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log User Out
export const logoutUser = () => dispatch => {
  try {
    AsyncStorage.removeItem("jwtToken");
  } catch (err) {
    alert("error in reomiving token");
  }
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
