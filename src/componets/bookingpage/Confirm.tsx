// Reacr Imports
import React, { useEffect } from 'react'
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
    Button,
    CircularProgress
} from '@material-ui/core'
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
// Local Imports
import Item from './Item'
import { makeBooking } from '../../api/bookingApi'
import { ReactComponent as Success } from '../../assets/checked.svg';
import Alert from '../common/Alert'

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
    },
    button: {
        minWidth: 200
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
    handleBookingSuccess: () => void
    handleBackOnClick: () => void
}

const Confirm:React.FC<Props> = ({activity, dateTime, packageSelected, contacts, handleBookingSuccess, handleBackOnClick}) => {
    // Styels
    const classes = useStyles()

    // Query
    const {
        data: bookingData,
        isLoading: bookingIsloading,
        isSuccess: bookingIsSuccess,
        isError: bookingIsError,
        mutate: makeBookingMutation,
        reset: bookingReset,
    } = useMutation(makeBooking)

    // useEffect
    useEffect(() => {
        if(bookingIsSuccess){
            if(bookingData!.data.status! !== 'Failed'){
                handleBookingSuccess()
            }
        }
    },[bookingIsSuccess, bookingData, handleBookingSuccess])

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
            'countryCode': null,
            'bookingDate': `${dateTime.date.year}-${`${dateTime.date.month}`.padStart(2, '0')}-${`${dateTime.date.day}`.padStart(2, '0')}`,
            'requestType': dateTime.time.availability === 0 ? `request` : `booking` 
        })
    }


    return (
        <Slide in={true} direction='left' mountOnEnter unmountOnExit>
            <Container className={classes.container}>
                {    console.log(bookingIsSuccess )}
                { console.log(bookingData)}
                {console.log(bookingData ? bookingData!.data.status : '')}
                {bookingIsError && <Alert message={'Booking Failed due to internal issues, Please try again if the issue persists please contact our hotline'} severity='error'/>}
                {bookingIsSuccess && (bookingData!.data.status! === 'Failed') && <Alert message={`Booking Failed - ${bookingData?.data.msg}, Please try again`} severity='error' />}
                <Grid container spacing={2} className={classes.header}>
                    <Grid item xs={12} md={8}>
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
                    <Grid item xs={12} md={4}>
                        <Grid 
                            container 
                            justify={(bookingIsSuccess && (bookingData && bookingData!.data.status! !== 'Failed')) ? 'space-evenly' : 'center'}
                            alignItems='center' 
                            direction='column' 
                            className={classes.subContainer}
                        >
                            {
                                (bookingIsSuccess && (bookingData && bookingData!.data.status! !== 'Failed')) ?
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
                                        {/* <Grid item>
                                            <Button
                                                variant='contained'
                                                color='secondary'
                                                onClick={bookingReset}
                                                disabled={bookingIsloading}
                                                className={classes.button}
                                            >
                                                Create A New Booking
                                            </Button>
                                        </Grid> */}
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
                                            startIcon={bookingIsloading && <CircularProgress size={20}/>}
                                            className={classes.button}
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
