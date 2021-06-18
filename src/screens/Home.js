import React, { useState, useEffect, useCallback } from 'react'
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import auth from '@react-native-firebase/auth'
import { Button } from '../components/common'
import { backgroundStyle } from '../components/Styles'
import { userGet, getBloodCounts } from '../actions'
import { LogOutIcon, LogOutActiveIcon } from '../assets/icons'

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

const Stat = ({ styles, number, title }) => {
  return (
    <View style={styles.stat}>
      <Text style={styles.number}>{number}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const Home = ({
  navigation,
  userGet,
  getBloodCounts,
  firstName,
  username,
  totalBloodCount,
  aPositive,
  aNegative,
  bPositive,
  bNegative,
  oPositive,
  oNegative,
  abPositive,
  abNegative
}) => {
  const [refreshing, setRefreshing] = useState(false)
  useEffect(() => {
    userGet()
    getBloodCounts()
  }, [refreshing, userGet, getBloodCounts])
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])
  const onSignOut = () => {
    console.log('User signed out!')
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
  }
  return (
    <ScrollView
      style={styles.backgroundStyle}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.header}>
        <View style={styles.greeting}>
          <Text style={styles.welcome}>Welcome Back</Text>
          <Text style={styles.username}>
            {firstName ? firstName : username}
          </Text>
        </View>
        <TouchableOpacity onPress={() => onSignOut()}>
          <Image style={styles.logout} source={LogOutIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.total}>
        <Stat styles={styles} number={totalBloodCount || '0'} title="Total" />
      </View>
      <View style={styles.bloodTypes}>
        <Stat styles={styles} number={aPositive || '0'} title="A+" />
        <Stat styles={styles} number={aNegative || '0'} title="A-" />
        <Stat styles={styles} number={bPositive || '0'} title="B+" />
        <Stat styles={styles} number={bNegative || '0'} title="B-" />
        <Stat styles={styles} number={oPositive || '0'} title="O+" />
        <Stat styles={styles} number={oNegative || '0'} title="O-" />
        <Stat styles={styles} number={abPositive || '0'} title="AB+" />
        <Stat styles={styles} number={abNegative || '0'} title="AB-" />
      </View>
      {/* <Button title="SIGN OUT" onButtonPress={() => onSignOut()} /> */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  backgroundStyle: { ...backgroundStyle },
  header: {
    margin: 16,
    marginHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  greeting: {},
  welcome: {
    marginBottom: 0,
    color: '#A4A4A4',
    fontSize: 16,
    fontFamily: 'Poppins-Regular'
  },
  logout: {
    width: 35,
    height: 35,
    top: -16
  },
  username: {
    marginBottom: 16,
    color: '#FF2052',
    fontSize: 28,
    fontFamily: 'Poppins-SemiBold'
  },
  stat: {
    margin: 24,
    width: 80,
    backgroundColor: '#15171C',
    borderRadius: 10,
    padding: 4
  },
  number: {
    color: '#FFCC00',
    fontSize: 38,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center'
  },
  title: {
    color: '#EEE',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center'
  },
  total: {
    display: 'flex',
    alignItems: 'center'
  },
  bloodTypes: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})

const mapStateToProps = ({ userData, bloodCounts }) => {
  const { firstName, username } = userData
  const {
    totalBloodCount,
    aPositive,
    aNegative,
    bPositive,
    bNegative,
    oPositive,
    oNegative,
    abPositive,
    abNegative
  } = bloodCounts
  return {
    firstName,
    username,
    totalBloodCount,
    aPositive,
    aNegative,
    bPositive,
    bNegative,
    oPositive,
    oNegative,
    abPositive,
    abNegative
  }
}

export default connect(mapStateToProps, { userGet, getBloodCounts })(Home)
