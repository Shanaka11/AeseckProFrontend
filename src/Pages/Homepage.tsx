// TODO
// Fetch Data
// React Imports
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
import Description from '../componets/common/Descrition'
import List from '../componets/homepage/List'
import Slide from '../componets/common/Slide'

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

// const 
const listDataHome = [
    {
        name: 'ACTIVITY ROOM A',
        link: '/activitiA'
    },
    {
        name: 'ACTIVITY ROOM B',
        link: '/activitiB'
    },
    {
        name: 'ACTIVITY ROOM C',
        link: '/activitiC'
    },
    {
        name: 'ACTIVITY ROOM D',
        link: '/activitiD'
    },            
]

const listDataActivityCenter = {
    activityRoomTitle: 'ACTIVITY ROOM A',
    activities: [
        {
            name: 'ACTIVITY A',
            link: '/activitiA/room'
        },
        {
            name: 'ACTIVITY B',
            link: '/activitiB/room'
        },
        {
            name: 'ACTIVITY C',
            link: '/activitiC/room'
        },
        {
            name: 'ACTIVITY D',
            link: '/activitiD/room'
        }
    ]
}

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
                                                {params.activity ? listDataActivityCenter.activityRoomTitle : 'A Great Service Indeed'}
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
            <Description description={'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum architecto asperiores libero qui perferendis! Optio dolor ratione a recusandae molestiae tenetur architecto qui sequi atque ad quia nulla magnam quis, quas illum rerum quae nemo consequatur, officia molestias aliquam minima soluta sit? Voluptas earum accusamus cum? Unde asperiores, soluta cum dolore ipsam fugiat aut exercitationem incidunt vero culpa ad. Suscipit quae adipisci saepe atque quibusdam ipsam magni quod, sed cum minus dolorum, in, mollitia animi! Ullam, placeat numquam assumenda, saepe fuga ad laboriosam sequi voluptatem fugiat quod illum consequatur quidem voluptatum perspiciatis quaerat officiis. Consectetur quasi itaque hic ea inventore?'}/>
            <List id='activities' data={params.activity ? listDataActivityCenter.activities : listDataHome}/>
        </Grid>
    )
}

export default Homepage
