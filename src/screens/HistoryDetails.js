import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const HistoryDetails = ({ route }) => {
  return (
    <View>
      <Text>{route.params.item.donationId}</Text>
    </View>
  )
}

export default HistoryDetails

const styles = StyleSheet.create({})
