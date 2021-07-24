// This should be present in an .env file
export const config = {
    headers: {
        'x-Api-key': process.env.REACT_APP_API_KEY
    }    
}

export const postConfigJson = {
    headers: {
        ...config.headers,
        'Content-Type': 'application/json'
    }
}