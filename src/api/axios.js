import axios from 'axios'
import { Platform } from 'react-native'

const host = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2'

export default axios.create({
  baseURL: `http://${host}:7080/`,
  headers: {
    'content-type': 'application/json'
  },
  data: {}
})
