// React Imports
import React from 'react'
// 3rd Party
// Material UI Imports
import { 
    makeStyles,
    Theme,
    Grid,
    Container,
    Typography
} from '@material-ui/core'
// Local Imports

// Style
const useStyles = makeStyles((theme: Theme) => ({
    mainContainer:{
        backgroundColor: '#499F68',
        color: theme.palette.text.primary
    },
    text: {
      padding: '32px 0'
    },
  }));

// Interfaces
interface DescriptionProps {
    description: string
}

const Descrition:React.FC<DescriptionProps> = ( { description } ) => {

    // Styles
    const classes = useStyles()

    
    return (
        <Grid container alignItems='center' justify='center' className={classes.mainContainer}>
            <Container>
                <Typography variant='body1' align='center' className={classes.text}>
                    { description }
                </Typography>                
            </Container>            
        </Grid>
    )
}

export default Descrition
