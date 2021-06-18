import React, { useState } from 'react'
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native'
import { WarningIcon, AlertIcon } from '../../assets/icons'

const Input = ({
  placeholderText: placeholderText,
  autoCapitalize: autoCapitalize,
  inputValue: inputValue,
  onChangeText: onChangeText,
  defaultValue,
  label,
  warning,
  alert,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [isDefaultValue, setIsDefaultValue] = useState(defaultValue)
  const handleChangeText = text => {
    setIsDefaultValue(text)
    onChangeText(text)
    if (text.length > 0) {
      setIsFocused(true)
    }
    if (text.length === 0) {
      setIsFocused(false)
    }
    if (isDefaultValue ? isDefaultValue.length === 0 : true) {
      setIsFocused(false)
    }
  }
  const renderLabel = () => {
    return <Text style={styles.label}>{label}</Text>
  }
  const renderModal = (title, message) => {
    Alert.alert(title, message, [
      { text: 'OK', onPress: () => console.log('OK Pressed') }
    ])
  }
  const renderWarning = () => {
    if (warning) {
      return (
        <TouchableOpacity
          style={styles.icon}
          onPress={() => renderModal('Warning', warning)}>
          <Image style={{ width: 30, height: 30 }} source={WarningIcon} />
        </TouchableOpacity>
      )
    }
    return null
  }
  const renderAlert = () => {
    if (alert) {
      return (
        <TouchableOpacity
          style={styles.icon}
          onPress={() => renderModal('Alert', alert)}>
          <Image style={{ width: 30, height: 30 }} source={AlertIcon} />
        </TouchableOpacity>
      )
    }
    return null
  }
  return (
    <View style={styles.textInput}>
      {isDefaultValue ? renderLabel() : isFocused ? renderLabel() : null}
      <TextInput
        key={placeholderText}
        style={styles.input}
        placeholder={placeholderText}
        placeholderTextColor="#c4c4c4"
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        value={inputValue}
        defaultValue={isDefaultValue}
        onChangeText={text => handleChangeText(text)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
      {renderWarning()}
      {renderAlert()}
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    marginTop: 16,
    flexDirection: 'row'
  },
  label: {
    color: '#FF2052',
    marginStart: 10,
    position: 'absolute',
    zIndex: 1,
    top: -4,
    backgroundColor: '#20232A',
    paddingHorizontal: 10
  },
  input: {
    height: 48,
    borderRadius: 10,
    color: '#fff',
    paddingStart: 20,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#EEE',
    flex: 1
  },
  icon: {
    padding: 10,
    color: '#EEE',
    position: 'absolute',
    right: 1,
    top: 3
  }
})

export default Input
