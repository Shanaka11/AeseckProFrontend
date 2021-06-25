import React from 'react'
// 3rd Party
// Material UI Imports
import { 
    Button,
    Grid, 
    makeStyles,
    Theme,
    Typography,
} from '@material-ui/core'
// Local Imports
import avatar from '../../assets/avatar.jpg'

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    container:{        
        marginTop: 12
    },
    userContainer:{
        backgroundColor: theme.palette.primary.main,
        height: '100%',
        padding: 12
    }
}))

const UserInfo = () => {
    // Styles
    const classes = useStyles()


    return (
        <Grid container className={classes.container}>
            <Grid item xs={6}>                
                <Grid container className={classes.userContainer} direction='column' justify='space-between'>
                    <Grid item>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Typography variant='body1' color='textPrimary'>
                                    First Name
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='body1' color='textPrimary'>
                                    Shanaka
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='body1' color='textPrimary'>
                                    Last Name
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='body1' color='textPrimary'>
                                    Abeysinghe
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='body1' color='textPrimary'>
                                    Email
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='body1' color='textPrimary'>
                                    abcd@1235.com
                                </Typography>
                            </Grid>                                                        
                        </Grid>
                    </Grid> 
                    <Grid item>
                        <Grid container justify='flex-end'>
                            <Button
                                variant='contained'
                                color='secondary'
                            >
                                Check In
                            </Button>
                        </Grid>
                    </Grid>                                       
                </Grid>                
            </Grid>
            <Grid item xs={6}>
                <Grid container justify='center' alignItems='center'>
                    <img alt='img-avatar' src={avatar} />
                </Grid>                
            </Grid>            
        </Grid>
    )
}

export default UserInfo
