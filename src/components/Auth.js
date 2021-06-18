import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native'
import { Welcome, Google } from '../assets/images/'
import { Button, Input, Spinner } from '../components/common/'
import { backgroundStyle } from '../components/Styles'
import { Divider } from 'react-native-paper'
import { connect } from 'react-redux'
import { emailChanged, passwordChanged, resetError } from '../actions'
import Toast from 'react-native-simple-toast'

const Auth = ({
  title,
  subTitle,
  buttonText,
  text,
  actionText,
  navigator,
  onSubmit,
  onGoogleButtonPress,
  onForgotPasswordPress,
  emailChanged,
  email,
  passwordChanged,
  password,
  error,
  loading,
  resetError
}) => {
  const auth = () => {
    if (email && password) {
      return onSubmit({ email, password })
    }
    Toast.show('Email and Password are required.', Toast.LONG)
  }
  const renderButton = () => {
    if (loading) {
      return <Spinner size="large" />
    }
    return <Button title={buttonText} onButtonPress={auth} />
  }
  const renderError = () => {
    if (error) {
      return Alert.alert('Authentication Error.', error, [
        {
          text: 'Cancel',
          onPress: () => resetError(),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => resetError() }
      ])
    }
  }
  const renderForgotPassword = () => {
    return (
      <TouchableOpacity onPress={() => onForgotPasswordPress()}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.backgroundStyle}>
      <Image style={styles.image} source={Welcome} />
      <View style={styles.backgroundView}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
        <Input
          placeholderText="Email"
          autoCapitalize="none"
          inputValue={email}
          onChangeText={value => emailChanged(value)}
          label="Email"
          defaultValue=""
        />
        <Input
          placeholderText="Password"
          autoCapitalize="none"
          inputValue={password}
          onChangeText={value => passwordChanged(value)}
          secureTextEntry
          label="Password"
          defaultValue=""
        />
        {renderButton()}
        {buttonText === 'SIGN IN' ? renderForgotPassword() : null}
        {renderError()}
        <View style={styles.dividerView}>
          <Divider style={styles.divider} />
          <Text style={styles.dividerText}>OR</Text>
          <Divider style={styles.divider} />
        </View>
        <View style={styles.signUpOptions}>
          <TouchableOpacity onPress={() => onGoogleButtonPress()}>
            <Image style={{ width: 40, height: 40 }} source={Google} />
          </TouchableOpacity>
        </View>
        <View style={styles.actionView}>
          <Text style={styles.actionDescription}>{text}</Text>
          <TouchableOpacity onPress={() => navigator()}>
            <Text style={styles.actionText}>{actionText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundStyle: { ...backgroundStyle },
  backgroundView: {
    marginHorizontal: 36,
    flex: 1
  },
  image: {
    width: '100%',
    height: 232,
    resizeMode: 'contain'
  },
  title: {
    color: '#eee',
    fontSize: 36,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center'
  },
  subTitle: {
    color: '#eee',
    fontFamily: 'Poppins-SemiBold',
    marginTop: 4,
    textAlign: 'center'
  },
  input: {
    height: 48,
    backgroundColor: '#4D4F55',
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 10,
    color: '#fff'
  },
  button: {
    backgroundColor: '#FF2052',
    height: 55,
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 28,
    borderRadius: 10
  },
  buttonText: {
    color: '#eee',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    textAlign: 'center'
  },
  forgotPassword: {
    color: '#EEE',
    marginTop: 16,
    textAlign: 'right'
  },
  dividerView: {
    marginTop: 20,
    flexDirection: 'row',
    height: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  divider: {
    backgroundColor: '#c4c4c4',
    width: 140,
    height: 4
  },
  dividerText: {
    color: '#eee',
    fontSize: 8
  },
  signUpOptions: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-evenly'
  },
  actionView: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center'
  },
  actionDescription: {
    color: '#EEE',
    fontSize: 16,
    fontFamily: 'Poppins-Regular'
  },
  actionText: {
    color: '#FF2052',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold'
  }
})

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth
  return { email, password, error, loading }
}

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  resetError
})(Auth)
