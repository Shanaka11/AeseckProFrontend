// React Imports
import React from 'react'
// 3rd Party
// Material UI Imports
import { 
    Grid,
    Theme,
    makeStyles,
    Typography,
    List,
    ListItem,
} from '@material-ui/core'
// Local Imports

// Style
const useStyles = makeStyles((theme: Theme) => ({
    mainContainer:{
        padding: 16,
        backgroundColor: theme.palette.primary.dark,
        height: 'calc(100% - 32px)'
    },
    container: {        
        backgroundColor: theme.palette.primary.main,
        width:400,
        [theme.breakpoints.down('xs')]:{
            width: '250px'
        }
    },
    listItemSelected: {
        backgroundColor: `${theme.palette.secondary.light} !important`
    },
    listItemNotAvailable: {
        backgroundColor: theme.palette.secondary.dark
    }
  }));

// Interface
interface Props {
    list: {
        id?:number,
        startDateTime?:string,
        endDateTime?:string,
        availabilityStatus?: number
    }[],
    handleTimeSelect: (timeslot: any|undefined) => void,
    selectedTime?: {
        id: number,
        label: string,
        date: string
    }
}

const TimeList:React.FC<Props> = ( { list, handleTimeSelect, selectedTime } ) => {
    // Styles
    const classes = useStyles()

    return (
        <div className={classes.mainContainer}>
        <List className={classes.container} disablePadding>
            {
                list.map((item, index) => (
                    <ListItem 
                        key={`${item.startDateTime}`}
                        classes={{
                            selected: classes.listItemSelected
                        }}
                        className={`
                            ${item.availabilityStatus !== 1 ? classes.listItemNotAvailable : undefined}
                        `}
                        divider 
                        button                     
                        selected = {item.startDateTime?.split('T')[0] === selectedTime?.date && item.startDateTime?.split('T')[1]  === selectedTime?.label}
                        onClick = {
                            () => handleTimeSelect({
                                id: item.id,
                                label: item.startDateTime?.split('T')[1],
                                date: item.startDateTime?.split('T')[0],
                                availability: item.availabilityStatus
                            })
                        }
                    >
                        <Grid container>
                            <Grid item xs={12}>
                                <Grid container direction='column' spacing={1} justify='space-between'>
                                    <Grid item>
                                        <Typography variant='h4' component='h4' align='center'>
                                            {
                                                index === 0 ?
                                                'Morning Session' :
                                                index === 1 ?
                                                'Afternoon Session' :
                                                'Evening Session'
                                            }
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant='body1' align='center'>
                                            {
                                                index === 0 ?
                                                'Morning Session Description' :
                                                index === 1 ?
                                                'Evening Session Description' :
                                                'Afternoon Session Description'
                                            }
                                        </Typography>
                                    </Grid>
                                    <Grid>
                                        <Typography variant='h5' component='h5' align='center'>
                                            {`${item.startDateTime?.split('T')[1]} - ${item.endDateTime?.split('T')[1]}`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </ListItem>                    
                ))
            }           
        </List>
        </div>
    )
}

export default TimeList
