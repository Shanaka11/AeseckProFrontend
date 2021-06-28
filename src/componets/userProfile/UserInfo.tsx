// React Imports
import React, { useEffect, useState } from 'react'
// 3rd Party
// Material UI Imports
import { 
    Button,
    Grid, 
    makeStyles,
    TextField,
    Theme,
    Typography,
} from '@material-ui/core'
// Local Imports
import avatar from '../../assets/avatar.jpg'
import UserTabs from './UserTabs'

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    container:{        
        paddingTop: 12
    },
    infoContainer:{        
        padding: 24,
        backgroundColor: theme.palette.primary.dark,
        height: '100%'
    },
    gridItem: {
        marginBottom: 12
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
    tabItem: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.primary.main
    },
    tabContainer: {
        marginTop: 12,
        backgroundColor: theme.palette.primary.main,
        marginBottom: 12
    },
    subContainer: {
        marginTop: 12
    }
}))

// Interfaces
interface TextFieldState {
    value: string,
    originalValue: string
}

const UserInfo = () => {
    // Style
    const classes = useStyles()

    // State
    const [edited, setEdited] = useState(false)
    const [firstName, setFirstName] = useState<TextFieldState>({
        value: 'Shanaka',
        originalValue: 'Shanaka',        
    })
    const [lastName, setLastName] = useState<TextFieldState>({
        value: 'Bandara',
        originalValue: 'Bandara',        
    })
    const [email, setEmail] = useState<TextFieldState>({
        value: 'Bandara@shanala.com',
        originalValue: 'Bandara@shanala.com',        
    })    

    // useEffect
    useEffect(() => {
        if(
            firstName.originalValue !== firstName.value || 
           lastName.originalValue !== lastName.value ||
           email.originalValue !== email.value
           ){
               if(!edited){
                setEdited(true)
               }            
        }else{
            if(edited){
                setEdited(false)
            }
        }
    }, [firstName, lastName, email, edited])

    // Methods
    const handleFieldCahnge = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        switch(event.target.name){
            case 'FirstName': 
                setFirstName({
                    ...firstName,
                    value: event.target.value
                })
                break;
            case 'LastName':
                setLastName({
                    ...lastName,
                    value: event.target.value
                })
                break;
            case 'Email':
                setEmail({
                    ...email,
                    value: event.target.value
                })
                break;                
        }
    }

    return (
        <Grid container className={classes.container}>
            <Grid item xs={12} className={classes.gridItem}>
                <Typography variant='h6' color='textPrimary'>
                    User Profile - (Username)
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} className={classes.subContainer}>
                <Grid container justify='center' alignItems='center'>
                    <img alt='img-avatar' src={avatar} />
                </Grid>                
            </Grid>
            <Grid item xs={12} md={6} className={classes.subContainer}>
                <Grid container className={classes.infoContainer}>
                    <Grid item xs={12} className={classes.gridItem}>
                        <TextField
                            name='FirstName'                          
                            variant={firstName.value !== firstName.originalValue ? 'filled' : 'standard'}
                            label='First Name'
                            color='secondary'
                            autoFocus
                            value={firstName.value}
                            onChange={handleFieldCahnge}
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
                    <Grid item xs={12} className={classes.gridItem}>
                        <TextField
                            name='LastName'                          
                            variant={lastName.value !== lastName.originalValue ? 'filled' : 'standard'}
                            label='Last Name'
                            color='secondary'
                            autoFocus
                            value={lastName.value}
                            onChange={handleFieldCahnge}
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
                    <Grid item xs={12} className={classes.gridItem}>
                        <TextField
                            name='Email' 
                            type='email'                         
                            variant={email.value !== email.originalValue ? 'filled' : 'standard'}
                            label='Email'
                            color='secondary'
                            autoFocus
                            value={email.value}
                            onChange={handleFieldCahnge}
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
                    <Grid item xs={12} className={classes.gridItem}>
                        <Grid container justify='flex-end'>
                            <Grid item>
                                {edited &&
                                    <Button
                                        variant='contained'
                                        color='secondary'
                                    >
                                        Update
                                    </Button>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>                
            </Grid>
            <Grid item xs={12} className={classes.tabContainer}>
                <UserTabs />
            </Grid>
        </Grid>
    )
}

export default UserInfo
