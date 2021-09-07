// React Imports
import React, { useState } from 'react'
// 3rd Party
// Material UI Imports
import { makeStyles } from '@material-ui/styles'
import { 
    Grid, 
    Typography, 
    IconButton,
    Theme,
    LinearProgress
} from '@material-ui/core'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
// Local Imports
import Day from './Day'
import { useEffect } from 'react';

// Styles
const useStyles = makeStyles((theme:Theme) => ({
    calenderContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: 16,
        marginLeft: 4,
        backgroundColor: theme.palette.primary.dark
    },
    headerContainer :{
        marginBottom: 16
    },
    dayContainer: {
        flexWrap: 'nowrap'
    },
    progressContainer: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}))

// Interface
interface SelectedDate {
    initial?: boolean
    day: number,
    month: number,
    year: number
}

interface Props {
    data: any,
    handleDateSelectParent: (dayIndex: SelectedDate) => void,
    handleCalenderYearChange: (year: number) => void,
    loading? :boolean   
}

const Calender:React.FC<Props> = ( { data, handleDateSelectParent, handleCalenderYearChange, loading } ) => {
        // Style
        const classes = useStyles()

        // States
        const [offset, setOffset] = useState(0)
        const [selectedDate, setSelectedDate] = useState<SelectedDate>({
            day: new Date().getDate(),
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        })       

        const date = new Date();

        date.setMonth(date.getMonth() + offset);
    
        useEffect(() => {

            const prevDate = new Date()

            const currDate = new Date()
            currDate.setMonth(currDate.getMonth() + offset)

            if(prevDate.getFullYear() < currDate.getFullYear()){
                handleCalenderYearChange(currDate.getFullYear())
            }
        }, [offset])
        date.setDate(1);
    
        const lastDay = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
        ).getDate();
    
        const prevLastDay = new Date(
            date.getFullYear(),
            date.getMonth(),
            0
        ).getDate();
    
        const firstDayIndex = date.getDay();
    
        const lastDayIndex = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
        ).getDay();
    
        const nextDays = 7 - lastDayIndex - 1;

    
        const dateMatrix:React.ReactNode[][] = [];
        const dateMatrixRow:React.ReactNode[] = [];
    
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        const filteredList = !loading && data.filter((item:any) => item.year === date.getFullYear() && item.monthOfTheYear === date.getMonth() + 1)[0]
        const bookingDays =  filteredList ? filteredList.bookingDays : []
        // Date Click Handler
        const handleDateClick = (day:number) => {
            setSelectedDate({
                day,
                month: date.getMonth(),
                year: date.getFullYear()
            })
            // Selected Date
            // Additional Date Selected options can be added here
            handleDateSelectParent({
                initial: false,
                day,
                month: date.getMonth() + 1,
                year: date.getFullYear()
            })
        }

        // Day Headers
        dateMatrixRow.push(
            <Day date={1} header handleDateClick={handleDateClick}/>
        )
        dateMatrixRow.push(
            <Day date={2} header handleDateClick={handleDateClick}/>
        )
        dateMatrixRow.push(
            <Day date={3} header handleDateClick={handleDateClick}/>
        )
        dateMatrixRow.push(
            <Day date={4} header handleDateClick={handleDateClick}/>
        )
        dateMatrixRow.push(
            <Day date={5} header handleDateClick={handleDateClick}/>
        )
        dateMatrixRow.push(
            <Day date={6} header handleDateClick={handleDateClick}/>
        )
        dateMatrixRow.push(
            <Day date={7} header handleDateClick={handleDateClick}/>
        )

        dateMatrix.push(dateMatrixRow.splice(0, 7));

        // Last Month Dates
        for (let x = firstDayIndex; x > 0; x--) {
            dateMatrixRow.push(
                <Day key={`P${x}`} date={prevLastDay - x + 1} handleDateClick={handleDateClick}/>
            );
        }
    
        // Current Month Dates
        for (let i = 1; i <= lastDay; i++) {
            if (
            i < new Date().getDate() &&
            date.getMonth() <= new Date().getMonth() &&
            date.getFullYear() <= new Date().getFullYear()
            ) {
            dateMatrixRow.push(
                <Day
                    key={`C${i}`} 
                    date={i} 
                    currMonth={loading ? false : true }
                    currDate 
                    handleDateClick={handleDateClick}
                    selected={i === selectedDate.day && date.getMonth() === selectedDate.month && date.getFullYear() === selectedDate.year}
                    availability={bookingDays.length > 0 ? bookingDays[i - 1].availabilityStatus !== 1 : false}
                />
            );
            } else {
            dateMatrixRow.push(
                <Day 
                    key={`C${i}`} 
                    date={i} 
                    currMonth={loading ? false : true }
                    handleDateClick={handleDateClick}
                    selected={i === selectedDate.day && date.getMonth() === selectedDate.month && date.getFullYear() === selectedDate.year}
                    availability={bookingDays.length > 0 ? bookingDays[i - 1].availabilityStatus !== 1 : false}
                />
            );
            }
    
            if (dateMatrixRow.length === 7) {
            dateMatrix.push(dateMatrixRow.splice(0, 7));
            }
        }

        // Next Month Dates
        for (let j = 1; j <= nextDays; j++) {
            dateMatrixRow.push(
                <Day key={`N${j}`} date={j} handleDateClick={handleDateClick}/>
            );
            if (dateMatrixRow.length === 7) {
            dateMatrix.push(dateMatrixRow.splice(0, 7));
            }
        }
        
        const dateMatrixTrans = dateMatrix[0]!.map((column, index) => (
            dateMatrix.map(week => ( week[index]))
        ))

        return (
            <div className={classes.calenderContainer}>
                {/* Header */}
                <div className={classes.headerContainer}>
                    <Grid container justify='space-between' alignItems='center'>
                        <Grid item>
                            <IconButton 
                                disabled={date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()}
                                onClick={() => {setOffset(offset - 1)}}
                            >
                                <KeyboardArrowLeftIcon style={{ color : 'white'}}/>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Grid container direction='column'>
                                <Grid item>
                                    <Typography variant='subtitle1' align='center'>
                                        {date.getFullYear()}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant='h5' align='center'>
                                        {months[date.getMonth()]}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={() => {setOffset(offset + 1)}}>
                                <KeyboardArrowRightIcon style={{ color : 'white'}}/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </div>
                { loading &&
                    <div className={classes.progressContainer}>
                        <LinearProgress />
                    </div>
                }
                {/* Body */}
                <div>
                    <Grid container spacing={1} className={classes.dayContainer}>
                        {
                        dateMatrixTrans.map((week, index) => (
                            <Grid key={`M1 - ${index}`} item>
                                <Grid container direction='column' spacing={1}>
                                    {week}
                                </Grid>
                            </Grid>
                        ))
                        }
                    </Grid>
                </div>
            </div>            
        )
}

export default Calender

