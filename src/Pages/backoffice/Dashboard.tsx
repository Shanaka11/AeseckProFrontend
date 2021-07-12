// React Imports
import React, { useState } from 'react'
// 3rd Party
import { useHistory } from 'react-router-dom'
// Material UI Imports
import { 
    makeStyles,
    Theme,
    Button,
    Container,
    Grid
} from '@material-ui/core'
// Local Imports

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    container:{        
        height: 'calc(100vh - 64px)'
    },
    button: {
        height: 100,
        width: 120
    }
}))

const Dashboard:React.FC = () => {
    // Style
    const classes = useStyles()

    // Routes
    const history = useHistory()

    // Methods
    const handleNavigation = (id: number) => {
        switch(id){
            case 1:
                history.push('/backoffice/bookings')
                break;
            case 2:
                history.push('/backoffice/users')
                break;
            case 3:
                history.push('/backoffice/activitycenters')
                break;
            case 4:
                history.push('/backoffice/activities')
                break;                                    
        }
    }

    return (
        <Container>
            <Grid container justify='center' alignContent='center' className={classes.container} spacing={3}>
                <Grid item>
                    <Button
                        variant='contained'
                        color='secondary'
                        className={classes.button}
                        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleNavigation(1)}
                    >
                        Bookings
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant='contained'
                        color='secondary'
                        className={classes.button}
                        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleNavigation(2)}
                    >
                        Users
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant='contained'
                        color='secondary'
                        className={classes.button}
                        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleNavigation(3)}
                    >
                        Activity Centers
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant='contained'
                        color='secondary'
                        className={classes.button}
                        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleNavigation(4)}
                    >
                        Activity
                    </Button>
                </Grid>                                                
            </Grid>
        </Container>
    )
}

export default Dashboard
