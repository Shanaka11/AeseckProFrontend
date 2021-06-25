import React from 'react'
// 3rd Party
// Material UI Imports
import { 
    Button,
    Container,
    Grid, 
    makeStyles,
    Theme,
    Typography,
} from '@material-ui/core'
// Local Imports
import UserInfo from './UserInfo'
import ConnectedUserInfo from './ConnectedUserInfo'

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    container:{        
        height: '100%',
        backgroundColor: theme.palette.primary.light
    },
    subContainer: {
        marginTop: 12,
        marginBottom: 12,
    },
}))

const User = () => {
    // Styles
    const classes = useStyles()
    return (
        <Grid container className={classes.container}>
            <Grid item xs={12}>
                <Container className={classes.subContainer}>
                    <Typography variant='h6' color='textPrimary' >
                        Welcome (Username)
                    </Typography>
                    <UserInfo />
                    <ConnectedUserInfo />
                    <ConnectedUserInfo />
                    <ConnectedUserInfo />
                </Container>
            </Grid> 
        </Grid>
    )
}

export default User