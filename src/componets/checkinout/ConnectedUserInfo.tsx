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

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    container:{        
        backgroundColor: theme.palette.primary.main,
        marginTop: 6,
        marginBottom: 6,
        padding: 12
    },
    subContainer: {
        height: '100%'
    }
}))

const ConnectedUserInfo = () => {
    // Styles
    const classes = useStyles()    

    return (
        <Grid container className={classes.container}>
            {/* Name */}
            <Grid item xs={8}>
                <Grid container direction='column'>
                    <Typography variant='h6' color='textPrimary'>
                        Name
                    </Typography>
                    <Typography variant='subtitle1' color='textPrimary'>
                        78126897162983215398
                    </Typography>                    
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <Grid container direction='column' alignItems='flex-end' justify='flex-end' className={classes.subContainer}>
                    <Button
                        variant='contained'
                        color='secondary'
                    >
                        Check In
                    </Button>
                </Grid>
            </Grid>         
        </Grid>
    )
}

export default ConnectedUserInfo
