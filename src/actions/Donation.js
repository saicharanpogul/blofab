import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import * as RootNavigation from '../components/RootNavigation'
import shortid from 'shortid'
import {
  FORM_VISITED,
  OPT_FOR_DONATION_SUCCESS,
  OPT_FOR_DONATION__FAILURE,
  FETCH_ALL_DONATIONS_SUCCESS,
  FETCH_ALL_DONATIONS_FAILURE
} from './types'
import axios from '../api/axios'

export const setVisited = ({ visited }) => {
  return dispatch => {
    dispatch({ type: FORM_VISITED, payload: visited })
  }
}

export const optForDonation = ({
  medicalHistory,
  womenForm,
  consent,
  bloodGroup,
  donorId,
  gender,
  setIsSubmitted
}) => {
  return dispatch => {
    const currentUser = auth().currentUser
    const email = currentUser.email
    const donationId = shortid.generate()
    if (womenForm) {
      console.log('REACHED 2')
      firestore()
        .collection('donations')
        .doc(`${currentUser.uid}`)
        .collection('_data')
        .doc(donationId)
        .set({
          donationId,
          donorId,
          bloodGroup,
          gender,
          medicalHistory,
          womenForm,
          consent,
          createdAt: firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          console.log('OPTED FOR DONATION.')
          // hyperledger fabric
          axios
            .put('/increment', {
              username: email,
              bloodBankId: 'blofab_blood_bank',
              bloodType: bloodType(bloodGroup)
            })
            .then(() => {
              dispatch({ type: OPT_FOR_DONATION_SUCCESS })
              RootNavigation.navigate('DonationConfirmation')
              setIsSubmitted(false)
            })
            .catch(error => {
              console.log('OPTED_FOR_DONATION_ERROR: ', error.message)
              dispatch({ type: OPT_FOR_DONATION__FAILURE })
              setIsSubmitted(false)
            })
        })
        .catch(error => {
          console.log('OPTED_FOR_DONATION_ERROR: ', error.message)
          dispatch({ type: OPT_FOR_DONATION__FAILURE })
          setIsSubmitted(false)
        })
    } else {
      console.log('REACHED 3')
      firestore()
        .collection('donations')
        .doc(`${currentUser.uid}`)
        .collection('_data')
        .doc(donationId)
        .set({
          donationId,
          donorId,
          bloodGroup,
          gender,
          medicalHistory,
          consent,
          createdAt: firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          console.log('OPTED FOR DONATION.')
          // hyperledger fabric
          axios
            .put('/increment', {
              username: email,
              bloodBankId: 'blofab_blood_bank',
              bloodType: bloodType(bloodGroup)
            })
            .then(() => {
              dispatch({ type: OPT_FOR_DONATION_SUCCESS })
              RootNavigation.navigate('DonationConfirmation')
              setIsSubmitted(false)
            })
            .catch(error => {
              console.log('OPTED_FOR_DONATION_ERROR: ', error.message)
              dispatch({ type: OPT_FOR_DONATION__FAILURE })
              setIsSubmitted(false)
            })
        })
        .catch(error => {
          console.log('OPTED_FOR_DONATION_ERROR: ', error.message)
          dispatch({ type: OPT_FOR_DONATION__FAILURE })
          setIsSubmitted(false)
        })
    }
  }
}

export const getAllDonations = () => {
  return dispatch => {
    const currentUser = auth().currentUser
    let docs
    firestore()
      .collection('donations')
      .doc(`${currentUser.uid}`)
      .collection('_data')
      .onSnapshot(
        snapshot => {
          if (snapshot.docs) {
            docs = snapshot.docs.map(doc => doc.data())
            dispatch({ type: FETCH_ALL_DONATIONS_SUCCESS, payload: docs })
          }
        },
        error => {
          dispatch({
            type: FETCH_ALL_DONATIONS_FAILURE,
            payload: error.message
          })
          console.log('FETCH_ALL_DONATIONS: ', error.message)
        }
      )
  }
}

const bloodType = bloodType => {
  if (bloodType === 'A+') {
    return 'APositive'
  }
  if (bloodType === 'A-') {
    return 'ANegative'
  }
  if (bloodType === 'B+') {
    return 'BPositive'
  }
  if (bloodType === 'B-') {
    return 'BNegative'
  }
  if (bloodType === 'O+') {
    return 'OPositive'
  }
  if (bloodType === 'O-') {
    return 'BNegative'
  }
  if (bloodType === 'AB+') {
    return 'ABPositive'
  }
  if (bloodType === 'AB-') {
    return 'ABNegative'
  }
}
