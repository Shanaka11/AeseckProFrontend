// React Imports
import React, { useEffect, useState } from 'react'
// 3rd Party
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

// Style
const useStyles = makeStyles((theme:Theme)=> ({
}))

const UserDetailPage = () => {
    const classes = useStyles()
    return (
        <UserInfo />
    )
}

export default UserDetailPage
