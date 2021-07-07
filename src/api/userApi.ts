// 3rd Party Imports
import axios from 'axios'
// Local Imports
import { config } from './common'

export const getUserById = async (id: string) => {
    return axios.get(`${process.env.REACT_APP_SERVER}/contact/getContact?Id=${id}`, config)
}

export const getUserList = async () => {
    return axios.get(`${process.env.REACT_APP_SERVER}/contact/list`, config)
}