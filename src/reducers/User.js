import {
  USER_UPDATE,
  RESET_USER_DETAILS,
  ADD_USER,
  GET_USER,
  UPDATE_USER
} from '../actions/types'

const INITIAL_USER = {
  bloodGroup: {
    key: '1',
    label: 'A+',
    value: 'A+'
  },
  firstName: '',
  lastName: '',
  careOf: '',
  address: '',
  dateOfBirth: '',
  age: '',
  contactNumber: '',
  gender: {
    key: '1',
    label: 'Male',
    value: 'male'
  },
  weight: '',
  education: '',
  occupation: '',
  maritalStatus: {
    key: '1',
    label: 'Single',
    value: 'single'
  }
}

export default (state = INITIAL_USER, action) => {
  // action.payload === { prop: 'firstName', value: 'Saicharan }
  switch (action.type) {
    case USER_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value }
    case RESET_USER_DETAILS:
      return { ...INITIAL_USER }
    case GET_USER:
      console.log(action.payload)
      return { payload: action.payload }
    default:
      return state
  }
}
