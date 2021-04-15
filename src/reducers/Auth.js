import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  RESET_ERROR
} from '../actions/types'

const INITIAL_STATE = {
  email: '',
  password: '',
  currentUser: null,
  error: '',
  loading: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload, error: '' }
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload, error: '' }
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, currentUser: action.payload }
    case LOGIN_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        password: '',
        loading: false
      }
    case LOGIN_USER:
      return { ...state, loading: true, error: '' }
    case RESET_ERROR:
      return { ...state, error: '' }
    default:
      return state
  }
}
