import React, { useState } from 'react'
// 3rd Party
import { useQuery } from 'react-query';
// Material UI Imports
import { 
    Button,
    Container,
    Grid, 
    makeStyles,
    Slide,
    Theme,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText
} from '@material-ui/core'
// Local Imports
import Calender from './Calender'
import TimeList from './TimeList'
import { getBookingCalenderDetails } from '../../api/bookingApi'

// Style
const useStyles = makeStyles((theme: Theme) => ({
    container:{
        minHeight: 450
    },
    dialogContainer: {
        backgroundColor: theme.palette.primary.main
    },
    dialogText:{
        color: theme.palette.text.primary
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
    activePackageId: number,
    handleDateSelectConfirm: (data: {date: SelectedDate, time:SelectedTime}) => void
    handleBackOnClick: () => void
}

const DateTimePicker:React.FC<Props> = ( { activePackageId, handleDateSelectConfirm, handleBackOnClick } ) => {
    // Classes
    const classes = useStyles()

    // States
    const [selectedDate, setSelectedDate] = useState<SelectedDate>({
        day: new Date().getDay() + 1,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
    })
    const [selectedTime, setSelectedTime] = useState<SelectedTime>()
    const [confirm, setConfirm] = useState(false)

    // Queries
    const { 
        data: calenderData, 
        error: calenderError, 
        isLoading: calenderIsLoading, 
        isError: calenderIsError, 
        isFetching: calenderIsFetching,
    } = useQuery(
        'GetBookingCalenderDetails', 
        () => getBookingCalenderDetails({
            "packageId": activePackageId,
            "packageCategory": 'BackeryPartyRoom',
            "monthOfTheYear": selectedDate.month,
            "year": selectedDate.year,
            "requestUpfrontMonths": 3
        })
    )

    // Methods
    const handleDateSelect = (day:SelectedDate) => {
        setSelectedDate(day)
    }

    const handleTimeSelect = (time:SelectedTime) => {
        setSelectedTime(time)
    }

    const handleDateTimeConfirm = () => {
        if(selectedTime!.availability === 1){
            setConfirm(true)
        }else{
            // Move to the next step
            handleDateSelectConfirm({
                date: selectedDate,
                time: selectedTime!
            })
        } 
    }

    const handleDialogOk = () => {
        // Move to the next step
        handleDateSelectConfirm({
            date: selectedDate,
            time: selectedTime!
        })
    }

    // Consts
    const calenderResponse = calenderData?.data.response

    return (
        <div>
        <Dialog
            open={confirm}
            onClose={() => setConfirm(false)}
            classes={{
                paper: classes.dialogContainer
            }}
        >
            <DialogTitle>{"Timeslot Already Booked"}</DialogTitle>
            <DialogContent>
                <DialogContentText
                    classes={{
                        root: classes.dialogText
                    }}
                >
                    We are sorry to inform that the Date and Time you picked already has another booking. 
                    Hovever we can make a tentitive booking on your behalf for the day and we will let you know if it becomes available.
                    Alternativly you can make a booking on a different date altogether.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => setConfirm(false)}
                    disableElevation
                >
                    Change the Date
                </Button>
                <Button
                    variant = 'contained' 
                    color='secondary'
                    onClick={() => handleDialogOk()}
                    disableElevation
                >
                    Keep the Date
                </Button>
            </DialogActions>
        </Dialog>
        <Slide in={true} direction='left' mountOnEnter unmountOnExit >
            <Container className={classes.container}>
                <Grid container justify='space-evenly'>
                    <Grid item>
                        <Calender 
                            data={calenderResponse ? calenderResponse.filter((item:any) => item.year === selectedDate.year && item.monthOfTheYear === selectedDate.month)[0].bookingDays : []}                                    
                            handleDateSelectParent={handleDateSelect}
                            loading={calenderIsLoading}
                        />
                    </Grid>
                    <Grid item>
                        <TimeList 
                            list={calenderResponse ? calenderResponse.filter((item:any) => item.year === selectedDate.year && item.monthOfTheYear === selectedDate.month)[0].bookingDays[selectedDate.day - 1].timeSlots : []}
                            handleTimeSelect={handleTimeSelect}   
                            selectedTime={selectedTime}                                         
                        />
                    </Grid>
                </Grid>
                <Grid container justify='space-between'>
                    <Button
                        variant='text'
                        color='secondary'
                        disableElevation
                        onClick={() => handleBackOnClick()}
                    >
                        Back
                    </Button>
                    <Button
                        variant='contained'
                        color='secondary'
                        disableElevation
                        onClick={() => handleDateTimeConfirm()}
                        disabled={!selectedTime}
                    >
                        Next
                    </Button>
                </Grid>
            </Container>
        </Slide>
        </div>
    )
}

export default DateTimePicker
