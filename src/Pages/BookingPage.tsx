import React, { useState, useEffect } from 'react'
// 3rd Party
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
// Material UI Imports
import { 
    Grid, 
    makeStyles,
    Theme,
    Typography,
    LinearProgress
} from '@material-ui/core'
// Local Imports
import Carousal from '../componets/bookingpage/BookingCarousal'
import Slide from '../componets/bookingpage/BookingSlide'
import Booking from '../componets/bookingpage/Booking'
import { getPackages } from '../api/bookingApi'
import { useGetQueryParams } from '../utils/hooks/useQueryHook'

// Style
const useStyles = makeStyles((theme:Theme)=> ({   
    mainContainer: {
        backgroundColor: theme.palette.primary.main,
        backgroundBlendMode: 'screen',
        color: theme.palette.text.primary
    },    
    header: {
        color: 'white',
        fontWeight: 'bold',
        textShadow: '-2px 2px 15px #000000',
        [theme.breakpoints.down('xs')]:{
            fontSize: '3em'
        }
    },
    container: {
        overflow: 'hidden'
    }
}))

// Interface

const BookingPage = () => {
    // Style
    const classes = useStyles()

    // Router
    const params:any = useParams()
    const queryParams:URLSearchParams = useGetQueryParams()

    // States
    const [activeActivityId, setActiveActivityId] = useState(-1)

    // Query
    const { 
        data, 
        // error, 
        isLoading, 
        // isError, 
        // isFetching
    } = useQuery('PackageSummery', () => getPackages(params.activity || 1))    

    // UseEffect
    useEffect(() => {

        setActiveActivityId(parseInt(queryParams.get("activity")!) || 1)

    }, [])

    // Methods
    const handleStepChange = (id:number) => {
        setActiveActivityId(response[id].id)
    }

    if(isLoading || activeActivityId === -1){
        return (
                <LinearProgress />
            )
    }    

    const response = data?.data.response  

    return (
        <Grid container direction='column' className={classes.container}>
            <div id='activities' className={classes.mainContainer}>
                <Carousal fixed handleStepChangeParent={handleStepChange} startStep={response.map((item:any, index:number) => { return item.id }).indexOf(activeActivityId)}>
                    {
                        response.map((item:any, index:number) => (
                            <Slide key={`slide-${index}`} index={index} imgPath={item.images[0] ? item.images[0].imageUrl : undefined}>
                                <Typography variant='h1' align='center' className={classes.header}>
                                    {item.title}
                                </Typography>
                            </Slide>
                        ))                       
                    }
                </Carousal>    
                <Booking data={response.filter((item:any) => item.id === activeActivityId)[0]}/>
            </div>
        </Grid>
    )
}

export default BookingPage
