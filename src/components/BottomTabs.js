import React from 'react'
import { Image } from 'react-native'
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
          height: 56
        },
        activeTintColor: '#FF2052'
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={() => ({
          tabBarIcon: ({ focused }) => {
            return (
              <Image source={focused ? HomeActiveIcon : HomeIcon} width="30" />
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
                width="30"
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
                width="30"
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
                width="30"
              />
            )
          }
        })}
      />
    </Tab.Navigator>
  )
}

export default BottomTabs
