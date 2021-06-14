import React from 'react'
// 3rd Party
import { useParams } from 'react-router-dom'
// Material UI Imports
import { 
    Button,
    Container,
    Grid, 
    makeStyles,
    Theme,
    Typography,
} from '@material-ui/core'
// Local Imports
import Carousal from '../componets/common/Carousal'
import Slide from '../componets/common/Slide'
import RoomList from '../componets/room/RoomList'

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

const room = {
    activityTitle: 'ACTIVITY A',
    rooms: [
        {
            name: 'ROOM A',
            link: '/activitiA'
        },
        {
            name: 'ROOM B',
            link: '/activitiA'
        },
        {
            name: 'ROOM C',
            link: '/activitiA'
        },
        {
            name: 'ROOM D',
            link: '/activitiA'
        }
    ]
}

// Interface
interface ParamsProps {
    activity?: string,
    room?: string
}

const RoomPage = () => {

    // Style
    const classes = useStyles()

    // Router
    const params:ParamsProps = useParams()
    
    // Data
    const imgPath = [
        'https://pro2-bar-s3-cdn-cf.myportfolio.com/f7b51595-7701-42b3-a966-bb0e4baf04df/8c4521a1-4ef2-47b9-89bc-5cca2dee6fc9_rw_1920.jpg?h=60885436fb2cdebd9b2bbf91299ba6e9',
        'https://images3.alphacoders.com/762/762380.png',
        'https://pro2-bar-s3-cdn-cf.myportfolio.com/f7b51595-7701-42b3-a966-bb0e4baf04df/8c4521a1-4ef2-47b9-89bc-5cca2dee6fc9_rw_1920.jpg?h=60885436fb2cdebd9b2bbf91299ba6e9',
        'https://images3.alphacoders.com/762/762380.png',
    ]

    return (
        <Grid container direction='column'>
            <Carousal>
                {
                    imgPath.map((item, index) => (
                            <Slide key={`slide-${index}`} index={index} imgPath={item}>
                                <Container className={classes.container}>
                                    <Grid container alignItems='center' justify='space-evenly' direction='column' className={classes.subContainer}>
                                        <Grid item>
                                            <Typography variant='h1' align='center' className={classes.header}>
                                                {params.room ? room.activityTitle : 'A Great Service Indeed'}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                variant='contained'
                                                color='primary'                                                
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
            <RoomList id='activities'/>
        </Grid>
    )
}

export default RoomPage
