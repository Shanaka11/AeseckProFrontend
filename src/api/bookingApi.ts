// 3rd Party Imports
import axios from 'axios'
// Local Imports
import { config, postConfigJson } from './common'

// id = Activity Center Id
export const getPackages = async (id:string) => {
    return axios.get(`${process.env.REACT_APP_SERVER}/bookings/getpackages?Id=${id}`, config)
}

export const getBookingCalenderDetails = async (data: any) => {
    return axios.post(`${process.env.REACT_APP_SERVER}/bookings/calander`, data, postConfigJson)
}

export const makeBooking = async (data:any) => {
    return axios.post(`${process.env.REACT_APP_SERVER}/bookings/save`, data, postConfigJson)
}

export const getBookingList = async (data:any) => {
    return axios.post(`${process.env.REACT_APP_SERVER}/bookings/list`, data, postConfigJson)
}

export const getBookingFilter = async (id:number) => {
    return axios.get(`${process.env.REACT_APP_SERVER}/bookings/bookingfilters?ActivityCenterId=${id}`, config)
}

export const changeStatus = async (data:any) => {
    return axios.post(`${process.env.REACT_APP_SERVER}/bookings/updatestatus`, data, postConfigJson)
}

export const postBookingList = async (data:any) => {
    return axios.post(`${process.env.REACT_APP_SERVER}/bookings/list`, data, postConfigJson)
}