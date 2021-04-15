import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { backgroundStyle } from '../components/Styles'

const Donation = () => {
  return (
    <View style={styles.backgroundStyle}>
      <Text>Donation</Text>
    </View>
  )
}

export default Donation

const styles = StyleSheet.create({
  backgroundStyle: { ...backgroundStyle }
})
