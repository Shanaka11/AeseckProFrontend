// React Imports
import React, {useContext} from 'react'
// 3rd Party
import { useParams, useHistory } from 'react-router-dom'
import { useQuery } from 'react-query'
// Material UI Imports
import { 
    Button,
    Container,
    Grid, 
    makeStyles,
    Theme,
    Typography,
    LinearProgress
} from '@material-ui/core'
// Local Imports
import Carousal from '../componets/common/Carousal'
import Description from '../componets/common/Descrition'
import List from '../componets/homepage/List'
import Slide from '../componets/common/Slide'
import { getOrganizationSummary } from '../api/organizationApi'
import { getActivityCenterSummary } from '../api/activityCenterApi'
import OrgContext from '../context/orgContext'
import UserContext from '../context/userContext'


// Style
const useStyles = makeStyles((theme:Theme)=> ({
    container:{
        height: '90%',
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
        textShadow: '-2px 2px 15px #000000',
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
    const history = useHistory()
    // Context
    const { setActivities, orgData, setOrgData, activityData, appendActivityDataList } = useContext(OrgContext)
    const { user } = useContext(UserContext)

    console.log(orgData)

    // Query
    const {
        data,
        isLoading, 
        isError 
    } = useQuery(
        'OrganizationSummery', 
        () => getOrganizationSummary(),
        {
            enabled : orgData ? false : true,
            onSuccess: (data: any) => orgDataFetchSuccessHandler(data),
            
        }
    )

    console.log(orgData ? false : true)

    const { 
        data:activityCenterData, 
        isLoading: activityCenterIsLoading, 
        isError:activityCenterIsError, 
    } = useQuery(   ['ActivityCenterSummery', params.activity], 
                    () => getActivityCenterSummary(params.activity!), 
                    { 
                        enabled : params.activity ? (params.activity !== 'aboutus' ? true : false): false
                    })

    
    const orgDataFetchSuccessHandler = (data:any) => {
        setOrgData(data?.data.response)
    }
    
    // IF user is admin then redirect to the dashboard
    if(user && user.role === 'admin') {
        history.push('/backoffice')
        return null
    }

    if(isLoading || activityCenterIsLoading || !orgData){
        return (
                <LinearProgress />
            )
    }

    if(isError || activityCenterIsError){
        console.log('There have been a server Error if the issue persists please contact support')
        return <></>
    }
    
    const response = data?.data.response//orgData   
    const activityCenterResponse = activityCenterData?.data.response

    // setOrgData(response)
    // if(response.activityCenters) {
    //     setActivities(response.activityCenters)
    // }

    return (
        <Grid container direction='column'>
            <Carousal>
                {
                    (params.activity ? 
                        (params.activity !== 'aboutus' ? 
                            response.activityCenters.filter((item:any) => item.id === parseInt(params.activity!))[0].images :
                            response.activityCenters.filter((item:any) => item.title === 'About Us')[0].images): 
                        response.images).filter((item:any) => item.imageCategory === 'HeaderImage').map((item:any, index:number) => (                            
                            <Slide key={`slide-${index}`} index={index} imgPath={item.imageUrl}>
                                <Container className={classes.container}>
                                    <Grid 
                                        container 
                                        alignItems='center' 
                                        justify='flex-end' 
                                        direction='column' 
                                        className={classes.subContainer}
                                    >
                                        <Grid item>
                                            <Typography variant='h2' align='center' className={classes.header}>
                                                {(params.activity && params.activity !== 'aboutus')? 
                                                response.activityCenters.filter((item:any) => item.id === parseInt(params.activity!))[0].title : 
                                                item.imageDescription}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                variant='contained'
                                                color='secondary'                                                
                                                onClick={(event) => {
                                                    let element = document.getElementById("activities");
                                                    if(params.activity === 'aboutus'){
                                                        element = document.getElementById("description");                                                        
                                                    }
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
            <Description id='description' description={(params.activity && params.activity !== 'aboutus')? response.activityCenters.filter((item:any) => item.id === parseInt(params.activity!))[0].description : response.description}/>
            { params.activity !== 'aboutus' &&
                <List 
                    id='activities' 
                    data={params.activity ? activityCenterResponse.activities : response.activityCenters}
                    activityCenter={params.activity}
                />
            }
        </Grid>
    )
}

export default Homepage
