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
} from '@material-ui/core'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
// Local Imports
import Day from './Day'

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
    handleDateSelectParent: (dayIndex: SelectedDate) => void    
}

const Calender:React.FC<Props> = ( { data, handleDateSelectParent } ) => {
        // Style
        const classes = useStyles()

        // States
        const [offset, setOffset] = useState(0)
        const [selectedDate, setSelectedDate] = useState<SelectedDate|1>(1)       

        const date = new Date();
        date.setMonth(date.getMonth() + offset);
    
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
        // Last Month Dates
        for (let x = firstDayIndex; x > 0; x--) {
            dateMatrixRow.push(
                <Day key={`P${x}`} date={prevLastDay - x + 1} handleDateClick={handleDateClick}/>
            );
        }
        
    
        // Current Month Dates
        for (let i = 1; i <= lastDay; i++) {
            if (
            i === new Date().getDate() &&
            date.getMonth() === new Date().getMonth() &&
            date.getFullYear() === new Date().getFullYear()
            ) {
            dateMatrixRow.push(
                <Day 
                    key={`C${i}`} 
                    date={i} 
                    currMonth={data[i - 1].availabilityStatus !== 0 }
                    currDate 
                    handleDateClick={handleDateClick}
                    selected={selectedDate !== 1 ? i === selectedDate.day && date.getMonth() === selectedDate.month && date.getFullYear() === selectedDate.year : false}
                />
            );
            } else {
            dateMatrixRow.push(
                <Day 
                    key={`C${i}`} 
                    date={i} 
                    currMonth={data[i - 1].availabilityStatus !== 0 }
                    handleDateClick={handleDateClick}
                    selected={selectedDate !== 1 && (i === selectedDate.day && date.getMonth() === selectedDate.month && date.getFullYear() === selectedDate.year)}
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
                            <IconButton onClick={() => {setOffset(offset - 1)}}>
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

