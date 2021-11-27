// React Imports
import React, { useState } from 'react'
// 3rd Party
import SwipeableViews from 'react-swipeable-views';
// Material UI Imports
import { 
    Container,
    Grid, 
    makeStyles,
    Theme,
    Typography,
    Tabs,
    Tab
} from '@material-ui/core'
// Local Imports
import Alert from '../../common/Alert'
import { errorHandlerResp } from '../../../utils/errorHandler'
import BreadCrumbs from '../common/BreadCrumbs'
import GeneralTab from './UserTabGeneral'
import BookingTab from './UserTabBookingHistory'
import CheckinTab from './UserTabCheckinHistroy'
import DependetUserTab from './UserTabDependentUserInfo'

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    container:{        
        paddingTop: 12,
        marginBottom: 8
    },
    infoContainer:{        
        padding: 24,        
        height: '100%'
    },
    gridItem: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1)
    },
    tabItem: {

    },
    tabContainer: {
        marginTop: 12,
        marginBottom: 12
    },
    subContainer: {
        marginTop: 12,
        display: 'flex'
    },
    fontColorBlack: {        
        color: 'black',
        "& .MuiTablePagination-root": {
            color: "black"
        },
        "& .MuiInputBase-root": {
            color: "black"
        }
    },
    uploadButtonContainer:{
        position: 'relative'
    },
    uploadButton: {
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    tabPanel: {
        padding: 24,
        backgroundColor: '#f2f2f2',
        minHeight: 400
    },
}))

// Interfaces
interface UserInfoProps {
    data: any,
    error?: errorHandlerResp,
    loading: boolean
}

const UserInfoNew:React.FC<UserInfoProps> = ({ data, error }) => {
    // Styles
    const classes = useStyles()

    // States
    const [index, setIndex] = useState(0)

    const [firstName, setFirstName] = useState(data ? data.contact.firstName ? data.contact.firstName : '' : '')

    const path = [
        {
            name: 'Dashbord',
            href: '/backoffice'
        },
        {
            name: 'Users',
            href: '/backoffice/users'
        },
        {
            name: data.contact.firstName!,
            href: `/backoffice/users/${data.user.id}`
        },    
    ]
    return (
        <Container>
            {error?.isError && <Alert message={error.message} severity='error'/>}
            <BreadCrumbs data={path}/>
            <Grid container>
                <Grid item xs={12} className={classes.gridItem}>
                    <Typography variant='h6' >
                        User Profile - {firstName}
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.tabContainer}>
                    <Tabs value={index} onChange={(event: React.ChangeEvent<{}>, newValue: number) => {setIndex(newValue)}} className={classes.tabItem}>
                        <Tab label="General" />
                        <Tab label="Dependent Users" />
                        <Tab label="Booking History" />
                        <Tab label="Checkin History" />
                    </Tabs>
                    <SwipeableViews
                        axis={'x'}
                        index={index}
                        onChangeIndex={(index: number) => {setIndex(index)}}
                    >
                        <div hidden={index !== 0} className={classes.tabPanel}>
                            <GeneralTab data={data}/>
                        </div>
                        <div hidden={index !== 1} className={classes.tabPanel}>
                            <DependetUserTab data={data} userId={data.user.id}/>
                        </div>
                        <div hidden={index !== 2} className={classes.tabPanel}>
                            <BookingTab data={data}/>
                        </div>
                        <div hidden={index !== 3} className={classes.tabPanel}>
                            <CheckinTab data={data}/>
                        </div>
                    </SwipeableViews>   
                </Grid>
            </Grid>
        </Container>
    )
}

export default UserInfoNew
