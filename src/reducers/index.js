import { combineReducers } from 'redux'
import Auth from './Auth'
import User from './User'
import UserData from './UserData'
import OptForDonation, {
  isMedicalFormFilled,
  fetchAllDonations
} from './Donation'
import BloodCounts from './BloodCounts'

const allReducers = Object.assign(
  { auth: Auth },
  { user: User },
  { userData: UserData },
  { optForDonation: OptForDonation },
  { isMedicalFormFilled },
  { fetchAllDonations },
  { bloodCounts: BloodCounts }
)

export default combineReducers(allReducers)
