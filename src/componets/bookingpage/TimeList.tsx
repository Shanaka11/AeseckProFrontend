// React Imports
import React, { useState } from 'react'
// 3rd Party
// Material UI Imports
import { 
    Container,
    Grid,
    Theme,
    makeStyles,
    Typography,
    List,
    ListItem,    
    ListItemText
} from '@material-ui/core'
// Local Imports

// Style
const useStyles = makeStyles((theme: Theme) => ({
    mainContainer:{
        padding: 16,
        backgroundColor: theme.palette.primary.dark,
        height: 'calc(100% - 32px)'
    },
    container: {        
        backgroundColor: theme.palette.primary.main
    },
  }));

// Interface

const TimeList = () => {
    // Styles
    const classes = useStyles()
    // States
    const [selectedIndex, setSelectedIndex] = useState(-1)

    return (
        <div className={classes.mainContainer}>
        <List className={classes.container} disablePadding>
            <ListItem 
                divider 
                button 
                selected = {0 === selectedIndex }
                onClick = {() => setSelectedIndex(0)}
            >
                <Grid container>
                    <Grid item>
                        <Typography variant='h6'>
                            9:00 a.m - 10:00 a.m
                        </Typography>
                    </Grid>
                </Grid>
            </ListItem>
            <ListItem 
                divider 
                button
                selected = {1 === selectedIndex }    
                onClick = {() => setSelectedIndex(1)}                            
            >
                <Grid container>
                    <Grid item>
                        <Typography variant='h6'>
                            9:00 a.m - 10:00 a.m
                        </Typography>
                    </Grid>
                </Grid>
            </ListItem>
            <ListItem 
                divider 
                button
                selected = {2 === selectedIndex }    
                onClick = {() => setSelectedIndex(2)}                
            >
                <Grid container>
                    <Grid item>
                        <Typography variant='h6'>
                            9:00 a.m - 10:00 a.m
                        </Typography>
                    </Grid>
                </Grid>
            </ListItem>
        </List>
        </div>
    )
}

export default TimeList
