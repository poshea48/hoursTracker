import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode'

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
  return {
    type: GET_ERRORS,
    payload: userData
  }

}

// login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // save token in local storage
      const { token } = res.data
      localStorage.setItem('jwtTokenHoursTracker', token)
      // set token to auth header
      setAuthToken(token);
      // decode token to get user data
      const decoded = jwt_decode(token)
      dispatch(setCurrentUser(decoded))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

//log user out
export const logoutUser = () => dispatch => {
  //Remove token from localStorage
  localStorage.removeItem('jwtTokenHoursTracker')
  setAuthToken(false)
  dispatch(setCurrentUser({}))
}

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}
