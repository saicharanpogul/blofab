import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { backgroundStyle } from '../components/Styles'

const History = () => {
  return (
    <View style={styles.backgroundStyle}>
      <Text>History</Text>
    </View>
  )
}

export default History

const styles = StyleSheet.create({
  backgroundStyle: { ...backgroundStyle }
})
