// React Imports
import React from 'react'
// 3rd Party
// Material UI Imports
import { 
    makeStyles,
    Theme,
    Grid,
    Typography
} from '@material-ui/core'
// Local Imports
import GridItem from '../common/PopoverGridItem'

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    title: {
        color: '#b7b6b6',
        fontSize: '0.8em'
    }
}))

const UserPopup = () => {
    // Classes
    const classes = useStyles()

    return (        
        <Grid container>
            <Grid item xs={6}>
                <GridItem label="First Name" value='Shanaka'/>
                <GridItem label="First Name" value='Shanaka'/>
                <GridItem label="First Name" value='Shanaka'/>
            </Grid>
            <Grid item xs={6}>
                <GridItem label="Last Name" value='Bandara'/>
            </Grid>            
        </Grid>
    )
}

export default UserPopup
