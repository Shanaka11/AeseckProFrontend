// React Imports
import React, { useState } from 'react'
// 3rd Party
// Material UI Imports
import { 
    Grid,
    Hidden, 
    makeStyles,
    Theme,
    Slide,    
} from '@material-ui/core'
// Local Imports
import logo from '../assets/login.jpg'
import Login from '../componets/signInPage/Login'
import Register from '../componets/signInPage/Register'


// Style
const useStyles = makeStyles((theme: Theme) => ({
    mainContainer: {
        backgroundColor: theme.palette.primary.main,
        overflow: 'hidden'
    },
    container:{ 
        overflow: 'hidden'
    },
    imageContainer:{
        height: '100vh',
        width: '50vw',
        verticalAlign: 'bottom',
        objectFit: 'cover'
    }
  }));

const SignInPage:React.FC = () => {
    // Styles
    const classes = useStyles()

    // States
    const [page, setPage] = useState(1)    
  
    return (
        <Grid container className={classes.mainContainer}>
            <Hidden mdDown>
                <Grid item xs={6} className={classes.container}>
                    <img alt='login-img' src={logo} className={classes.imageContainer}/>
                </Grid>
            </Hidden>
            <Slide direction="left" in={page === 1} mountOnEnter unmountOnExit {...(page === 1 ? { timeout: 1000 } : {})}>
                <Grid item xs={12} lg={6}>
                    <Login handlePageChange={ setPage }/>
                </Grid>
            </Slide>
            <Slide direction="left" in={page === 2} mountOnEnter unmountOnExit {...(page === 2 ? { timeout: 1000 } : {})}>
                <Grid item xs={12} lg={6}>
                    <Register handlePageChange={ setPage } />
                </Grid>
            </Slide>
        </Grid>
    )
}

export default SignInPage
