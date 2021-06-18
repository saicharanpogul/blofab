import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { backgroundStyle } from '../components/Styles'
import { Input, Button } from '../components/common'
import auth from '@react-native-firebase/auth'
import Toast from 'react-native-simple-toast'

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const forgotPassword = () => {
    if (!email) {
      Toast.show('Please enter registered email.', Toast.LONG)
      return
    }
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Toast.show(
          'Check your email for reset password instructions.',
          Toast.LONG
        )
        setEmail('')
        navigation.navigate('SignIn')
      })
      .catch(error => {
        Toast.show(error.message, Toast.LONG)
      })
  }
  return (
    <View style={styles.backgroundStyle}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.description}>
        Enter the email associated with your account and we'll send an email
        with instructions to reset your password.
      </Text>
      <Input
        placeholderText="Email"
        inputValue={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Button title="Reset Password" onButtonPress={forgotPassword} />
    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
  backgroundStyle: {
    ...backgroundStyle,
    paddingHorizontal: 24
  },
  title: {
    color: '#EEE',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    marginTop: 16
  },
  description: {
    color: '#C4C4C4',
    marginTop: 16,
    fontSize: 16
  }
})
