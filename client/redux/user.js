import { LOGIN_SUCCESS, LOGIN_FAIL, SIGNUP_SUCCESS, SIGNUP_FAIL, LOGOUT } from '../actions/types'

const INITIAL_STATE= {
    user: null,
    error: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {user: action.payload}
        case LOGIN_FAIL:
            return { error: action.payload }
        case SIGNUP_SUCCESS:
            return {user: action.payload}
        case SIGNUP_FAIL:
            return { error: action.payload }
        case LOGOUT:
            return { user: null, error: '' }
        default:
            return state;
    }
}