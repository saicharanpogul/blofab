import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import welcome from '../assets/images/welcome.png'
import google from '../assets/images/google.png'
import { Button, Input } from '../components/common/'

import { Divider } from 'react-native-paper'

export default function Auth({
  title,
  subTitle,
  buttonText,
  text,
  actionText,
  navigator,
  onSubmit,
  onGoogleButtonPress
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const auth = () => {
    onSubmit(email, password)
    // setEmail('')
    // setPassword('')
  }
  return (
    <View style={styles.backgroundStyle}>
      <Image style={styles.image} source={welcome} />
      <View style={styles.backgroundView}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
        <Input
          placeholderText="Email"
          autoCapitalize="none"
          inputValue={email}
          onChangeText={setEmail}
        />
        <Input
          placeholderText="Password"
          autoCapitalize="none"
          inputValue={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View style={styles.dividerView}>
          <Divider style={styles.divider} />
          <Text style={styles.dividerText}>OR</Text>
          <Divider style={styles.divider} />
        </View>
        <Button title={buttonText} onButtonPress={auth} />
        <View style={styles.signUpOptions}>
          <TouchableOpacity
            onPress={() =>
              onGoogleButtonPress()
                .then(() => console.log('Signed in with Google!'))
                .catch(error => {
                  console.log(error.message)
                })
            }>
            <Image source={google} />
          </TouchableOpacity>
        </View>
        <View style={styles.signInView}>
          <Text style={styles.signInText}>{text}</Text>
          <TouchableOpacity onPress={() => navigator()}>
            <Text style={styles.signIn}>{actionText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: '#20232A',
    flexDirection: 'column'
  },
  backgroundView: {
    marginHorizontal: 36,
    flex: 1
  },
  image: { width: '100%' },
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
  signInView: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    marginVertical: 100
  },
  signInText: {
    color: '#EEE',
    fontSize: 16,
    fontFamily: 'Poppins-Regular'
  },
  signIn: {
    color: '#FF2052',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold'
  }
})
