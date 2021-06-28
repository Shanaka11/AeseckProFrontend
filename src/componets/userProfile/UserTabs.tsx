// React Imports
import React, { useState } from 'react'
// 3rd Party
import SwipeableViews from 'react-swipeable-views';
// Material UI Imports
import { 
    makeStyles,
    Theme,
    Tab,
    Tabs,    
} from '@material-ui/core'
// Local Imports

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    tabItem: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.primary.main,
    },
    tabPanel: {
        padding: 24,
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.primary.main,
    }
}))

const UserTabs = () => {
    // Styles
    const classes = useStyles()

    // State
    const [index, setIndex] = useState(0)

    return (
        <>
        <Tabs value={index} onChange={(event: React.ChangeEvent<{}>, newValue: number) => {setIndex(newValue)}} className={classes.tabItem}>
            <Tab label="General" />
            <Tab label="Booking History"/>
            <Tab label="Checkin History"/>
        </Tabs>
        <SwipeableViews
            axis={'x'}
            index={index}
            onChangeIndex={(index: number) => {setIndex(index)}}
        >
            <div hidden={index !== 0} className={classes.tabPanel}>
                Item One
            </div>
            <div hidden={index !== 1} className={classes.tabPanel}>
                Item Two
            </div>
            <div hidden={index !== 2} className={classes.tabPanel}>
                Item Three
            </div>
        </SwipeableViews>      
        </>
    )
}

export default UserTabs
