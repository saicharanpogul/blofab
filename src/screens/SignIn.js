import React from 'react'
import { StyleSheet } from 'react-native'
import Auth from '../components/Auth'
import { signInUser, googleSignIn } from '../actions'
import { connect } from 'react-redux'

const SignIn = ({ navigation, signInUser, googleSignIn }) => {
  const onSignIn = ({ email, password }) => {
    signInUser({ email, password })
  }

  const onGoogleButtonPress = () => {
    googleSignIn()
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
      onForgotPasswordPress={() => navigation.navigate('ForgotPassword')}
    />
  )
}

const styles = StyleSheet.create({})

export default connect(null, { signInUser, googleSignIn })(SignIn)
