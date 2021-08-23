import React, { useState }  from 'react'
// 3rd Party
// Material UI Imports
import { 
    Button,
    Dialog,
    DialogContent,
    Grid, 
    LinearProgress, 
    makeStyles,
    TextField,
    Theme,
    Typography,
} from '@material-ui/core'
// Local Imports

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    dialogContainer: {
        backgroundColor: theme.palette.primary.main,

    },
    dialogText:{
        color: theme.palette.text.primary
    },
    gridContainer: {
        width: 500,
        height: 300
    },
    progress: {
        width: '100%'
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
        height: 48,
        borderRadius: 0
    },
}))

// Interface
interface Props {
    show: boolean,
    handleClose: () => void,
    handleSubmit: (barcode: string) => void
}

const BarcodeModal:React.FC<Props> = ( { show, handleClose, handleSubmit } ) => {

    // Styles
    const classes = useStyles()

    // States
    const [barcode, setBarcode] = useState('')

    // Methods
    const handleFormSubmit = (event: any) => {
        event.preventDefault()
        handleSubmit(barcode)
        setBarcode('')
    }

    return (
        <Dialog
            open={show}
            onClose={handleClose}
            classes={{
                paper: classes.dialogContainer
            }}
        >
            <DialogContent>
                <Grid 
                    container 
                    className={classes.gridContainer} 
                    direction='column' 
                    justify='center' 
                    alignItems='center'
                    spacing={2}
                >
                    <Grid item>
                        <Typography variant='h4' component='h4'>
                            Scan Your Barcode
                        </Typography>
                    </Grid>
                    <Grid item className={classes.progress}>
                        <LinearProgress color='primary'/>
                    </Grid>
                    <Grid item>
                        <form onSubmit={handleFormSubmit}>
                            <TextField
                                variant='filled'
                                label='Barcode'
                                fullWidth
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
                                size='small'
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
            </DialogContent>
        </Dialog >
    )
}

export default BarcodeModal
