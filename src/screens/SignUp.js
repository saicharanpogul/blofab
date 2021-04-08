import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Auth from '../components/Auth'
import auth from '@react-native-firebase/auth'
import {
  GoogleSignin,
  statusCodes
} from '@react-native-google-signin/google-signin'

export default function SignUp({ navigation }) {
  const signUp = (email, password) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!')
        // navigation.navigate('Home')
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!')
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!')
        }

        console.error(error)
      })
  }
  GoogleSignin.configure({
    webClientId:
      '429265696578-gp0msk38sdkrr87ot0tnms9oi3g8krhb.apps.googleusercontent.com'
  })
  const onGoogleButtonPress = async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn()

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    // Sign-in the user with the credential
    auth()
      .signInWithCredential(googleCredential)
      .then(() => {
        console.log('User signed in.')
      })
      .catch(error => {
        console.log(error.message)
      })
  }
  return (
    <Auth
      title="Welcome!"
      subTitle="Sign Up to continue."
      buttonText="SIGN UP"
      text="Already have an account? "
      actionText="Sign In"
      navigator={() => navigation.navigate('SignIn')}
      onSubmit={signUp}
      onGoogleButtonPress={onGoogleButtonPress}
    />
  )
}

const styles = StyleSheet.create({})
