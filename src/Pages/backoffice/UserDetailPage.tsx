// React Imports
import React, { useEffect, useState } from 'react'
// 3rd Party
import { useQuery } from 'react-query'
import axios from 'axios'
import { AxiosResponse } from 'axios'
// Material UI Imports
import { 
    Button,
    Grid, 
    makeStyles,
    TextField,
    Theme,
    Typography,
} from '@material-ui/core'
// Local Imports
import UserInfo from '../../componets/backoffice/user/UserInfo'

import { getUserById } from '../../api/userApi'

// Style
const useStyles = makeStyles((theme:Theme)=> ({
}))

const UserDetailPage = () => {
    // Styles
    const classes = useStyles()

    // Query
    const { data, error, isLoading, isError } = useQuery('UserInfo', () => getUserById(5))

    return (
        <>
        {
            isError ? <p>error</p> :<UserInfo />
        }
        </>
    )
}

export default UserDetailPage
