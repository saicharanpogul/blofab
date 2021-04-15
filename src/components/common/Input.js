import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

const Input = ({
  placeholderText: placeholderText,
  autoCapitalize: autoCapitalize,
  inputValue: inputValue,
  onChangeText: onChangeText,
  ...rest
}) => {
  return (
    <TextInput
      key={placeholderText}
      style={styles.input}
      placeholder={placeholderText}
      placeholderTextColor="#c4c4c4"
      autoCapitalize={autoCapitalize}
      autoCorrect={false}
      value={inputValue}
      onChangeText={onChangeText}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    backgroundColor: '#4D4F55',
    borderRadius: 10,
    marginTop: 16,
    color: '#fff',
    paddingStart: 20
  }
})

export default Input
