import { USER_FETCH_FAILURE, USER_FETCH_SUCCESS } from '../actions/types'

const INITIAL_STATE = {
  userID: '',
  bloodGroup: '',
  firstName: '',
  lastName: '',
  careOf: '',
  address: '',
  dateOfBirth: '',
  age: '',
  contactNumber: '',
  gender: '',
  weight: '',
  education: '',
  occupation: '',
  maritalStatus: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_FETCH_SUCCESS:
      return action.payload
    case USER_FETCH_FAILURE:
      return { ...INITIAL_STATE }
    default:
      return state
  }
}
