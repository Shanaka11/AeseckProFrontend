import React from 'react'
// 3rd Party
// Material UI Imports
import { 
    Grid, 
    makeStyles,
    Theme,
    Typography,
} from '@material-ui/core'
// Local Imports
import Item from '../bookingpage/Item'

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    container:{        
        marginTop: 12,
        color: theme.palette.text.primary
    },
    userContainer:{
        backgroundColor: theme.palette.primary.main,
        height: '100%',
        padding: 12
    },
    header: {
        marginBottom: theme.spacing(1)
    }
}))

// Interfaces
interface Props {
    sessionInfo: {
        sessionId: number,
        status: number,
        startDateTime: string,
        expectedEndDateTime: string,
        endDateTime: string,
        createdBy: string,
        type: string,
        category: string,
    }
}

const Session:React.FC<Props> = ( { sessionInfo } ) => {
    // Styles
    const classes = useStyles()

    return (
        <Grid container className={classes.container}>
            <Grid item xs={12}>                
                <Grid container className={classes.userContainer} direction='column' justify='space-between'>
                    <Typography variant='h5' className={classes.header}>
                        Session Infomation
                    </Typography>
                    <Grid item>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Grid container spacing={1} direction='column'>
                                    <Item label='Session Id' value={sessionInfo.sessionId} small/>
                                    <Item label='Category' value={sessionInfo.category || 'Not Defined'} small/>
                                    <Item label='Start Time' value={sessionInfo.startDateTime} small/>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container spacing={1} direction='column'>
                                    <Item label='Status' value={sessionInfo.status} small/>
                                    <Item label='Type' value={sessionInfo.type || 'Not Defined'} small/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid> 
                </Grid>                
            </Grid>        
        </Grid>
    )
}

export default Session
