import React from 'react'
import { View, Text, Switch, StyleSheet } from 'react-native'

const SwitchWrapper = ({ title, value, onValueChange, warning }) => {
  return (
    <View>
      <View style={styles.switch}>
        <Text style={styles.switchLabel}>
          {`${title}:`} {value ? 'Yes' : 'No'}
        </Text>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#CC3300', true: '#32CD32' }}
          thumbColor={value ? '#FFF' : '#FFF'}
          ios_backgroundColor="#3e3e3e"
        />
      </View>
      <Text style={styles.warning}>{warning}</Text>
    </View>
  )
}

export default SwitchWrapper

const styles = StyleSheet.create({
  switch: {
    flexDirection: 'row',
    marginTop: 24,
    width: '100%',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center'
  },
  switchLabel: {
    color: '#C4C4C4',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    paddingStart: 8
  },
  warning: {
    color: 'yellow',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    paddingLeft: 10,
    paddingTop: 5
  }
})
