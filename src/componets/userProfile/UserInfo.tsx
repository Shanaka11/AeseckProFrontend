// React Imports
import React, { useState, useContext } from 'react'
// 3rd Party
import SwipeableViews from 'react-swipeable-views';
import { useQuery } from 'react-query'
// Material UI Imports
import { 
    CircularProgress,
    Grid, 
    makeStyles,
    Tab,
    Tabs,
    Theme,
    Typography,
} from '@material-ui/core'
// Local Imports
import GeneralTab from '../backoffice/user/UserTabGeneral'
import DependetUserTab from '../backoffice/user/UserTabDependentUserInfo'
import CheckinTab from '../backoffice/user/UserTabCheckinHistroy'
import BookingTab from '../backoffice/user/UserTabBookingHistory'
import { getUserProfile } from '../../api/userApi'
import userContext from '../../context/userContext'

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    container:{        
        paddingTop: 12
    },
    infoContainer:{        
        padding: 24,
        backgroundColor: theme.palette.primary.dark,
        height: '100%'
    },
    gridItem: {
        marginBottom: 12
    },
    textFieldLabel: {
        color: theme.palette.text.primary,
        // opacity: 0.8
    },
    textFieldUnderLine: {
        "&&&:before": {
            borderBottomColor: theme.palette.text.primary
        }
    },
    tabItem: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.primary.main
    },
    tabContainer: {
        marginTop: 12,
        backgroundColor: theme.palette.primary.main,
        marginBottom: 12
    },
    subContainer: {
        marginTop: 12
    },
    tabPanel: {
        padding: 24,
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.primary.main,
    }
}))

// Interfaces

const UserInfo = () => {
    // Style
    const classes = useStyles()

    const { user } = useContext(userContext)

    // State
    const [index, setIndex] = useState(0)

    // Query
    const userInfo = JSON.parse(localStorage.getItem('userInfo')!)
    const { data, isLoading } = useQuery('UserInfo', () => getUserProfile(userInfo!.id))  
    // Methods

    return (
        <Grid container className={classes.container}>
            <Grid item xs={12} className={classes.gridItem}>
                <Typography variant='h6' color='textPrimary'>
                    {`User Profile - ${data?.data.response.contact.firstName}`}
                </Typography>
            </Grid>
            { isLoading ? <CircularProgress /> :
            <Grid item xs={12} className={classes.tabContainer}>
                {
                    user.role !== 'admin' ?
                        <Tabs value={index} onChange={(event: React.ChangeEvent<{}>, newValue: number) => {setIndex(newValue)}} className={classes.tabItem}>
                            <Tab label="General" />
                            <Tab label="Dependent Users" />
                            <Tab label="Booking History" />
                            <Tab label="Checkin History" />
                        </Tabs>
                    :
                        <Tabs value={index} onChange={(event: React.ChangeEvent<{}>, newValue: number) => {setIndex(newValue)}} className={classes.tabItem}>
                            <Tab label="General" />
                        </Tabs>
                }
                {
                    user.role !== 'admin' ?
                    <SwipeableViews
                        axis={'x'}
                        index={index}
                        onChangeIndex={(index: number) => {setIndex(index)}}
                    >
                        <div hidden={index !== 0} className={classes.tabPanel}>
                            <GeneralTab data={data?.data.response} client/>
                        </div>
                        <div hidden={index !== 1} className={classes.tabPanel}>
                            <DependetUserTab data={data?.data.response} client userId={userInfo!.id}/>
                        </div>
                        <div hidden={index !== 2} className={classes.tabPanel}>
                            <BookingTab data={data?.data.response} client/>
                        </div>
                        <div hidden={index !== 3} className={classes.tabPanel}>
                            <CheckinTab data={data?.data.response} client/>
                        </div>
                    </SwipeableViews>  
                    :
                    // <SwipeableViews
                    //     axis={'x'}
                    //     index={index}
                    //     onChangeIndex={(index: number) => {setIndex(index)}}
                    // >
                        <div hidden={index !== 0} className={classes.tabPanel}>
                            <GeneralTab data={data?.data.response} client/>
                        </div>
                    // </Sw/ipeableViews>  
                } 
            </Grid>
            }
        </Grid>
    )
}

export default UserInfo
