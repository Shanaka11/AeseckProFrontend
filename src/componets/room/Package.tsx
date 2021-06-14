// React Imports
import React from 'react'
// 3rd Party
// Material UI Imports
import { 
    Grid,
    Theme,
    makeStyles,
    Typography,
    Button,
} from '@material-ui/core'
// Local Imports

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        padding: 16,
        marginBottom: 8,
        backgroundColor: theme.palette.primary.main,//'#499F68',
        color: theme.palette.text.primary,
        minHeight: 200
    },
    button: {
        backgroundColor: '#499F68',
        color: theme.palette.text.primary,
        '&:hover':{
            backgroundColor: '#63d68c',
        }
    },
  }));

// Interfaces
interface PackageData {
    packageName: string,
    description: string,
    price: string
}

interface PackageProps {
    data: PackageData
}

const Package:React.FC<PackageProps> = ( { data } ) => {
    // Style
    const classes = useStyles()    

    return (
            <Grid container direction='column' justify='space-between' className={classes.container}>
                <Grid item>
                    <Typography variant='h5'>
                        { data.packageName }
                    </Typography>                    
                </Grid>
                <Grid item>
                    <Typography variant='subtitle1'>
                        { data.description }
                    </Typography>                    
                </Grid>
                <Grid item>
                    <Grid container justify='space-between'>
                        <Grid item>
                            <Typography variant='h5'>
                                {`${data.price} AUD`}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                variant='contained'
                                color='primary'
                                className={classes.button}
                            >
                                Book Now
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>            
    )
}

export default Package
