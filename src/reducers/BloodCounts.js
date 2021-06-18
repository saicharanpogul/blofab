import {
  FETCH_BLOOD_COUNT_SUCCESS,
  FETCH_BLOOD_COUNT_FAILURE
} from '../actions/types'

const INITIAL_STATE = {
  totalBloodCount: '',
  aPositive: '',
  aNegative: '',
  bPositive: '',
  bNegative: '',
  oPositive: '',
  oNegative: '',
  abPositive: '',
  abNegative: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_BLOOD_COUNT_SUCCESS:
      return { ...state, ...action.payload }
    case FETCH_BLOOD_COUNT_FAILURE:
      return { ...state }
    default:
      return state
  }
}
