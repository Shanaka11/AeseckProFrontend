// React Imports
import React, { useState } from 'react'
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
        backgroundColor: theme.palette.primary.main
    },
  }));

// Interface
interface Props {
    list: {
        startDateTime?:string,
        endDateTime?:string,
        availabilityStatus?: number
    }[],
    handleTimeSelect: (timeslot: string|undefined) => void
}

const TimeList:React.FC<Props> = ( { list, handleTimeSelect } ) => {
    // Styles
    const classes = useStyles()
    // States
    const [selectedIndex, setSelectedIndex] = useState(-1)

    return (
        <div className={classes.mainContainer}>
        <List className={classes.container} disablePadding>
            {
                list.map((item, index) => (
                    <ListItem 
                        key={`${item.startDateTime}`}
                        divider 
                        button                     
                        selected = {index === selectedIndex }
                        onClick = {() => { setSelectedIndex(index); handleTimeSelect(item.startDateTime?.split('T')[1]) }}
                    >
                        <Grid container>
                            <Grid item xs={8}>
                                <Grid container direction='column'>
                                    <Grid item>
                                        <Typography variant='h6' align='left'>
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
                                        <Typography variant='body1' align='left'>
                                            {
                                                index === 0 ?
                                                'Morning Session Description' :
                                                index === 1 ?
                                                'Evening Session Description' :
                                                'Afternoon Session Description'
                                            }
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant='body1' align='right'>
                                    {`${item.startDateTime?.split('T')[1]} - ${item.endDateTime?.split('T')[1]}`}
                                </Typography>
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
