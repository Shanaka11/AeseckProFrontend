// 3rd Party Imports
import axios from 'axios'
// Local Imports
import { config } from './common'

export const getActivityCenterSummary = async (id:string) => {
    return axios.get(`${process.env.REACT_APP_SERVER}/activitycenter/getsummary?Id=${id}`, config)
}