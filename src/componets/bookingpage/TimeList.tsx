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
                            <Grid item>
                                <Typography variant='h6'>
                                    {`${item.startDateTime?.split('T')[1]} - ${item.endDateTime?.split('T')[1]} - ${item.availabilityStatus}`}
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
