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
    },
    hiddenFont: {
        color: 'white'
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
                <Typography variant='subtitle2' className={`${classes.title} ${label ? undefined : classes.hiddenFont}`}>
                    {label ? label : '1'}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant='body1' className={value ? undefined : classes.hiddenFont }>
                    {value ? value : '1'}
                </Typography>
            </Grid>                    
        </Grid>
    )
}

export default PopoverGridItem
