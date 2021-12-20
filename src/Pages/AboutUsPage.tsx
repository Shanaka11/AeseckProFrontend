// React Imports
import React from 'react'
// 3rd Party
// Material UI Imports
import { 
    Hidden,
    Container,
    Grid, 
    makeStyles,
    Theme,
    Typography,
} from '@material-ui/core'
// Local Imports
import Carousal from '../componets/common/Carousal'
import Slide from '../componets/common/Slide'

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    container:{
        height: 250,
        zIndex: 300,
        [theme.breakpoints.down('xs')]:{
            height: 150
        }        
    },
    subContainer: {
        height: '100%'
    },    
    header: {
        color: 'white',
        fontWeight: 'bold',
        textShadow: '-2px 2px 5px #000000',
        [theme.breakpoints.down('xs')]:{
            fontSize: '3em'
        }
    },
    mainContainer:{
        backgroundColor: '#499F68',
        color: theme.palette.text.primary,
        paddingTop: theme.spacing(1),
        // paddingLeft: theme.spacing(1)
    },
    subTextContainer: {
        backgroundColor: '#499F68',
        paddingBottom: theme.spacing(2)
    },
    text: {
      padding: '32px 0 0 0'
    },
    textBottom: {
        padding: '32px 0'
    },
    image:{
        // height: 200,
        width: 300,
        verticalAlign: 'bottom',
        objectFit: 'cover',
        // [theme.breakpoints.down('md')]:{
        //     height: 'calc(100vh - 150px)',
        // },
        // [theme.breakpoints.down('xs')]:{
        //     height: 'calc(100vh - 200px)',
        // }, 
    },
    imageMainContainer:{
        height: 691
    },
    imageContainer: {
        height: '100%'
    }
}))

const AboutUsPage = () => {
    // Style
    const classes = useStyles()

    const slides = [
        <Slide 
            key={`slide-about-us`} 
            index={0} 
            imgPath={'https://news.tcc.edu/wp-content/uploads/2019/11/Community-Day.HERO_.jpeg'}
            aboutUs
        >
                    <Container className={classes.container}>
                        <Grid 
                            container 
                            alignItems='center' 
                            justify='center' 
                            direction='column' 
                            className={classes.subContainer}
                        >
                            <Grid item>
                                <Typography variant='h2' align='center' className={classes.header}>
                                    About Us
                                </Typography>
                            </Grid>
                        </Grid>
                    </Container>
        </Slide>
    ] 
    return (
        <Grid container direction='column' className={classes.subTextContainer}>
            <Carousal aboutUs>
                {slides}
            </Carousal> 
            <Container>           
                <Grid 
                    id='description' 
                    container 
                    alignItems='center' 
                    justify='center' 
                    className={classes.mainContainer}
                    spacing={2}
                >
                    <Hidden smDown>
                        <Grid item xs={6} className={classes.imageMainContainer}>
                            <Grid 
                                container 
                                justify='center' 
                                alignItems='center'
                                direction='column'
                                className={classes.imageContainer}
                            >
                                <Grid item>
                                    <img
                                        className={classes.image}           
                                        src='https://www.bundaberg.qld.gov.au/bundaberg-corporate/images/Diverse_community_group_holding_hands_web_1.jpg'
                                        alt='aboutImage'
                                    />
                                </Grid>
                                <Grid item>
                                    <img
                                        className={classes.image}           
                                        src='https://destinationartscenter.com/wp-content/uploads/2020/08/Online-School_little-boy.jpg'
                                        alt='aboutImage'
                                    />
                                </Grid>
                                <Grid item>
                                    <img
                                        className={classes.image}           
                                        src='https://media.weddingz.in/images/97aed5bc8717fbda288ee6311f96637a/patiala-house-party-room-napier-town-jabalpur.jpg'
                                        alt='aboutImage'
                                    />
                                </Grid>
                                <Hidden mdDown>
                                    <Grid item>
                                        <img
                                            className={classes.image}             
                                            src='https://cinnamonweb.blob.core.windows.net/cinnamonweb-prd/dining_wellness/gymnasiums-grand-530X420.jpg'
                                            alt='aboutImage'
                                        />
                                    </Grid>
                                    <Grid item>
                                        <img
                                            className={classes.image}             
                                            src='https://www.ci.healdsburg.ca.us/ImageRepository/Document?documentID=10197'
                                            alt='aboutImage'
                                        />
                                    </Grid>
                                </Hidden>
                            </Grid>
                        </Grid>
                    </Hidden>
                    <Grid item sm={6} xs={12}>
                        {/* <Button
                            variant='contained'
                            color='secondary'
                            disableElevation
                        >
                            About Us
                        </Button> */}
                        <Typography variant='subtitle2' component='p' align='justify' className={classes.text}>
                            Frolicz Family Hub is a state of art indoor family entertainment facility located in South East Victoria. We are not just another kid’s play centre. Our uniquely designed playground has variety of play areas for kids from 1 to 12 years. While kids are having fun at the play facility, either parents can relax at our café and enjoy a delicious café meal with a coffee made from high quality coffee beans or workout at our spacious high-quality gymnasium while observing kids. 
                        </Typography>
                        <Typography variant='subtitle2' component='p' align='justify' className={classes.text}>
                            During the parents’ workouts at the gymnasium, they can monitor and observe the kids playing at the play facility through the glass windows or through the coloured screen displays at the play facility monitored by six cameras. Our facility provides high security for the kids and has a compulsory check-in and check-out system monitored by our staff members at the entry and exit. Therefore, parents can relax and enjoy the time at the gymnasium. 
                        </Typography>
                        <Typography variant='subtitle2' component='p' align='justify' className={classes.text}>
                            Our play centre is not only open for casual visits. You can book our one of the 5 party rooms offering variety of party packages. Our three activity party rooms are themed with science, bakery and art & craft and will entertain the kids with fully guided fun activities during the party. Not only that, but you can also book one of our non-activity party room and celebrate your kid’s special occasion. Whichever party package you select, your kids and friends will get unlimited play time at our play facility. 
                        </Typography>
                        <Typography variant='subtitle2' component='p' align='justify' className={classes.text}>
                            Through our education hub, you can occupy your child to use their time to improve their skills and knowledge in many things. Our facility provides high quality tutoring for various courses in technology and non-technology courses. Your child can select his/her preferred course through the variety of educational programs offered by us. At Frolicz we try to develop our kids’ skills to cater the modern technology-led world.  
                        </Typography>
                        <Typography variant='subtitle2' component='p' align='justify' className={classes.textBottom}>
                            You can visit Frolicz casually or can become a member by paying a fee and use our facility unlimitedly. Contact us today and find out your best option. 
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Grid>
    )
}

export default AboutUsPage
