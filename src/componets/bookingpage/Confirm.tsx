// Reacr Imports
import React from 'react'
// 3rd Party
import { useMutation } from 'react-query'
// Material UI Imports
import { 
    Container,
    Grid, 
    makeStyles,
    Slide,
    Theme,
    Typography,
    Button
} from '@material-ui/core'
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
// Local Imports
import Item from './Item'
import { makeBooking } from '../../api/bookingApi'
import { ReactComponent as Success } from '../../assets/checked.svg';

// Style
const useStyles = makeStyles((theme: Theme) => ({
    container:{
        minHeight: 450
    },
    header:{
        marginBottom: theme.spacing(3)
    },
    subContainer:{
        minHeight: 450,
        width: 300
    },
    icon: {
        height: 200,
        width: 200,
        fill: theme.palette.secondary.main
    }
  }));

// Interfaces
interface SelectedDate {
    day: number,
    month: number,
    year: number
}

interface SelectedTime {
    id: number,
    label: string,
    date: string,
    availability: number
}

interface Props {
    activity: string,
    dateTime: {
        date: SelectedDate, 
        time: SelectedTime
    }
    packageSelected: {
        id: number,
        name: string,
        price: number
    },
    contacts: any
    handleDateSelectConfirm: (data: any) => void
    handleBackOnClick: () => void
}

const Confirm:React.FC<Props> = ({activity, dateTime, packageSelected, contacts, handleDateSelectConfirm, handleBackOnClick}) => {
    // Styels
    const classes = useStyles()

    // Query
    const {
        data: bookingData,
        error: bookingError,
        isLoading: bookingIsloading,
        isSuccess: bookingIsSuccess,
        isError: bookingIsError,
        mutate: makeBookingMutation,
        reset: bookingReset,
    } = useMutation(makeBooking)

    // Method
    const onConfirmClick = () => {
        makeBookingMutation({
            'packageId': packageSelected.id,
            'timeSlotId': dateTime.time.id,
            'firstName': contacts.firstName,
            'middleName': contacts.middleName,
            'sureName': contacts.sureName,
            'phoneNumber': contacts.phoneNumber,
            'emailAddress': contacts.email,
            'countryCode': 'AU',
            'dateTime': `${dateTime.date.day}/${dateTime.date.month}/${dateTime.date.year}`,
            'requestType': dateTime.time.availability === 1 ? `request` : `booking` 
        })
    }

    return (
        <Slide in={true} direction='left' mountOnEnter unmountOnExit>
            <Container className={classes.container}>
                <Grid container spacing={2} className={classes.header}>
                    <Grid item>
                        <Grid container justify='space-evenly' spacing={2}>
                            <Grid item xs={12} className={classes.header}>
                                <Typography variant='h4' component='h4' align='center'>
                                    Full Booking Summery
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Grid container direction='column' spacing={1}>
                                    <Item label='Activity Center' value='Party Room'/>
                                    <Item label='Activity' value={activity}/>
                                    <Item label='Date' value={ dateTime.time.date }/>
                                    <Item label='Time' value={ dateTime.time.label }/>
                                    <Item label='Package' value={ packageSelected.name }/>
                                    <Item label='Price' value={ `${packageSelected.price} AUD` }/>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container direction='column' spacing={1}>
                                    <Item label='First Name' value={contacts.firstName}/>
                                    <Item label='Middle Name' value={contacts.middleName}/>
                                    <Item label='Surename' value={contacts.sureName}/>
                                    <Item label='Email' value={contacts.email}/>
                                    <Item label='Phone Number' value={contacts.phoneNumber}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid 
                            container 
                            justify='center' 
                            alignItems='center' 
                            direction='column' 
                            className={classes.subContainer}
                        >
                            {
                                bookingIsSuccess ?
                                    (bookingData!.data.status! === 'Failed' || bookingIsError) ?
                                        <Grid item>
                                            <Typography variant='h6' align='center'>
                                                {
                                                    `Booking Failed - ${bookingData?.data.msg}, Please try again` || 'Something went wrong, Please Try Again'
                                                }
                                            </Typography>
                                        </Grid>
                                    :
                                    <>
                                        <Grid item>
                                            <Typography variant='h6' align='center'>
                                                Booking Request Confirmed
                                            </Typography>                                            
                                        </Grid>
                                        <Grid item>
                                            <Typography variant='body1' align='center'>
                                                A tentative booking was made, It will be confirmed upon payment
                                            </Typography>                                            
                                        </Grid>
                                        <Grid item>
                                            <Typography variant='body2' align='center'>
                                                {  `Booking Referance - ${bookingData?.data.response.id}` }
                                            </Typography>                                            
                                        </Grid>
                                        <Grid item>
                                            <Success className={classes.icon} />
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                variant='contained'
                                                color='secondary'
                                                onClick={bookingReset}
                                                disabled={bookingIsloading}
                                            >
                                                Create A New Booking
                                            </Button>
                                        </Grid>
                                    </>
                                :
                                    <>
                                    <Grid item>
                                        <EventAvailableIcon className={classes.icon}/>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant='contained'
                                            color='secondary'
                                            disableElevation
                                            onClick={() => onConfirmClick()}
                                            disabled={bookingIsloading}
                                        >
                                            Confirm Booking
                                        </Button>
                                    </Grid>
                                    </>
                            }
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container justify='flex-start'>
                    <Button
                        variant='text'
                        color='secondary'
                        disableElevation
                        onClick={() => handleBackOnClick()}
                    >
                        Back
                    </Button>
                </Grid>
            </Container>
        </Slide>
    )
}

export default Confirm
