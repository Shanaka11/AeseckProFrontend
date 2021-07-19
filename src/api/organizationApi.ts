// 3rd Party Imports
import axios from 'axios'
// Local Imports
import { config } from './common'

export const getOrganizationSummary = async () => {
    return axios.get(`${process.env.REACT_APP_SERVER}/organization/getsummary?Id=1`, config)
}