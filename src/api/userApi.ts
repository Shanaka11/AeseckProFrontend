// 3rd Party Imports
import axios from 'axios'
// Local Imports
import { config, postConfigJson } from './common'

// This gives contact
export const getUserById = async (id: string) => {
    return axios.get(`${process.env.REACT_APP_SERVER}/contact/getContact?Id=${id}`, config)
}

export const getUserList = async (data: any) => {
    return axios.post(`${process.env.REACT_APP_SERVER}/user/list`, data, postConfigJson)
}

export const getUserFilters = async () => {
    return axios.get(`${process.env.REACT_APP_SERVER}/user/listfilter`, config)
}

export const getUserProfile = async (id:string) => {
    return axios.get(`${process.env.REACT_APP_SERVER}/user/getprofile?userid=${id}`, config)
}

export const postSaveContact = async (data:any) => {
    return axios.post(`${process.env.REACT_APP_SERVER}/contact/save`, data, postConfigJson)
}

export const postRegisterUser = async (data: any) => {
    return axios.post(`${process.env.REACT_APP_SERVER}/user/signup`, data, postConfigJson)
}

export const postLoginUser = async (data: any) => {
    return axios.post(`${process.env.REACT_APP_SERVER}/user/login`, data, postConfigJson)    
}
// This gives user
export const getUserFromId = async (id: string) => {
    return axios.get(`${process.env.REACT_APP_SERVER}/user/getbyid?userId=${id}`, config)
}

export const postDependentUser = async(data: any) => {
    return axios.post(`${process.env.REACT_APP_SERVER}/user/newdependent`, data, postConfigJson)
}