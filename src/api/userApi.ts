// 3rd Party Imports
import axios from 'axios'
// Local Imports
import { config } from './common'

export const getUserById = async (id: string) => {
    return axios.get(`${process.env.REACT_APP_SERVER}/contact/getContact?Id=${id}`, config)
}

export const getUserList = async (page: number) => {
    return axios.get(`${process.env.REACT_APP_SERVER}/contact/list?Page=${page}&PageSize=5`, config)
}