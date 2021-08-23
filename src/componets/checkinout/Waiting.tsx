import React, {useState} from 'react'
// 3rd Party
// Material UI Imports
import { 
    Button,
    Container,
    Grid, 
    makeStyles,
    Theme,
    Typography,
    TextField,
    LinearProgress
} from '@material-ui/core'
// Local Imports

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    container:{
        backgroundColor: theme.palette.primary.main
    },
    subContainer:{
        height: 'calc(100vh + 18px)'
    },
    marginLeft:{
        marginLeft: 12
    },
    textFieldMain: {
        width: 300,
        [theme.breakpoints.down('sm')]:{
            width: 225
        },
    },
    textFieldUnderLine: {
        "&&&:before": {
            borderBottomColor: theme.palette.text.primary
        }
    },
    textFieldLabel: {
        color: theme.palette.text.primary,
        opacity: 0.8
    },
    button :{
        width: 100,
        height: 56,
        borderRadius: 0
    },
    progress: {
        width: '100%'
    }    
}))

// Interface
interface WaitingProps {
    handleCodeScan: (page: string) => void
}

const Waiting:React.FC<WaitingProps> = ( { handleCodeScan } ) => {
    // Style
    const classes = useStyles()

    // State
    const [barcode, setBarcode] = useState('')

    // Methods
    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        handleCodeScan(barcode)
    }

    return (
        <Container className={classes.container}>
            <Grid container justify='center' alignItems='center' className={classes.subContainer} direction='column' spacing={4}>
                <Grid item>
                    <Grid container>
                        <Typography variant='h2' color='textPrimary' align='center'>
                            Scan your Id or Enter it Below
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item className={classes.progress}>
                    <LinearProgress color="primary" />
                </Grid>
                <Grid item>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            variant='filled'
                            label='Barcode/Email/Phonenumber'
                            fullWidth
                            // type={type || 'text'}
                            autoComplete='no'
                            color='secondary'
                            className={classes.textFieldMain}
                            InputProps={{
                                classes:{
                                underline: classes.textFieldUnderLine,

                                }
                            }}
                            InputLabelProps={{
                                className:classes.textFieldLabel,
                                shrink: true,
                            }}
                            required
                            onChange={(event) => setBarcode(event.target.value)}
                            value={barcode}
                            autoFocus
                        >
                        </TextField>
                        <Button
                            variant='contained'
                            color='secondary'
                            disableElevation
                            className={classes.button}
                            type='submit'
                        >
                            Submit
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </Container>      
    )
}

export default Waiting
