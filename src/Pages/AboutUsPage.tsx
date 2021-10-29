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
} from '@material-ui/core'
// Local Imports
import Carousal from '../componets/common/Carousal'
import Slide from '../componets/common/Slide'

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
        [theme.breakpoints.down('xs')]:{
            fontSize: '3em'
        }
    },
    mainContainer:{
        backgroundColor: '#499F68',
        color: theme.palette.text.primary
    },
    text: {
      padding: '32px 0 0 0'
    },
    textBottom: {
        padding: '32px 0'
    }
}))

const AboutUsPage = () => {
    // Style
    const classes = useStyles()

    //const description = 'Frolicz Family Hub is a state of art indoor family entertainment facility located in South East Victoria. We are not just another kid’s play centre. Our uniquely designed playground has variety of play areas for kids from 1 to 12 years. While kids are having fun at the play facility, either parents can relax at our café and enjoy a delicious café meal with a coffee made from high quality coffee beans or workout at our spacious high-quality gymnasium while observing kids. During the parents’ workouts at the gymnasium, they can monitor and observe the kids playing at the play facility through the glass windows or through the coloured screen displays at the play facility monitored by six cameras. Our facility provides high security for the kids and has a compulsory check-in and check-out system monitored by our staff members at the entry and exit. Therefore, parents can relax and enjoy the time at the gymnasium. Our play centre is not only open for casual visits. You can book our one of the 5 party rooms offering variety of party packages. Our three activity party rooms are themed with science, bakery and art & craft and will entertain the kids with fully guided fun activities during the party. Not only that, but you can also book one of our non-activity party room and celebrate your kid’s special occasion. Whichever party package you select, your kids and friends will get unlimited play time at our play facility. Through our education hub, you can occupy your child to use their time to improve their skills and knowledge in many things. Our facility provides high quality tutoring for various courses in technology and non-technology courses. Your child can select his/her preferred course through the variety of educational programs offered by us. At Frolicz we try to develop our kids’ skills to cater the modern technology-led world. You can visit Frolicz casually or can become a member by paying a fee and use our facility unlimitedly. Contact us today and find out your best option.' 

    const description = `Frolicz Family Hub is a state of art indoor family entertainment facility located in South East Victoria. We are not just another kid’s play centre. Our uniquely designed playground has variety of play areas for kids from 1 to 12 years. While kids are having fun at the play facility, either parents can relax at our café and enjoy a delicious café meal with a coffee made from high quality coffee beans or workout at our spacious high-quality gymnasium while observing kids. 
    During the parents’ workouts at the gymnasium, they can monitor and observe the kids playing at the play facility through the glass windows or through the coloured screen displays at the play facility monitored by six cameras. Our facility provides high security for the kids and has a compulsory check-in and check-out system monitored by our staff members at the entry and exit. Therefore, parents can relax and enjoy the time at the gymnasium. 
    Our play centre is not only open for casual visits. You can book our one of the 5 party rooms offering variety of party packages. Our three activity party rooms are themed with science, bakery and art & craft and will entertain the kids with fully guided fun activities during the party. Not only that, but you can also book one of our non-activity party room and celebrate your kid’s special occasion. Whichever party package you select, your kids and friends will get unlimited play time at our play facility. 
    Through our education hub, you can occupy your child to use their time to improve their skills and knowledge in many things. Our facility provides high quality tutoring for various courses in technology and non-technology courses. Your child can select his/her preferred course through the variety of educational programs offered by us. At Frolicz we try to develop our kids’ skills to cater the modern technology-led world.  
    You can visit Frolicz casually or can become a member by paying a fee and use our facility unlimitedly. Contact us today and find out your best option.`
    const slides = [
                <Slide key={`slide-about-us`} index={0} imgPath={'https://image.shutterstock.com/z/stock-photo-about-us-details-contact-data-info-communication-concept-377373607.jpg'}>
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
                                    About Us
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant='contained'
                                    color='secondary'                                                
                                    onClick={(event) => {
                                        const element = document.getElementById("description");                                                        
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
    ] 
    return (
        <Grid container direction='column'>
            <Carousal>
                {slides}
            </Carousal>            
            <Grid id='description' container alignItems='center' justify='center' className={classes.mainContainer}>
                <Container>
                    <Typography variant='body1' component='p' align='center' className={classes.text}>
                        Frolicz Family Hub is a state of art indoor family entertainment facility located in South East Victoria. We are not just another kid’s play centre. Our uniquely designed playground has variety of play areas for kids from 1 to 12 years. While kids are having fun at the play facility, either parents can relax at our café and enjoy a delicious café meal with a coffee made from high quality coffee beans or workout at our spacious high-quality gymnasium while observing kids. 
                    </Typography>
                    <Typography variant='body1' component='p' align='center' className={classes.text}>
                        During the parents’ workouts at the gymnasium, they can monitor and observe the kids playing at the play facility through the glass windows or through the coloured screen displays at the play facility monitored by six cameras. Our facility provides high security for the kids and has a compulsory check-in and check-out system monitored by our staff members at the entry and exit. Therefore, parents can relax and enjoy the time at the gymnasium. 
                    </Typography>
                    <Typography variant='body1' component='p' align='center' className={classes.text}>
                        Our play centre is not only open for casual visits. You can book our one of the 5 party rooms offering variety of party packages. Our three activity party rooms are themed with science, bakery and art & craft and will entertain the kids with fully guided fun activities during the party. Not only that, but you can also book one of our non-activity party room and celebrate your kid’s special occasion. Whichever party package you select, your kids and friends will get unlimited play time at our play facility. 
                    </Typography>
                    <Typography variant='body1' component='p' align='center' className={classes.text}>
                        Through our education hub, you can occupy your child to use their time to improve their skills and knowledge in many things. Our facility provides high quality tutoring for various courses in technology and non-technology courses. Your child can select his/her preferred course through the variety of educational programs offered by us. At Frolicz we try to develop our kids’ skills to cater the modern technology-led world.  
                    </Typography>
                    <Typography variant='body1' component='p' align='center' className={classes.textBottom}>
                        You can visit Frolicz casually or can become a member by paying a fee and use our facility unlimitedly. Contact us today and find out your best option. 
                    </Typography>
                </Container>            
            </Grid>
            {/* { params.activity !== 'aboutus' &&
                <List 
                    id='activities' 
                    data={params.activity ? activityCenterResponse.activities : response.activityCenters}
                    activityCenter={params.activity}
                />
            } */}
        </Grid>
    )
}

export default AboutUsPage
