// 3rd Party Imports
import axios from 'axios'
// Local Imports
import { config } from './common'

export const getUserById = async (id: string) => {
    console.log(`User ID: ${id}`)
    return axios.get(`${process.env.REACT_APP_SERVER}/contact/getContact?Id=${id}`, config)
}

export const getUserList = async () => {
    return axios.get(`${process.env.REACT_APP_SERVER}/contact/list?Page=1&PageSize=10`, config)
}