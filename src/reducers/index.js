import { combineReducers } from 'redux'
import Auth from './Auth'
import User from './User'
import UserData from './UserData'

export default combineReducers({
  auth: Auth,
  user: User,
  userData: UserData
})
