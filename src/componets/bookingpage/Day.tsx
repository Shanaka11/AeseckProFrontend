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
        backgroundColor: `${theme.palette.secondary.main} !important`,
        color: 'white',
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            opacity: 0.7
        }
    },
    currentDate: {
        backgroundColor: theme.palette.secondary.main,
        color: 'white',
    },
    notCurrentDate:{
        backgroundColor: 'lightgrey',
    },
    alreadyBooked: {
        backgroundColor: theme.palette.secondary.dark
    },
    header: {
        backgroundColor: `${theme.palette.primary.dark} !important`,
        color: `${theme.palette.text.primary} !important`
    }
}))

// Interfaces
interface DayProps {
    date:number,
    currMonth?:boolean, 
    currDate?:boolean, 
    selected?: boolean, 
    availability?:boolean
    handleDateClick: (date: number) => void
    header?: boolean
}

const Day:React.FC<DayProps> = ( { date, currMonth, currDate, selected, availability, handleDateClick, header } ) => {

    // Styles
    const classes = useStyles()

    // Methods
    const decodeHeader = (date: number) => {
        switch(date){
            case 1:
                return 'Su'
            case 2:
                return 'Mo'
            case 3:
                return 'Tu'
            case 4:
                return 'We'
            case 5:
                return 'Th'
            case 6:
                return 'Fr'
            case 7:
                return 'Sa'
        }
    }

    return (
        <Grid item>
            <Button
                onClick={() => handleDateClick(date)}
                disabled={!currMonth || currDate}
                className={`
                    ${classes.container}
                    ${currMonth ? undefined : classes.notCurrentDate}
                    ${selected ? classes.selected : undefined}
                    ${availability ? classes.alreadyBooked : undefined}
                    ${header && classes.header }`
                }
                color='primary'
                variant='contained'
                size='small'
            >
                {   
                    header ? 
                        decodeHeader(date)
                    : 
                    date
                }
            </Button>
        </Grid>
    )
}

export default Day