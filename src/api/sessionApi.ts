// 3rd Party Imports
import axios from 'axios'
// Local Imports
import { config, postConfigJson } from './common'

export const getUserStatus = async (ref:string) => {
    return axios.get(`${process.env.REACT_APP_SERVER}/premises/sessionsummary?userReference=${ref}`, config)
}

export const postCheckinPrimary = async (data:any) => {
    return axios.post(`${process.env.REACT_APP_SERVER}/premises/checkinprimary`, data, postConfigJson)
}

export const postCheckoutPrimary = async (data:any) => {
    console.log(data)
    return axios.post(`${process.env.REACT_APP_SERVER}/premises/checkoutprimary`, data, postConfigJson)
}

export const postCheckinDependentuser = async (data: { primaryUserId: number, userId: number, barcode: string}) => {
    return axios.get(`${process.env.REACT_APP_SERVER}/premises/checkindependentuser?primaryUserId=${data.primaryUserId}&dependentUserId=${data.userId}&barcode=${data.barcode}`, config)
}

export const postCheckoutDependentUser = async (data: { userId: number, barcode: string}) => {
    return axios.get(`${process.env.REACT_APP_SERVER}/premises/checoutdependentuser?primaryUserId=${data.userId}&barcode=${data.barcode}`, config)
}

export const postAttachAccessCard = async (data: { sessionId: number, accesscardBarcode: string}) => {
    return axios.post(`${process.env.REACT_APP_SERVER}/premises/attachcard?sessionId=${data.sessionId}&accessCardNumber=${data.accesscardBarcode}`, {}, postConfigJson)
}

export const postDettachAccessCard = async (data: { sessionId: number, accesscardBarcode: string}) => {
    return axios.post(`${process.env.REACT_APP_SERVER}/premises/dettachcard?sessionId=${data.sessionId}&accessCardNumber=${data.accesscardBarcode}`, {}, postConfigJson)
}

export const postSessionList = async (data:any) => {
    return axios.post(`${process.env.REACT_APP_SERVER}/premises/sessionlist`, data, postConfigJson)
}