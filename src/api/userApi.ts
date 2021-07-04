import axios from 'axios'

const server = 'http://aeseckprowebapi-env.eba-j3bdmqdm.ap-southeast-2.elasticbeanstalk.com/api/v1'

export const getUserById = async (id: number) => {

    // const config = {
    //     headers: {
    //         "Access-Control-Allow-Origin" : "*",
    //         "Access-Control-Allow-Credentials" : true        
    //     },
    //   };

    return axios.get(`${server}/contact/getContact?Id=${id}`)

}