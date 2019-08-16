import axios from 'axios'


export function sessionMiddleware(data) {
  return dispatch => {
    return axios.post('/api/me', data)
  }
}
