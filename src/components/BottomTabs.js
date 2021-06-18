import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { Home, Donation, History, Profile } from '../screens'
import {
  HomeIcon,
  HomeActiveIcon,
  DonationIcon,
  DonationActiveIcon,
  HistoryIcon,
  HistoryActiveIcon,
  ProfileIcon,
  ProfileActiveIcon
} from '../assets/icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

const BottomTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: '#000',
          height: 56,
          borderTopColor: '#000'
        },
        activeTintColor: '#FF2052'
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={() => ({
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={focused ? HomeActiveIcon : HomeIcon}
                style={styles.icons}
              />
            )
          }
        })}
      />
      <Tab.Screen
        name="Donation"
        component={Donation}
        options={() => ({
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={focused ? DonationActiveIcon : DonationIcon}
                style={styles.icons}
              />
            )
          }
        })}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={() => ({
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={focused ? HistoryActiveIcon : HistoryIcon}
                style={styles.icons}
              />
            )
          }
        })}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={() => ({
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={focused ? ProfileActiveIcon : ProfileIcon}
                style={styles.icons}
              />
            )
          }
        })}
      />
    </Tab.Navigator>
  )
}

export default BottomTabs

const styles = StyleSheet.create({
  icons: {
    width: 30,
    height: 30
  }
})
