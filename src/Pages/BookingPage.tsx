import React, { useState, useEffect } from 'react'
// 3rd Party
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
// Material UI Imports
import { 
    Button,
    Container,
    Grid, 
    makeStyles,
    Theme,
    Typography,
    CircularProgress
} from '@material-ui/core'
// Local Imports
import Carousal from '../componets/bookingpage/BookingCarousal'
import Slide from '../componets/bookingpage/BookingSlide'
import PackageList from '../componets/bookingpage/_PackageList'
import BookingCalender from '../componets/bookingpage/_BookingCalender'
import Booking from '../componets/bookingpage/Booking'
import { getPackages } from '../api/bookingApi'
import { useGetQueryParams } from '../utils/hooks/useQueryHook'

// Style
const useStyles = makeStyles((theme:Theme)=> ({   
    mainContainer: {
        backgroundImage: "url('https://i.redd.it/lsa3lv6c2r651.png')",
        backgroundColor: '#499F68',
        backgroundBlendMode: 'screen',
        color: theme.palette.text.primary
    },    
    header: {
        color: 'white',
        fontWeight: 'bold',
        [theme.breakpoints.down('xs')]:{
            fontSize: '3em'
        }
    },
}))

// Interface
interface Package {
    id: number,
    name: string,
    price: number
}

const BookingPage = () => {
    // Style
    const classes = useStyles()

    // Router
    const params:any = useParams()
    const queryParams:URLSearchParams = useGetQueryParams()

    // States
    const [activeActivityId, setActiveActivityId] = useState(-1)
    const [activePackage, setActivePackage] = useState<Package>()
    const [show, setShow] = useState(true)

    // Query
    const { 
        data, 
        error, 
        isLoading, 
        isError, 
        isFetching
    } = useQuery('PackageSummery', () => getPackages(params.activity))    

    // UseEffect
    useEffect(() => {

        setActiveActivityId(parseInt(queryParams.get("activity")!))

    }, [])

    // Methods
    const handleStepChange = (id:number) => {
        setActiveActivityId(response[id].id)
        setShow(false)
        setTimeout(() => setShow(true), 500)
    }

    const handlePackageChange = (selectedPackage: Package) => {
        setActivePackage(selectedPackage)
    }

    const decodePackage = (packageRaw:any) => {
        return {
            id: packageRaw.id,
            name: packageRaw.displayName,
            price: packageRaw.genericFinanceRate.netAmount            
        }
    }

    if(isLoading || activeActivityId === -1){
        return (
                <CircularProgress />
            )
    }    

    const response = data?.data.response  

    return (
        <Grid container direction='column'>
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
                {/* Replace Package List and the Booking Calender with the new Booking Component */}
                <Booking data={response.filter((item:any) => item.id === activeActivityId)[0]}/>
                {/* <PackageList 
                    data={response.filter((item:any) => item.id === activeActivityId)[0].packages} show={show} handlePackageChangeParent={handlePackageChange}
                />
                {console.log(activePackage)}
                { response.filter((item:any) => item.id === activeActivityId)[0].packages[0] &&
                    <BookingCalender 
                        activityName={response.filter((item:any) => item.id === activeActivityId)[0].title} 
                        activePackage={activePackage ? activePackage : decodePackage(response.filter((item:any) => item.id === activeActivityId)[0].packages[0])}/>
                } */}
            </div>
        </Grid>
    )
}

export default BookingPage
