import axios from 'axios'

import { LOGIN_SUCCESS, LOGIN_FAIL, SIGNUP_SUCCESS, SIGNUP_FAIL, LOGOUT } from './types'

export function login(data) {
  return dispatch => {
    axios.post('/api/login', data)
        .then((res) => {
          if (res.data.success) {
            dispatch({
              type: LOGIN_SUCCESS,
              payload: res.data.user
            })
          } else if (res.data.errors) {
            dispatch({
              type: LOGIN_FAIL,
              payload: res.data.errors
            })
          }
        })
        .catch(() => {
          dispatch({
            type: LOGIN_FAIL,
            payload: 'Login Failed'
          })
        })
  }
}

export function signUp(data) {
  return dispatch => {
    axios.post('/api/signUp', data)
        .then((res) => {
          if (res.data.success) {
            dispatch({
              type: SIGNUP_SUCCESS,
              payload: res.data.user
            })
          } else if (res.data.errors) {
            dispatch({
              type: SIGNUP_FAIL,
              payload: res.data.errors
            })
          }
        })
        .catch(() => {
          dispatch({
            type: SIGNUP_FAIL,
            payload: 'Sign Up Failed'
          })
        })
  }
}

export function logout() {
  return dispatch => {
    axios.post('/api/logout')
        .then(res => {
          if (res.status) {
            dispatch({
              type: LOGOUT
            })
          }
        })
  }
}
