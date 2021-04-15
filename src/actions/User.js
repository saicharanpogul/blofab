import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import {
  USER_UPDATE,
  ADD_USER,
  USER_FETCH_SUCCESS,
  USER_FETCH_FAIL,
  UPDATE_USER,
  RESET_USER_DETAILS
} from './types'
import * as RootNavigation from '../components/RootNavigation'

export const userUpdate = ({ prop, value }) => {
  return {
    type: USER_UPDATE,
    payload: { prop, value }
  }
}

export const userCreate = ({
  bloodGroup,
  firstName,
  lastName,
  careOf,
  address,
  dateOfBirth,
  age,
  contactNumber,
  gender,
  weight,
  education,
  occupation,
  maritalStatus
}) => {
  const data = {
    bloodGroup: bloodGroup.value,
    firstName,
    lastName,
    careOf,
    address,
    dateOfBirth,
    age,
    contactNumber,
    gender: gender.value,
    weight,
    education,
    occupation,
    maritalStatus: maritalStatus.value
  }
  return dispatch => {
    const currentUser = auth().currentUser
    firestore()
      .collection('donors')
      .doc(`${currentUser.uid}`)
      .set(data)
      .then(() => {
        console.log('User added!')
        RootNavigation.navigate('Home')
        dispatch({ type: RESET_USER_DETAILS })
      })
      .catch(error => console.log('error: ', error))
  }
}

export const userGet = () => {
  return dispatch => {
    const currentUser = auth().currentUser
    firestore()
      .collection('donors')
      .doc(`${currentUser.uid}`)
      .get()
      .then(snapshot => {
        const data = {
          userID: currentUser.uid.slice(0, 5),
          ...snapshot._data
        }
        dispatch({ type: USER_FETCH_SUCCESS, payload: data })
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: USER_FETCH_FAIL })
      })
  }
}
