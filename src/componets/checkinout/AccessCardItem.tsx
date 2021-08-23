import React  from 'react'
// 3rd Party
// Material UI Imports
import { 
    Grid, 
    makeStyles,
    Theme,
    Typography,
} from '@material-ui/core'
// Local Imports

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    container:{        
        backgroundColor: theme.palette.primary.main,
        marginTop: 6,
        marginBottom: 6,
        padding: 12
    },
    subContainer: {
        height: '100%'
    },
    button: {
        width: 138
    }
}))

// Interface
interface Props {
    accessCard: any,
}

const AccessCardItem:React.FC<Props> = ( { accessCard } ) => {
    // Styles
    const classes = useStyles()

    return (
        <Grid container className={classes.container}>
            {/* Name */}
            <Grid item xs={8}>
                <Grid container direction='column'>
                    <Typography variant='h6' color='textPrimary'>
                        { accessCard.cardNumber }
                    </Typography>
                    <Typography variant='subtitle1' color='textPrimary'>
                        { accessCard.name }
                    </Typography>
                </Grid>
            </Grid>        
        </Grid>
    )
}

export default AccessCardItem
