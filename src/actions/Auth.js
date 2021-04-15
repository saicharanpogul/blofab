import auth from '@react-native-firebase/auth'
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  RESET_ERROR
} from './types'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  }
}

export const passwordChanged = text => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  }
}

export const signUpUser = ({ email, password }) => {
  console.log(email, password)
  return dispatch => {
    dispatch({ type: LOGIN_USER })
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        dispatch({ type: LOGIN_USER_SUCCESS, payload: user })
        console.log('User account created & signed in!')
      })
      .catch(error => {
        console.log(error)
        if (error.code === 'auth/email-already-in-use') {
          dispatch({
            type: LOGIN_USER_FAIL,
            payload: 'That email address is already in use!'
          })
          console.log('That email address is already in use!')
        }

        if (error.code === 'auth/invalid-email') {
          dispatch({
            type: LOGIN_USER_FAIL,
            payload: 'That email address is invalid!'
          })
          console.log('That email address is invalid!')
        }
        dispatch({
          type: LOGIN_USER_FAIL,
          payload: error.code.slice(5)
        })
        console.error(error.message)
      })
  }
}

export const signInUser = ({ email, password }) => {
  return dispatch => {
    dispatch({ type: LOGIN_USER })
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch({ type: LOGIN_USER_SUCCESS, payload: user })
        console.log('User signed in')
      })
      .catch(error => {
        dispatch({
          type: LOGIN_USER_FAIL,
          payload: error.code.slice(5)
        })
        console.log(error.message)
      })
  }
}

export const googleSignIn = () => {
  GoogleSignin.configure({
    webClientId:
      '429265696578-gp0msk38sdkrr87ot0tnms9oi3g8krhb.apps.googleusercontent.com'
  })
  return async dispatch => {
    dispatch({ type: LOGIN_USER })
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn()

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    // Sign-in the user with the credential
    auth()
      .signInWithCredential(googleCredential)
      .then(user => {
        dispatch({ type: LOGIN_USER_SUCCESS, payload: user })
        console.log('User signed in with Google.')
      })
      .catch(error => {
        dispatch({
          type: LOGIN_USER_FAIL,
          payload: 'Something went wrong!'
        })
        console.log(error.message)
      })
  }
}

export const signOut = () => {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'))
}

export const resetError = () => {
  return dispatch => dispatch({ type: RESET_ERROR })
}
