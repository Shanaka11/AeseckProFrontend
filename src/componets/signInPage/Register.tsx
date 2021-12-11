// React Imports
import React, { useState } from 'react'
// 3rd Party
import { useMutation } from 'react-query'
// Material UI Imports
import { 
    Grid,
    TextField,
    makeStyles,
    Theme,
    Button,
    Typography,
    Container,
    CircularProgress
} from '@material-ui/core'
// Local Imports
import Alert from '../common/Alert'
import { postRegisterUser } from '../../api/userApi'
import { useEffect } from 'react'

// Style
const useStyles = makeStyles((theme: Theme) => ({
    container:{
        height: '100vh',
        backgroundColor: theme.palette.primary.main,
    },
    gridItem: {
        width: 500,
        marginBottom: 16,
        [theme.breakpoints.down('md')]:{
            maxWidth: 300
        },
    },
    textFieldLabel: {
        color: theme.palette.text.primary,
        // opacity: 0.8
    },
    textFieldUnderLine: {
        "&&&:before": {
            borderBottomColor: theme.palette.text.primary
        }
    },    
    iconButton: {
        color: theme.palette.text.primary
    },
    link: {
        cursor: 'pointer',
        textDecoration: 'underline;'
    }
  }));

// Interface
interface RegisterProps {
    handlePageChange: (page:number) => void
}

const Register:React.FC<RegisterProps> = ( { handlePageChange } ) => {
    // Styles
    const classes = useStyles()

    // States
    const [firstName, setFirstname] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [sureName, setSureName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    // Query
    const {
        data: registerData,
        isLoading: registerIsLoading,
        isError: registerIsError,
        mutate: registerMutate
    } = useMutation(postRegisterUser, {
    })

    // Methods
    useEffect(() => {
        if(registerData && registerData?.data.status !== 'Failed'){
            // Go to the login Page
            handlePageChange(1)
        }        
    }, [registerData, handlePageChange])

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        registerMutate({
            contactId: 0,
            firstName,
            middleName,
            sureName,
            email,
            phoneNumber,
            password
        })
    }

    return (
        <form onSubmit={handleFormSubmit}>
        {(registerIsError || registerData?.data.status === 'Failed') && <Alert message={registerIsError ? 'An Error Occured, Please Try again' : registerData?.data.msg} severity='error'/>}
        <Container>
        <Grid container direction='column' justify='center' alignItems='center' className={classes.container}>
            <Grid item className={classes.gridItem}>
                <Typography variant='h5' color='textPrimary'>
                    REGISTER
                </Typography>
            </Grid>
            <Grid item className={classes.gridItem}>
                <TextField 
                    variant='filled'
                    color='secondary'
                    label='First Name'
                    value={firstName}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setFirstname(event.target.value)}                    
                    fullWidth
                    required
                    InputProps={{
                        classes:{
                        underline: classes.textFieldUnderLine,
                        }
                        
                    }}           
                    InputLabelProps={{
                        className:classes.textFieldLabel,
                    }}
                    autoFocus
                />  
            </Grid>
            <Grid item className={classes.gridItem}>
                <TextField 
                    variant='filled'
                    color='secondary'
                    label='Middle Name'
                    value={middleName}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setMiddleName(event.target.value)}                    
                    fullWidth
                    InputProps={{
                        classes:{
                        underline: classes.textFieldUnderLine,
                        }
                        
                    }}           
                    InputLabelProps={{
                        className:classes.textFieldLabel,
                    }}
                />  
            </Grid>
            <Grid item className={classes.gridItem}>
                <TextField 
                    variant='filled'
                    color='secondary'
                    label='Surename'
                    value={sureName}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setSureName(event.target.value)}                    
                    fullWidth
                    required
                    InputProps={{
                        classes:{
                        underline: classes.textFieldUnderLine,
                        }
                        
                    }}           
                    InputLabelProps={{
                        className:classes.textFieldLabel,
                    }}
                />  
            </Grid>
            <Grid item className={classes.gridItem}>
                <TextField 
                    variant='filled'
                    color='secondary'
                    label='Phone Number'
                    type='number'
                    value={phoneNumber}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setPhoneNumber(event.target.value)}                    
                    fullWidth
                    required
                    InputProps={{
                        classes:{
                        underline: classes.textFieldUnderLine,
                        }
                        
                    }}           
                    InputLabelProps={{
                        className:classes.textFieldLabel,
                    }}
                />  
            </Grid>
            <Grid item className={classes.gridItem}>
                <TextField 
                    variant='filled'
                    color='secondary'
                    label='Email'
                    type='email'
                    value={email}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setEmail(event.target.value)}                    
                    fullWidth
                    required
                    InputProps={{
                        classes:{
                        underline: classes.textFieldUnderLine,
                        }
                        
                    }}           
                    InputLabelProps={{
                        className:classes.textFieldLabel,
                    }}
                />  
            </Grid>
            <Grid item className={classes.gridItem}>
                <TextField 
                    variant='filled'
                    color='secondary'
                    label='Password'
                    type='password'
                    value={password}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setPassword(event.target.value)}
                    fullWidth
                    required
                    InputProps={{
                        classes:{
                        underline: classes.textFieldUnderLine,
                        }
                        
                    }}           
                    InputLabelProps={{
                        className:classes.textFieldLabel,
                    }}
                />  
            </Grid>            
            <Grid item className={classes.gridItem}>
                <TextField 
                    type='password'
                    variant='filled'
                    color='secondary'
                    label='Confirm Password'
                    value={password2}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setPassword2(event.target.value)}                    
                    fullWidth
                    required
                    InputProps={{
                        classes:{
                            underline: classes.textFieldUnderLine,
                        },
                    }}           
                    InputLabelProps={{
                        className:classes.textFieldLabel,
                    }}
                    error={password2 !== password}
                    helperText={password2 !== password && 'Passwords do not match'}
                />  
            </Grid>
            <Grid item className={classes.gridItem}>
                <Grid container alignItems='center' justify='space-between'>
                    <Grid item>
                        <Typography variant='subtitle2' color='textPrimary'>
                            Already a member ? <span className={classes.link} onClick={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => handlePageChange(1)}>Click Here</span> to Sign In
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            variant='contained'
                            color='secondary'
                            type='submit'
                            disableElevation
                            disabled={(password !== password2) || registerIsLoading}
                            startIcon={registerIsLoading && <CircularProgress size={20}/>}
                        >
                            Register
                        </Button>                        
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </Container>
        </form>
    )
}

export default Register
