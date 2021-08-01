// React Imports
import React, { useState } from 'react'
// 3rd Party
// Material UI Imports
import { 
    Grid,
    TextField,
    makeStyles,
    Theme,
    Button,
    Typography,
    Container
} from '@material-ui/core'
// Local Imports

// Style
const useStyles = makeStyles((theme: Theme) => ({
    container:{
        height: '100vh',
        backgroundColor: theme.palette.primary.main,
    },
    gridItem: {
        width: 500,
        marginBottom: 32,
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
    const [lastName, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    // Methods
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    return (
        <form onSubmit={handleFormSubmit}>
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
                />  
            </Grid>
            <Grid item className={classes.gridItem}>
                <TextField 
                    variant='filled'
                    color='secondary'
                    label='Last Name'
                    value={lastName}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setLastname(event.target.value)}                    
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
