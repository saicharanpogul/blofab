import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { backgroundStyle } from '../components/Styles'
import LottieView from 'lottie-react-native'
import { Confirmation } from '../assets/lottie'

const DonationConfirmation = ({ navigation }) => {
  return (
    <View style={styles.backgroundStyle}>
      <View style={styles.confirm}>
        <LottieView
          style={styles.lottie}
          source={Confirmation}
          autoPlay
          loop={false}
        />
        <Text style={styles.message}>Applied for donation successfully</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.goBack()
          }}>
          <Text style={styles.buttonTitle}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default DonationConfirmation

const styles = StyleSheet.create({
  backgroundStyle: { ...backgroundStyle },
  confirm: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  lottie: {
    width: 200,
    height: 200,
    alignSelf: 'center'
  },
  message: {
    color: '#1EB871',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginTop: -48,
    marginBottom: 16
  },
  button: {
    borderWidth: 2,
    borderColor: '#1EB871',
    padding: 10,
    width: 80,
    borderRadius: 10,
    alignSelf: 'center'
  },
  buttonTitle: {
    color: '#EEE',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold'
  }
})
