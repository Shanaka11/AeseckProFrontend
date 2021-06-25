import React from 'react'
// 3rd Party
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
import PackageList from '../componets/bookingpage/PackageList'
import BookingCalender from '../componets/bookingpage/BookingCalender'

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

// Const
const rooms = [
    {
        name: 'Room1',
        description: 'Room Short Description1',
        packages: [
            {
                packageName: 'Package11',
                description: '11 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, illum?',
                price: '1020.00'
            },
            {
                packageName: 'Package12',
                description: '12 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, illum?',
                price: '1023.00'
            },
            {
                packageName: 'Package13',
                description: '13 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, illum?',
                price: '1025.00'
            },                        
        ]
    },
]

const BookingPage = () => {
    // Style
    const classes = useStyles()
    
    // Data
    const imgPath = [
        'https://pro2-bar-s3-cdn-cf.myportfolio.com/f7b51595-7701-42b3-a966-bb0e4baf04df/8c4521a1-4ef2-47b9-89bc-5cca2dee6fc9_rw_1920.jpg?h=60885436fb2cdebd9b2bbf91299ba6e9',
        'https://images3.alphacoders.com/762/762380.png',
        'https://pro2-bar-s3-cdn-cf.myportfolio.com/f7b51595-7701-42b3-a966-bb0e4baf04df/8c4521a1-4ef2-47b9-89bc-5cca2dee6fc9_rw_1920.jpg?h=60885436fb2cdebd9b2bbf91299ba6e9',
        'https://images3.alphacoders.com/762/762380.png',
    ]    
    return (
        <Grid container direction='column'>
            <Carousal fixed>
                {
                    imgPath.map((item, index) => (
                            <Slide key={`slide-${index}`} index={index} imgPath={item}>
                                <Container className={classes.container}>
                                    <Grid container alignItems='center' justify='space-evenly' direction='column' className={classes.subContainer}>
                                        <Grid item>
                                            <Typography variant='h1' align='center' className={classes.header}>
                                                {'Bakery'}
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
            <div id='activities' className={classes.mainContainer}>
                <PackageList data={rooms[0].packages}/>
                <BookingCalender />
            </div>
        </Grid>
    )
}

export default BookingPage
