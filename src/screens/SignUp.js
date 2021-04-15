import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Auth from '../components/Auth'
import { signUpUser, googleSignIn } from '../actions'
import { connect } from 'react-redux'

const SignUp = ({ navigation, signUpUser, googleSignIn }) => {
  const signUp = ({ email, password }) => {
    signUpUser({ email, password })
  }
  const onGoogleButtonPress = () => {
    googleSignIn()
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

export default connect(null, { signUpUser, googleSignIn })(SignUp)
