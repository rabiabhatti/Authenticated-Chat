import axios from 'axios'

export function logoutAction(data) {
  return dispatch => {
    return axios.post('/api/logout', data)
  }
}
