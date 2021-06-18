import {
  FETCH_BLOOD_COUNT_SUCCESS,
  FETCH_BLOOD_COUNT_FAILURE
} from '../actions/types'
import auth from '@react-native-firebase/auth'
import axios from '../api/axios'

export const getBloodCounts = () => {
  return async dispatch => {
    const currentUser = await auth().currentUser
    const email = currentUser.email
    axios
      .post('/getBloodCounts', {
        username: email,
        bloodBankId: 'blofab_blood_bank'
      })
      .then(response => {
        dispatch({
          type: FETCH_BLOOD_COUNT_SUCCESS,
          payload: response.data.data
        })
      })
      .catch(error => {
        console.log(error.message)
        dispatch({ type: FETCH_BLOOD_COUNT_FAILURE })
      })
  }
}
