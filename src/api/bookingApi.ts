// 3rd Party Imports
import axios from 'axios'
// Local Imports
import { config } from './common'

// Activity Center Id
export const getPackages = async (id:string) => {
    return axios.get(`${process.env.REACT_APP_SERVER}/bookings/getpackages?Id=${id}`, config)
}