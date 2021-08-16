// Reacr Imports
import React, { useState } from 'react'
// 3rd Party
// Material UI Imports
import { 
    Container,
    Grid, 
    makeStyles,
    Slide,
    TextField,
    Theme,
    Typography,
    Button,
    Hidden
} from '@material-ui/core'
// Local Imports
import Item from './Item'

// Style
const useStyles = makeStyles((theme: Theme) => ({
    container:{
        minHeight: 450
    },
    header:{
        marginBottom: theme.spacing(3)
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
  }));

// Interfaces
interface SelectedDate {
    day: number,
    month: number,
    year: number
}

interface SelectedTime {
    id: number,
    label: string,
    date: string,
    availability: number
}

interface TextItemProps {
    label: string,
    value: string|number,
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
    type?: string,
    required?: boolean
}

interface Props {
    activity: string,
    dateTime: {
        date: SelectedDate, 
        time: SelectedTime
    },
    packageSelected: {
        id: number,
        name: string,
        price: number
    },
    contact: any
    handleDateSelectConfirm: (data: any) => void,
    handleBackOnClick: () => void
}

const TextItem:React.FC<TextItemProps> = ({ label, value, onChange, type, required }) => {

    // Style
    const classes = useStyles()

    return (
        <Grid item>
            <TextField
                variant='filled'
                label={label}
                fullWidth
                type={type || 'text'}
                autoComplete='no'
                color='secondary'
                InputProps={{
                    classes:{
                    underline: classes.textFieldUnderLine,

                    }
                }}
                InputLabelProps={{
                    className:classes.textFieldLabel,
                    shrink: true,
                }}
                required={required}
                onChange={onChange}
                value={value}
            >

            </TextField>
        </Grid>
    )
}

const Contact:React.FC<Props> = ({ activity, dateTime, packageSelected, contact, handleDateSelectConfirm, handleBackOnClick }) => {

    // Style
    const classes = useStyles()

    // State
    const [ formData, setFormData ] = useState({
        firstName: contact ? contact.firstName : '',
        middleName: contact ? contact.middleName : '',
        sureName: contact ? contact.sureName : '',
        email: contact ? contact.email : '',
        phoneNumber: contact ? contact.phoneNumber : ''
    })

    // Method
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        handleDateSelectConfirm(formData)
    }

    const handleOnChange = (name:string, value:string) => {
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    return (
        <Slide in={true} direction='left' mountOnEnter unmountOnExit >
            <Container className={classes.container}>
                <Grid container justify='space-evenly' className={classes.header} spacing={2}>
                    <Grid item>
                        <Grid container justify='space-evenly' spacing={1}>
                            <Grid item xs={12} className={classes.header}>
                                <Typography variant='h4' component='h4' align='center'>
                                    Booking Summery
                                </Typography>
                            </Grid>
                            <Hidden smDown>
                                <Grid item>
                                    <Grid container direction='column' spacing={3}>
                                        <Item label='Activity Center' value='Party Room'/>
                                        <Item label='Date' value={ dateTime.time.date }/>
                                        <Item label='Package' value={ packageSelected.name }/>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container direction='column' spacing={3}>
                                        <Item label='Activity' value={activity}/>
                                        <Item label='Time' value={ dateTime.time.label }/>
                                        <Item label='Price' value={ `${packageSelected.price} AUD` }/>
                                    </Grid>
                                </Grid>
                            </Hidden>
                            <Hidden mdUp>
                                <Grid item>
                                    <Grid container direction='column' spacing={1}>
                                        <Item label='Activity Center' value='Party Room'/>
                                        <Item label='Activity' value={activity}/>
                                        <Item label='Date' value={ dateTime.time.date }/>
                                        <Item label='Time' value={ dateTime.time.label }/>
                                        <Item label='Package' value={ packageSelected.name }/>
                                        <Item label='Price' value={ `${packageSelected.price} AUD` }/>
                                    </Grid>
                                </Grid>
                            </Hidden>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant='h4' component='h4' align='center'>
                                    Contact Details
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <form id='contact-form' onSubmit={handleSubmit}>
                                    <Grid container spacing={1} direction='column'>
                                        <TextItem 
                                            label='First Name' 
                                            value={formData.firstName} 
                                            onChange={(event) => handleOnChange('firstName', event.target.value)} 
                                            required
                                        />
                                        <TextItem 
                                            label='Middle Name' 
                                            value={formData.middleName}
                                            onChange={(event) => handleOnChange('middleName', event.target.value)}
                                        />
                                        <TextItem 
                                            label='Surename' 
                                            value={formData.sureName}
                                            onChange={(event) => handleOnChange('sureName', event.target.value)} 
                                            required
                                        />
                                        <TextItem 
                                            label='Email' 
                                            value={formData.email}
                                            onChange={(event) => handleOnChange('email', event.target.value)} 
                                            type='email' 
                                            required
                                        />
                                        <TextItem 
                                            label='Phone Number' 
                                            value={formData.phoneNumber}
                                            onChange={(event) => handleOnChange('phoneNumber', event.target.value)} 
                                            required
                                        />
                                    </Grid>
                                </form>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container justify='space-between'>
                    <Button
                        variant='text'
                        color='secondary'
                        disableElevation
                        onClick={() => handleBackOnClick()}
                    >
                        Back
                    </Button>
                    <Button
                        variant='contained'
                        color='secondary'
                        disableElevation
                        type='submit'
                        form='contact-form'
                    >
                        Next
                    </Button>
                </Grid>
            </Container>
        </Slide>
    )
}

export default Contact
