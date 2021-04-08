import React, { useState, useEffect } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { SignUp, SignIn, Home } from './src/screens'
import { NavigationContainer } from '@react-navigation/native'
import { enableScreens } from 'react-native-screens'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './src/reducers'
import auth from '@react-native-firebase/auth'
import firebase from '@react-native-firebase/app'
import ReduxThunk from 'redux-thunk'
import Spinner from 'react-native-loading-spinner-overlay'
import BottomTabs from './src/components/BottomTabs'

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

enableScreens()
const Stack = createNativeStackNavigator()

const App = () => {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()

  useEffect(() => {
    function onAuthStateChanged(user) {
      setUser(user)
      if (initializing) {
        setInitializing(false)
      }
    }
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [initializing])

  if (initializing) {
    return (
      <View style={styles.backgroundStyle}>
        <Spinner
          visible={initializing}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      </View>
    )
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.backgroundStyle}>
        <StatusBar barStyle={'light-content'} />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="SignIn" component={SignIn} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar barStyle={'light-content'} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={BottomTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    flexDirection: 'column'
  },
  spinnerTextStyle: {
    color: '#FFF'
  }
})

export default App
