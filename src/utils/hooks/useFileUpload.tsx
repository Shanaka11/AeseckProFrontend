import { useState, useEffect } from 'react'
import S3 from 'react-aws-s3'

export const config = {
    bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
    region: process.env.REACT_APP_S3_REGION,
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY
}

const ReactS3Client = new S3(config)

const useFileUploadS3 = (onSuccess?: () => void) => {
    const [filePath, setFilePath] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)


    useEffect( () => {
        if(success && filePath){
            if(onSuccess){
                onSuccess()
            }
        }
    }, [success, filePath])

    const handleUpload = (e:any, name?: string) => {
        setLoading(true)

        // if(name){
            ReactS3Client
                .uploadFile(e.target.files[0], name)
                .then((data:any) => {
                    setLoading(false)
                    setFilePath(data.location)
                    setSuccess(true)
                })
                .catch((err:any) => {
                    setLoading(false)
                    setSuccess(false)
                    setError(err)
                    alert(err)
                })
        // }else{

        // }
        // S3FileUpload.uploadFile(e.target.files[0], config)
        // .then((data:any) => {
        //     console.log('success')
        //     console.log(data)
        //     console.log(data.location)
        //     setLoading(false)
        //     setFilePath(data.location)
        // })
        // .catch ((err:any) => {
        //     setLoading(false)
        //     setError(err)
        //     alert(err)
        // })  
    }

    return {filePath, loading, error, success, handleUpload}
}

export default useFileUploadS3
