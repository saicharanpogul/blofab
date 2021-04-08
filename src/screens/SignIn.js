import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Auth from '../components/Auth'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

export default function SignIn({ navigation }) {
  const onSignIn = (email, password) => {
    console.log(password)
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User signed in')
      })
      .catch(error => {
        console.log(error.message)
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
      title="Login"
      subTitle="Enter your credentials here."
      buttonText="SIGN IN"
      text="Don't have a account? "
      actionText="Sign Up"
      navigator={() => navigation.navigate('SignUp')}
      onSubmit={onSignIn}
      onGoogleButtonPress={onGoogleButtonPress}
    />
  )
}

const styles = StyleSheet.create({})
