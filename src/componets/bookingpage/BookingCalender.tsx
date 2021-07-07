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
    useMediaQuery,
    Button,
    Fade,
    TextField
} from '@material-ui/core'
import { 
    useTheme
} from '@material-ui/styles'
// Local Imports
import Calender from './Calender'
import TimeList from './TimeList'
import { ReactComponent as Success } from '../../assets/checked.svg';

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

}  

const BookingCalender:React.FC<BookingCalenderProps> = () => {
    //Styles
    const classes = useStyles()
    const theme:Theme = useTheme()

    const matches = useMediaQuery(theme.breakpoints.down("md"))

    // State
    const [page, setPage] = useState(1)

    // Methods
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log('Submit')
        setPage(3)
    }

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
                                    <Calender />
                                </Grid>
                                :
                                <Grid container>
                                    <Calender />
                                </Grid>
                            }
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <TimeList />
                                    </Grid>                        
                                </Grid>                    
                            </Grid>  
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
                                                Activity Center A
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body2' align='left'>
                                                Activity
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body2' align='left'>
                                                Activity A
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body2' align='left'>
                                                Room
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body2' align='left'>
                                                Room A
                                            </Typography>
                                        </Grid> 
                                        <Grid item xs={6}>
                                            <Typography variant='body2' align='left'>
                                                Package
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body2' align='left'>
                                                Package A
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body2' align='left'>
                                                Date
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body2' align='left'>
                                                Date A
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body2' align='left'>
                                                Time
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='body2' align='left'>
                                                Time A
                                            </Typography>
                                        </Grid> 
                                        <Grid item xs={6}>
                                            <Typography variant='h6' align='left'>
                                                Price
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='h6' align='left'>
                                                1023.00
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
                                                        label='Last Name'
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
                                                        label='Notes'
                                                        rows={4}                                                
                                                        multiline
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
                                    <Fade in={page === 3}>
                                        <Grid container alignItems='center' justify='center' direction='column' spacing={1} className={classes.confirmBooking}>
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
                                                <Success className={classes.success} />
                                            </Grid>
                                            <Grid item>
                                                <Button
                                                    variant='contained'
                                                    color='secondary'
                                                >
                                                    Create A New Booking
                                                </Button>
                                            </Grid>
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