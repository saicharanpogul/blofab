import { USER_UPDATE, RESET_USER_DETAILS, GET_USER } from '../actions/types'

const INITIAL_USER_DATA = {
  bloodGroup: 'A+',
  firstName: null,
  lastName: null,
  careOf: null,
  address: null,
  dateOfBirth: null,
  age: null,
  contactNumber: null,
  gender: 'Male',
  weight: null,
  education: null,
  occupation: null,
  maritalStatus: 'Single',
  profileImage: null
}

export default (state = INITIAL_USER_DATA, action) => {
  // action.payload === { prop: 'firstName', value: 'Saicharan' }
  switch (action.type) {
    case USER_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value }
    case RESET_USER_DETAILS:
      return { ...INITIAL_USER_DATA }
    case GET_USER:
      return { payload: action.payload }
    default:
      return state
  }
}
