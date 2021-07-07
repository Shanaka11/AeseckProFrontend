// React Imports
import React, { useEffect, useState } from 'react'
// 3rd Party
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
// Material UI Imports
import { 
    Button,
    Grid, 
    makeStyles,
    TextField,
    Theme,
    Typography,
    CircularProgress
} from '@material-ui/core'
// Local Imports
import UserInfo from '../../componets/backoffice/user/UserInfo'
import errorHandler from '../../utils/errorHandler'
import { getUserById } from '../../api/userApi'

// interfaces
interface Params {
    id: string
}

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    loaderContainer: {
        height: 'calc(100vh - 74px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))

const UserDetailPage = () => {
    // Styles
    const classes = useStyles()

    // Router
    const params = useParams<Params>()

    // Query
    const { data, error, isLoading, isError } = useQuery('UserInfo', () => getUserById(params.id))    
    
    if(isLoading){
        return (
            <div className={classes.loaderContainer}>
                <CircularProgress />
            </div>
            )
    }

    return (
        <>
        {
            <UserInfo data={data?.data.response} error={errorHandler(error, data?.data.response ? undefined : 'User Does Not Exist')} loading={isLoading}/>
        }
        </>
    )
}

export default UserDetailPage
