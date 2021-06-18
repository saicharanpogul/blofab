import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import {
  USER_UPDATE,
  USER_FETCH_SUCCESS,
  USER_FETCH_FAILURE,
  RESET_USER_DETAILS
} from './types'
import * as RootNavigation from '../components/RootNavigation'
import axios from '../api/axios'

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
  maritalStatus,
  profileImage,
  isNewUser
}) => {
  const data = {
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
  }
  return dispatch => {
    const currentUser = auth().currentUser
    const email = currentUser.email
    // console.log(profileImage)
    if (profileImage) {
      const fileName = profileImage.fileName
      const imageUri = profileImage.uri
      const reference = storage().ref(
        `/donors/${currentUser.uid}/images/profile/${fileName}`
      )
      reference
        .putFile(imageUri)
        .then(async snap => {
          console.log(snap)
          const url = await storage()
            .ref(`/donors/${currentUser.uid}/images/profile/${fileName}`)
            .getDownloadURL()
          console.log(url)
          firestore()
            .collection('donors')
            .doc(`${currentUser.uid}`)
            .set({ ...data, profileImageUrl: url, isNewUser: 'false' })
            .then(() => {
              console.log('User added!')
              if (isNewUser === 'true') {
                // hyperledger fabric
                axios
                  .post('/registerUser', {
                    username: email
                  })
                  .then(() => {
                    RootNavigation.navigate('Home')
                    dispatch({ type: RESET_USER_DETAILS })
                  })
                  .catch(error => console.log('error: ', error))
              } else {
                RootNavigation.navigate('Home')
                dispatch({ type: RESET_USER_DETAILS })
              }
            })
            .catch(error => console.log('error: ', error))
        })
        .catch(error => console.log('error: ', error))
    } else {
      firestore()
        .collection('donors')
        .doc(`${currentUser.uid}`)
        .set({ ...data, isNewUser: 'false' }, { merge: true })
        .then(() => {
          console.log('User added!')
          if (isNewUser === 'true') {
            // hyperledger fabric
            axios
              .post('/registerUser', {
                username: email
              })
              .then(() => {
                RootNavigation.navigate('Home')
                dispatch({ type: RESET_USER_DETAILS })
              })
              .catch(error => console.log('error: ', error))
          } else {
            RootNavigation.navigate('Home')
            dispatch({ type: RESET_USER_DETAILS })
          }
        })
        .catch(error => console.log('error: ', error))
    }
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
          ...snapshot._data,
          username: currentUser.displayName
            ? currentUser.displayName
            : currentUser.email.split('@')[0]
        }
        dispatch({ type: USER_FETCH_SUCCESS, payload: data })
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: USER_FETCH_FAILURE })
      })
  }
}
