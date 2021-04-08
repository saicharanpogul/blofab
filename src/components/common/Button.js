import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

const Button = ({ title, onButtonPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => onButtonPress()}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 320,
    backgroundColor: '#FF2052',
    height: 55,
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 28,
    borderRadius: 10,
    alignSelf: 'center'
  },
  title: {
    color: '#eee',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    textAlign: 'center'
  }
})

export default Button
