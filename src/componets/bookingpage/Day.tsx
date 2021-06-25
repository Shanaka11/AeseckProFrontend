// React Imports
import React from 'react'
// Material UI imports
import { makeStyles } from '@material-ui/styles'
import { 
    Grid, 
    Button, 
    Theme 
} from '@material-ui/core'

// Styles
const useStyles = makeStyles((theme:Theme) => ({
    container: {
        height: 50,
        maxWidth: 50,
        [theme.breakpoints.down('md')]:{
            height: 40,
            maxWidth: 40,
            minWidth: 40
        },
        [theme.breakpoints.down('xs')]:{
            height: 30,
            maxWidth: 30,
            minWidth: 30
        },        
    },
    selected: {
        backgroundColor: 'blue',
        color: 'white',
        '&:hover': {
            backgroundColor: 'blue',
            opacity: 0.7
        }
    },
    currentDate: {
        backgroundColor: 'green',
        color: 'white',
    },
    notCurrentDate:{
        backgroundColor: 'lightgrey',
    }
}))

// Interfaces
interface DayProps {
    date:number,
    currMonth?:boolean, 
    currDate?:boolean, 
    selected?: boolean, 
    handleDateClick: (date: number) => void
}

const Day:React.FC<DayProps> = ( { date, currMonth, currDate, selected, handleDateClick } ) => {

    // Styles
    const classes = useStyles()

    return (
        <Grid item>
            <Button
                onClick={() => handleDateClick(date)}
                disabled={!currMonth}
                className={`
                    ${classes.container}
                    ${(currDate && !selected) ? classes.currentDate : undefined} 
                    ${currMonth ? undefined : classes.notCurrentDate}
                    ${selected ? classes.selected : undefined}`}
                color='primary'
                variant='contained'
                size='small'
            >
                {date}
            </Button>
        </Grid>
    )
}

export default Day