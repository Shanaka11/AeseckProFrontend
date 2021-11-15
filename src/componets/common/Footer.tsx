// TODO
// Submit Button functionality
// Social Buttons

// React Imports
import React from 'react'
// 3rd Party
import { useLocation } from 'react-router-dom'
// Material UI Imports
import { 
    makeStyles,
    Theme,
    Grid,
    Container,
    Typography,
    TextField,
    Button,
    Divider,
} from '@material-ui/core'
// Local Imports
import { ReactComponent as Facebook } from '../../assets/facebook.svg';
import { ReactComponent as Instagram } from '../../assets/instagram.svg';
import { ReactComponent as Twitter } from '../../assets/twitter.svg';

// Style
const useStyles = makeStyles((theme: Theme) => ({

    footerContainer:{        
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.primary
    },
    footerContainerGrid: {
        padding: '24px 0',
    },
    gridItem:{
        marginBottom: 16
    },
    textField: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.text.primary,
    },
    textFieldLabel: {
        color: '#ffffff',//theme.palette.primary.dark,
        opacity: 0.7
    },
    textFieldUnderline: {
        '&:before':{
            borderColor: '#ffffff'//theme.palette.secondary.main,
        }
    },
    footerButton: {
        marginLeft: 'auto',
        // backgroundColor: '#499F68',
        // color: theme.palette.text.primary,
        // '&:hover':{
        //     backgroundColor: '#63d68c',
        // }
    },
    divider:{
        backgroundColor: '#ffffff'//theme.palette.secondary.main
    },
    address:{
        padding: '8px 0',
        [theme.breakpoints.down('xs')]:{
            fontSize: '0.8em',
            textAlign: 'center'
        }           
    },
    socialIcons: {
        height: 40,
        width: 40,
        fill: 'white',
        marginRight: 20,
        cursor: 'pointer',
        [theme.breakpoints.down('xs')]:{
            height: 30,
            width: 30,
            marginRight: 15,
        },
        '&:hover': {
            fill: '#f0f0f0'
        }
    },
}))

const Footer = () => {

    // Style
    const classes = useStyles()

    // Routers
    const location = useLocation()

    // Methods
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    if(location.pathname === '/login' || location.pathname === '/checkinout' || location.pathname.includes('backoffice')){
        return (<></>)
    }    

    return (
        <div id='footer' className={classes.footerContainer}>
        <Container>
            <Grid container spacing={1} className={classes.footerContainerGrid}>            
                <Grid item xs={12} md={6}>
                    <Grid container direction='column'>
                        <Typography variant='h6' className={classes.gridItem}>
                            Contact Us
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid item className={classes.gridItem}>
                                <TextField 
                                    // className={classes.textField}
                                    label='Email Address'
                                    variant='filled'
                                    color='secondary'
                                    InputLabelProps={{
                                        className: classes.textFieldLabel,
                                    }}
                                    InputProps={{
                                        className: classes.textField,
                                        classes:{
                                            underline: classes.textFieldUnderline
                                        }
                                    }}                                    
                                    fullWidth
                                />
                            </Grid>
                            <Grid item className={classes.gridItem}>
                                <TextField
                                    label='Message'
                                    variant='filled'
                                    multiline
                                    rows={4}
                                    color='secondary'
                                    InputLabelProps={{
                                        className: classes.textFieldLabel,
                                    }}                                    
                                    InputProps={{
                                        className: classes.textField,
                                        classes:{
                                            underline: classes.textFieldUnderline
                                        }                                        
                                    }}       
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <Grid container>
                                    <a href='https://www.facebook.com' rel='noopener noreferrer' target='_blank'>
                                        <Facebook className={classes.socialIcons}/>
                                    </a>
                                    <a href='https://www.instagram.com' rel='noopener noreferrer' target='_blank'>
                                        <Instagram className={classes.socialIcons} />
                                    </a>
                                    <a href='https://www.twitter.com' rel='noopener noreferrer' target='_blank'>
                                        <Twitter className={classes.socialIcons}/>
                                    </a>
                                    <Button
                                        type='submit'
                                        variant='contained'
                                        disableElevation
                                        color='secondary'
                                        className={classes.footerButton}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container direction='column'>
                        <Grid item className={classes.gridItem}>
                            <Typography variant='h6'>
                                Map
                            </Typography>
                        </Grid>
                        <Grid item className={classes.gridItem}>
                            <iframe 
                                title='com-center-location-main'
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3140.3707570642514!2d145.24007731532646!3d-38.08503297970404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0!2zMzjCsDA1JzA2LjEiUyAxNDXCsDE0JzMyLjIiRQ!5e0!3m2!1sen!2slk!4v1635994275467!5m2!1sen!2slk" 
                                width="100%" 
                                height="237" 
                                frameBorder='0px'
                                loading="lazy" />
                        </Grid>
                    </Grid>
                </Grid>            
            </Grid>
        </Container>
        <Divider className={classes.divider}/>
        <Grid container alignItems='center' justify='center'>
            <Grid item>
                <Typography variant='subtitle1' className={classes.address}>
                    1 Lonhro Blvd, Cranbourne West, VIC 3977
                </Typography>
            </Grid>
        </Grid>
        </div>
    )
}

export default Footer
