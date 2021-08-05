// React Imports
import React, { useState } from 'react'
// 3rd Party
import { 
    useQuery,
    useMutation
} from 'react-query'
// Material UI Imports
import { 
    Container,
    Grid,
    Theme,
    makeStyles,
    Typography,
    useMediaQuery,
    Button,
    Fade,
    TextField,
    CircularProgress
} from '@material-ui/core'
import { 
    useTheme
} from '@material-ui/styles'
// Local Imports
import Calender from './Calender'
import TimeList from './TimeList'
import { ReactComponent as Success } from '../../assets/checked.svg';
import { getBookingCalenderDetails, makeBooking } from '../../api/bookingApi'

// Style
const useStyles = makeStyles((theme: Theme) => ({
    container: {
        backgroundColor: theme.palette.primary.light,
        marginBottom: 4
    },
    calenderContainer: {
        marginTop: 16,
        paddingBottom: 16,
    },
    formContainer: {
        marginTop: 16,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: theme.palette.primary.dark
    },
    imageContainer: {
        marginTop: 16,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: theme.palette.primary.dark,
        height: 'calc(100% - 12px)'
    },
    buttonContainer: {
        marginBottom: -4,
        marginTop: 16,
        paddingBottom: 16,
    },
    button: {
        color: theme.palette.text.primary
    },
    textFieldLabel: {
      color: theme.palette.text.primary,
      opacity: 0.8
    },
    textFieldUnderLine: {
        "&&&:before": {
            borderBottomColor: theme.palette.text.primary
        }
    },
    confirmBooking: {
        marginTop: 16,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,        
        height: 353,
        backgroundColor: theme.palette.primary.dark,
    },
    success: {
        fill: theme.palette.secondary.main,
        height: 100,
        width: 100
    }
  }));

// Interface

interface BookingCalenderProps {
    activityName: string,
    activePackage: {
        id: number,
        name: string,
        price: number
    }
}

interface SelectedDate {
    initial?: boolean
    day: number,
    month: number,
    year: number
}

const BookingCalender:React.FC<BookingCalenderProps> = ( { activityName, activePackage } ) => {
    // Styles
    const classes = useStyles()
    const theme:Theme = useTheme()

    const matches = useMediaQuery(theme.breakpoints.down("md"))

    // State
    const [page, setPage] = useState(1)
    const [selectedDateIndex, setSelectedDateIndex] = useState<SelectedDate>({
        initial: true,
        day: new Date().getDay() + 1,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
    })
    const [selectedTimeslot, setSelectedTimeslot] = useState<any>('')

    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [sureName, setSureName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    // Query
    // Do a refetch if the selected date is outside the current year
    const { 
        data: calenderData, 
        error: calenderError, 
        isLoading: calenderIsLoading, 
        isError: calenderIsError, 
        isFetching: calenderIsFetching,
    } = useQuery(
        'GetBookingCalenderDetails', 
        () => getBookingCalenderDetails({
            "packageId": activePackage.id,
            "packageCategory": 'BackeryPartyRoom',
            "monthOfTheYear": selectedDateIndex.month,
            "year": selectedDateIndex.year,
            "requestUpfrontMonths": 3
        })
    )

    const {
        data: bookingData,
        error: bookingError,
        isLoading: bookingIsloading,
        isSuccess: bookingIsSuccess,
        isError: bookingIsError,
        mutate: makeABooking,
        reset: bookingReset,
    } = useMutation(makeBooking)
    
    if(calenderIsLoading){
        return (
                <CircularProgress />
            )
    }    

    // Const
    const calenderResponse = calenderData?.data.response
    console.log(calenderResponse)

    // Methods
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        makeABooking({
            'packageId': activePackage.id,
            'timeSlotId': selectedTimeslot.id,
            firstName,
            middleName,
            sureName,
            phoneNumber,
            'emailAddress': email,
            'countryCode': 'AU'
        })
        console.log('Submit')
        setPage(3)
    }

    const handleDateSelect = (dayIndex: SelectedDate) => {
        setSelectedDateIndex(dayIndex)
    }

    const handleTimeSelect = (timeslot: any|undefined) => {
        console.log(timeslot)
        if(timeslot){
            setSelectedTimeslot(timeslot)
        }        
    }

    const resetBooking = () => {
        // Reset State for a new Booking
        bookingReset()
        setPage(1)
        setFirstName('')
        setMiddleName('')
        setSureName('')
        setEmail('')
        setPhoneNumber('')
    }

    console.log(page)

    return (
        <Container className={classes.container}>
            <Typography variant='h6' align='center'>
                Make the Booking
            </Typography>
                { page === 1 ? 
                    (
                        <Grid container className={classes.calenderContainer} justify='space-between' spacing={1}>
                            <Grid item xs={12} md={6}>
                            { matches ?
                                <Grid container alignItems='center' justify='center'>
                                    <Calender 
                                        data={calenderResponse ? calenderResponse.filter((item:any) => item.year === selectedDateIndex.year && item.monthOfTheYear === selectedDateIndex.month)[0].bookingDays : []}
                                        handleDateSelectParent={handleDateSelect}
                                    />
                                </Grid>
                                :
                                <Grid container>
                                    <Calender 
                                        data={calenderResponse ? calenderResponse.filter((item:any) => item.year === selectedDateIndex.year && item.monthOfTheYear === selectedDateIndex.month)[0].bookingDays : []}                                    
                                        handleDateSelectParent={handleDateSelect}
                                    />
                                </Grid>
                            }
                            </Grid>
                            { calenderResponse.filter((item:any) => item.year === selectedDateIndex.year && item.monthOfTheYear === selectedDateIndex.month)[0].bookingDays[selectedDateIndex.day - 1].availabilityStatus > 0 &&
                                <Grid item xs={12} md={6}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <TimeList 
                                                list={calenderResponse ? calenderResponse.filter((item:any) => item.year === selectedDateIndex.year && item.monthOfTheYear === selectedDateIndex.month)[0].bookingDays[selectedDateIndex.day - 1].timeSlots : []}
                                                handleTimeSelect={handleTimeSelect}                                            
                                            />
                                        </Grid>                        
                                    </Grid>                    
                                </Grid>  
                            }
                        </Grid>              
                    ) 
                    :
                    (                        
                        <Grid container justify='space-between' spacing={1}>
                            <Fade in={page!==1 }>
                                <Grid item xs={12} md={6}>
                                    <Grid container className={classes.imageContainer}>
                                        <Grid item xs={12}>
                                            <Typography variant='h6' align='left'>
                                                Booking Summery
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body2' align='left'>
                                                Activity Center 
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body2' align='left'>
                                                Party Room
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body2' align='left'>
                                                Activity
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body2' align='left'>
                                                {activityName}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body2' align='left'>
                                                Package
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body2' align='left'>
                                                { activePackage.name }
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body2' align='left'>
                                                Date
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body2' align='left'>
                                                {`${selectedDateIndex.day}/${selectedDateIndex.month}/${selectedDateIndex.year}`}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body2' align='left'>
                                                Time
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body2' align='left'>
                                                { selectedTimeslot.label }
                                            </Typography>
                                        </Grid> 
                                        <Grid item xs={6}>
                                            <Typography variant='h6' align='left'>
                                                Price
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='h6' align='left'>
                                                {`${activePackage.price} AUD`}
                                            </Typography>
                                        </Grid>                                     
                                    </Grid>
                                </Grid>
                            </Fade>
                            <Grid item xs={12} md={6}>
                                { page === 2 ? 
                                (
                                    <Fade in={page === 2}>
                                        <form id='contact-form' onSubmit={handleFormSubmit}>
                                            <Grid container spacing={1} className={classes.formContainer}>
                                                <Grid item xs={12}>
                                                    <Typography variant='h6' align='left'>
                                                        Enter Contact Details
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        variant='standard'
                                                        label='First Name'
                                                        value={firstName}
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                        fullWidth
                                                        color='secondary'
                                                        required
                                                        InputProps={{
                                                            classes:{
                                                            underline: classes.textFieldUnderLine,

                                                            }
                                                            
                                                        }}           
                                                        InputLabelProps={{
                                                            className:classes.textFieldLabel,
                                                            shrink: true,
                                                        }}
                                                        autoComplete='no'
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        variant='standard'
                                                        label='Middle Name'
                                                        value={middleName}
                                                        onChange={(e) => setMiddleName(e.target.value)}                                                        
                                                        fullWidth
                                                        color='secondary'
                                                        InputProps={{
                                                            classes:{
                                                            underline: classes.textFieldUnderLine,

                                                            }
                                                        }}
                                                        InputLabelProps={{
                                                            className:classes.textFieldLabel,
                                                            shrink: true,
                                                        }}
                                                        autoComplete='no'
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        variant='standard'
                                                        label='Surename'
                                                        value={sureName}
                                                        onChange={(e) => setSureName(e.target.value)}
                                                        fullWidth
                                                        color='secondary'
                                                        InputProps={{
                                                            classes:{
                                                            underline: classes.textFieldUnderLine,

                                                            }
                                                        }}
                                                        InputLabelProps={{
                                                            className:classes.textFieldLabel,
                                                            shrink: true,
                                                        }}
                                                        autoComplete='no'
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        variant='standard'
                                                        label='Email'
                                                        type='email'
                                                        required
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        fullWidth
                                                        color='secondary'
                                                        InputProps={{
                                                            classes:{
                                                            underline: classes.textFieldUnderLine,
                                                            }
                                                        }}
                                                        InputLabelProps={{
                                                            className:classes.textFieldLabel,
                                                            shrink: true,
                                                        }}
                                                        autoComplete='no'
                                                    />
                                                </Grid>   
                                                <Grid item xs={12}>
                                                    <TextField
                                                        variant='standard'
                                                        label='Phone Number'
                                                        type='text'
                                                        required
                                                        value={phoneNumber}
                                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                                        fullWidth
                                                        color='secondary'
                                                        InputProps={{
                                                            classes:{
                                                            underline: classes.textFieldUnderLine,
                                                            }
                                                        }}
                                                        InputLabelProps={{
                                                            className:classes.textFieldLabel,
                                                            shrink: true,
                                                        }}
                                                        autoComplete='no'
                                                    />
                                                </Grid>                                                                                                
                                            </Grid>
                                        </form>
                                    </Fade>
                                ):
                                (
                                    <Fade in={page === 3} mountOnEnter unmountOnExit>
                                        <Grid container alignItems='center' justify='center' direction='column' spacing={1} className={classes.confirmBooking}>
                                            { bookingIsloading 
                                            ?
                                                <CircularProgress />
                                            :
                                                <>
                                                { bookingData!.data.status! === 'Failed' 
                                            ?
                                                <Grid item>
                                                    <Typography variant='h6' align='center'>
                                                        {
                                                            bookingData?.data.msg || 'Something went wrong, Please Try Again'
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
                                                        <Success className={classes.success} />
                                                    </Grid>
                                                </>
                                                }
                                                </>
                                            }
                                            { !bookingIsloading &&
                                                <Grid item>
                                                    <Button
                                                        variant='contained'
                                                        color='secondary'
                                                        onClick={resetBooking}
                                                    >
                                                        Create A New Booking
                                                    </Button>
                                                </Grid>
                                            }
                                        </Grid>
                                    </Fade>
                                )
                                }
                            </Grid>
                        </Grid>
                    ) 
                }

            <Grid container className={classes.buttonContainer} justify='space-between'>
                <Grid item>
                    {page === 2 &&
                        <Button
                            variant='contained'
                            color='secondary'
                            disableElevation
                            className={classes.button}
                            onClick={() => setPage(1)}
                        >
                            Back
                        </Button>
                    }
                </Grid>                
                <Grid item>
                    { page !== 3 &&
                    <Button
                        variant='contained'
                        color='secondary'
                        disableElevation
                        className={classes.button}
                        onClick={() => setPage(2)}
                        disabled={ page === 1 && selectedTimeslot === ''}
                        type={page === 2 ? 'submit' : undefined}
                        form='contact-form'
                    >
                        {page === 2 ? 'Make the Booking' : 'Next'}
                    </Button>
                    }
                </Grid>
            </Grid>
        </Container>
    )
}

export default BookingCalender