import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

const Chip = ({ title, icon, style }) => {
  return (
    <View style={[styles.chip, style]}>
      <Image style={styles.chipIcon} source={icon} />
      <Text style={styles.chipTitle}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    backgroundColor: '#15171C',
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 4
  },
  chipIcon: {
    width: 20,
    height: 20
  },
  chipTitle: {
    color: '#EEE',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginLeft: 8
  }
})

export default Chip
