export interface errorHandlerResp {
    isError: Boolean,
    message: string,
}

export const errorHandler = (error:unknown, message:string|undefined) => { 
    if (error instanceof Error) {
        return {
            isError: true,
            message: error.message,
        }
    }    
    if ( message ) {
        return {
            isError: true,
            message: message,
        }
    }

    return {
        isError: false,
        message: '',        
    }
}

export default errorHandler