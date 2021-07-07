// React Imports
import React, { useEffect, useState } from 'react'
// 3rd Party
// Material UI Imports
import { 
    makeStyles,
    Theme,
    Grid,
    Typography
} from '@material-ui/core'
// Local Imports

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    container: {
        marginBottom: theme.spacing(2)
    },
    title: {
        color: '#b7b6b6',
        fontSize: '0.8em'
    }
}))

// Interface
interface Props {
    label: string,
    value: string|number
}

const PopoverGridItem:React.FC<Props> = ( { label, value } ) => {
    // Styles
    const classes = useStyles()

    return (
        <Grid container direction='column' className={classes.container}>
            <Grid item>
                <Typography variant='subtitle2' className={classes.title}>
                    {label}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant='body1'>
                    {value}
                </Typography>
            </Grid>                    
        </Grid>
    )
}

export default PopoverGridItem
