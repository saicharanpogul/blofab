import {
  OPT_FOR_DONATION_SUCCESS,
  OPT_FOR_DONATION__FAILURE,
  FORM_VISITED,
  DONATION_APPLIED,
  FETCH_ALL_DONATIONS_SUCCESS,
  FETCH_ALL_DONATIONS_FAILURE
} from '../actions/types'

const INITIAL_STATE = {
  medicalHistory: {
    historyOfBloodTransfusion: '',
    weightMoreThan45: false,
    sleptLastNight: false,
    takingAnyMedicines: '',
    consumedAlcohol: false,
    anyMedicalCondition: ''
  },
  forWomen: {
    abortion: false,
    breastFeeding: false,
    periods: false,
    pregnant: false
  },
  consent: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OPT_FOR_DONATION_SUCCESS:
      return { ...state, ...action.payload }
    case OPT_FOR_DONATION__FAILURE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export const isMedicalFormFilled = (state = { visited: false }, action) => {
  switch (action.type) {
    case FORM_VISITED:
      return { visited: action.payload }
    default:
      return state
  }
}

export const appliedForDonation = (state = { applied: false }, action) => {
  switch (action.type) {
    case DONATION_APPLIED:
      return { applied: action.payload }
    default:
      return state
  }
}

export const fetchAllDonations = (state = [], action) => {
  switch (action.type) {
    case FETCH_ALL_DONATIONS_SUCCESS:
      return [...action.payload]
    case FETCH_ALL_DONATIONS_FAILURE:
      return []
    default:
      return state
  }
}
