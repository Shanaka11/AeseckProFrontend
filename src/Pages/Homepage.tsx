// TODO
// Fetch Data
// React Imports
import React from 'react'
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
import Carousal from '../componets/common/Carousal'
import Description from '../componets/common/Descrition'
import List from '../componets/homepage/List'
import Slide from '../componets/common/Slide'
import { getOrganizationSummary } from '../api/organizationApi'
import { getActivityCenterSummary } from '../api/activityCenterApi'


// Style
const useStyles = makeStyles((theme:Theme)=> ({
    container:{
        height: '80%',
        zIndex: 300,
        [theme.breakpoints.down('xs')]:{
            height: '60%'
        }        
    },
    subContainer: {
        height: '100%'
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
interface ParamsProps {
    activity?: string,
    room?: string
}

const Homepage = () => {

    // Style
    const classes = useStyles()

    // Router
    const params:ParamsProps = useParams()

    // Query
    const { data, error, isLoading, isError, isFetching } = useQuery('OrganizationSummery', () => getOrganizationSummary())
    const { 
        data:activityCenterData, 
        error:activityCenterError, 
        isLoading: activityCenterIsLoading, 
        isError:activityCenterIsError, 
        isFetching:activityCenterIsFetching
    } = useQuery('ActivityCenterSummery', () => getActivityCenterSummary(params.activity!), { enabled : params.activity ? true : false})

    if(isLoading || activityCenterIsLoading){
        return (
                <CircularProgress />
            )
    }
    
    const response = data?.data.response    
    const activityCenterResponse = activityCenterData?.data.response

    return (
        <Grid container direction='column'>
            <Carousal>
                {
                    (params.activity ? response.activityCenters.filter((item:any) => item.id === parseInt(params.activity!))[0].images : response.images).filter((item:any) => item.imageCategory === 'HeaderImage').map((item:any, index:number) => (                            
                            <Slide key={`slide-${index}`} index={index} imgPath={item.imageUrl}>
                                <Container className={classes.container}>
                                    <Grid container alignItems='center' justify='space-evenly' direction='column' className={classes.subContainer}>
                                        <Grid item>
                                            <Typography variant='h1' align='center' className={classes.header}>
                                                {params.activity ? response.activityCenters.filter((item:any) => item.id === parseInt(params.activity!))[0].title : item.imageDescription}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                variant='contained'
                                                color='secondary'                                                
                                                onClick={(event) => {
                                                    let element = document.getElementById("activities");
                                                    event.preventDefault();  // Stop Page Reloading
                                                    element && element.scrollIntoView({ behavior: "smooth", block: "start" });                                                    
                                                }}
                                            >
                                                Learn More
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Container>
                            </Slide>
                    ))                       
                }
            </Carousal>            
            <Description description={params.activity ? response.activityCenters.filter((item:any) => item.id === parseInt(params.activity!))[0].description : response.description}/>
                <List 
                    id='activities' 
                    data={params.activity ? activityCenterResponse.activities : response.activityCenters}
                    activityCenter={params.activity}
                />
        </Grid>
    )
}

export default Homepage
