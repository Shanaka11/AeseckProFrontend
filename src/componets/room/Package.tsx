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
import Link from '../common/Link'

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        padding: 16,
        marginBottom: 8,
        backgroundColor: theme.palette.primary.main,//'#499F68',
        color: theme.palette.text.primary,
        minHeight: 200
    },
    containerSelected: {
        background: `${theme.palette.primary.dark} !important`
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
    data: PackageData,
    activity: string,
    roomId: string,
}

const Package:React.FC<PackageProps> = ( { data, activity, roomId } ) => {
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
                            <Link to={`/${activity}/room/booking?room=${roomId}&package=${data.packageName}#activities`}>
                            <Button
                                variant='contained'
                                color='primary'
                                className={classes.button}
                            >
                                Book Now
                            </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>            
    )
}

export default Package
