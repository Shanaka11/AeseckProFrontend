// React Imports
import React, { useEffect, useState, useContext } from 'react'
// 3rd Party
import { useMutation } from 'react-query'
import { useHistory } from 'react-router-dom'
// Material UI Imports
import { 
    Grid,
    TextField,
    makeStyles,
    Theme,
    IconButton,
    InputAdornment,
    Button,
    Typography,
    Container,
    CircularProgress
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
// Local Imports
import Alert from '../common/Alert'
import UserContext from '../../context/userContext'
import { postLoginUser } from '../../api/userApi'


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
interface LoginProps {
    handlePageChange: (page:number) => void
}

const Login:React.FC<LoginProps> = ({ handlePageChange }) => {
    // Styles
    const classes = useStyles()

    // States
    const [showPassword, setShowPassword] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // Routing
    const history = useHistory()

    // Context
    const { setUser } = useContext(UserContext)

    // Query
    const {
        data : loginData,
        isLoading: loginIsLoading,
        isError: loginIsError,
        mutate: loginMutate
    } = useMutation(postLoginUser)

    // Methods
    useEffect(() => {
        if(loginData?.data.status === 'True'){
            // On Success direct to user profile page
            setUser(loginData.data.response.user)
            localStorage.setItem('token', loginData.data.response.token)
            const userInfo = {
                id: loginData.data.response.user.id,
                username: loginData.data.response.user.userName,
                role: loginData.data.response.user.role
            }
            localStorage.setItem('userInfo', JSON.stringify(userInfo))

            // Depending on the role direct to backoffice dashboard or home screen
            // For now just redirect to home
            history.push('/')
        }
    }, [loginData, setUser, history])

    const handleClickShowPassword = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setShowPassword(!showPassword)
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
    };

    const handleFormOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        loginMutate({
            userReference: username,
            password
        })
    }

    return (
        <Container>
        {(loginIsError || loginData?.data.status === 'False') && <Alert message={loginIsError ? 'Error occured, Please try again' : loginData?.data.msg} severity='error'/>}
        <form onSubmit={handleFormOnSubmit}>
        <Grid container direction='column' justify='center' alignItems='center' className={classes.container}>
            <Grid item className={classes.gridItem}>
                <Typography variant='h5' color='textPrimary'>
                    SIGN IN
                </Typography>
            </Grid>
            <Grid item className={classes.gridItem}>
                <TextField 
                    variant='filled'
                    color='secondary'
                    label='Username'
                    value={username}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setUsername(event.target.value)}
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
                    type={showPassword ? 'text' : 'password'}
                    variant='filled'
                    color='secondary'
                    label='Password'
                    value={password}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setPassword(event.target.value)}
                    fullWidth
                    required
                    InputProps={{
                        classes:{
                            underline: classes.textFieldUnderLine,
                        },
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                className={classes.iconButton}
                                >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
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
                            New ? <span className={classes.link} onClick={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => handlePageChange(2)}>Click Here</span> to Sign Up
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            variant='contained'
                            color='secondary'
                            // fullWidth
                            disableElevation
                            disabled={loginIsLoading}
                            startIcon={loginIsLoading && <CircularProgress size={20}/>}
                            type='submit'
                        >
                            LogIn
                        </Button>                        
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </form>
        </Container>
    )
}

export default Login
