import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../actions'
import auth from '@react-native-firebase/auth'
import { Button } from '../components/common'

const Home = () => {
  const onSignOut = () => {
    console.log('User signed out!')
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
  }
  return (
    <View>
      <Text>Home</Text>
      <Button title="SIGN OUT" onButtonPress={() => onSignOut()} />
    </View>
  )
}

const styles = StyleSheet.create({})

export default Home
