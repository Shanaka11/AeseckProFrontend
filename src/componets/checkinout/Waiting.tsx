import React from 'react'
// 3rd Party
// Material UI Imports
import { 
    Button,
    Container,
    Grid, 
    makeStyles,
    Theme,
    Typography,
    CircularProgress
} from '@material-ui/core'
// Local Imports

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    container:{
        height: '100%',
        backgroundColor: theme.palette.primary.main
    },
    marginLeft:{
        marginLeft: 12
    }
}))

// Interface
interface WaitingProps {
    handleCodeScan: (page: number) => void
}

const Waiting:React.FC<WaitingProps> = ( { handleCodeScan } ) => {
    // Style
    const classes = useStyles()

    return (
        <>
        <Grid container justify='center' alignItems='center' className={classes.container}>
            <Grid item>
                <Grid container  alignItems='center'>
                    <Typography variant='h6' color='textPrimary' >
                        Scan your Id
                    </Typography>
                    <CircularProgress color='secondary' className={classes.marginLeft}/>
                </Grid>
            </Grid>     
        </Grid>
        {/* Test Segment */}
        <Button 
            variant='contained'
            color='secondary'
            onClick={() => handleCodeScan(2)}
        >
            Scan Done -- Testing
        </Button> 
        </>      
    )
}

export default Waiting
