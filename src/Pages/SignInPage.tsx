// React Imports
import React, { useState, useContext } from 'react'
// 3rd Party
import { useHistory } from 'react-router-dom'
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
import UserContext from '../context/userContext'
import { useEffect } from 'react'


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

    // Routing
    const history = useHistory()

    // Context
    const { user } = useContext(UserContext)

    useEffect(() => {
        if(user){
            if(user.role === 'admin'){
                history.push('/backoffice')
            }else{
                // redirect
                history.push('/')
            }
        }
    },
    [user, history])
  
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
