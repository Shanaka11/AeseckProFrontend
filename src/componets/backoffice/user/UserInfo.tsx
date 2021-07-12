// React Imports
import React, { useEffect, useState } from 'react'
// 3rd Party
// Material UI Imports
import { 
    Button,
    Container,
    Grid, 
    makeStyles,
    TextField,
    Theme,
    Typography,
} from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton';
// Local Imports
import avatar from '../../../assets/avatar.jpg'
// import UserTabs from './UserTabs'
import Alert from '../../common/Alert'
import { errorHandlerResp } from '../../../utils/errorHandler'
import BreadCrumbs from '../common/BreadCrumbs'
// Style
const useStyles = makeStyles((theme:Theme)=> ({
    container:{        
        paddingTop: 12,
        marginBottom: 8
    },
    infoContainer:{        
        padding: 24,        
        height: '100%'
    },
    gridItem: {
        marginBottom: 12
    },
    tabItem: {

    },
    tabContainer: {
        marginTop: 12,
        marginBottom: 12
    },
    subContainer: {
        marginTop: 12
    },
    fontColorBlack: {        
        color: 'black',
        "& .MuiTablePagination-root": {
            color: "black"
        },
        "& .MuiInputBase-root": {
            color: "black"
        }
    },
    uploadButtonContainer:{
        position: 'relative'
    },
    uploadButton: {
        position: 'absolute',
        bottom: 0,
        right: 0
    }
}))

// Interfaces
interface TextFieldState {
    value: string,
    originalValue: string
}

interface UserInfoProps {
    data: {
        address?: string[],
        dateofBirth? : Date,
        emails?: string[],
        firstName?: string,
        id?: number,
        middleName?: string,
        phoneNumbers?: string[],
        primaryUser?: string,
        subscribed?: boolean,
        surename?: string
    },
    error?: errorHandlerResp,
    loading: boolean
}

const UserInfo:React.FC<UserInfoProps> = ( { data, error } ) => {
// Style
const classes = useStyles()

// State
const [showUpButton, setShowUpButton] = useState(false)
const [edited, setEdited] = useState(false)
const [firstName, setFirstName] = useState<TextFieldState>({
    value: data ? data.firstName ? data.firstName : '' : '',
    originalValue: data ? data.firstName ? data.firstName : '' : '',
})
const [lastName, setLastName] = useState<TextFieldState>({
    value: data ? data.surename ? data.surename : '' : '',
    originalValue: data ? data.surename ? data.surename : '' : '',
})
const [email, setEmail] = useState<TextFieldState>({
    value: 'Bandara@shanala.com',
    originalValue: 'Bandara@shanala.com',        
})    

// Const
const path = [
    {
        name: 'Dasboard',
        href: '/backoffice'
    },
    {
        name: 'Users',
        href: '/backoffice/users'
    },
    {
        name: data.firstName!,
        href: `/backoffice/users/${data.id}`
    },    
]

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
    <Container>
    {error?.isError && <Alert message={error.message} severity='error'/>}
    <BreadCrumbs data={path}/>
    <Grid container className={classes.container}>
        <Grid item xs={12} className={classes.gridItem}>
            <Typography variant='h6' >
                User Profile - {firstName.originalValue}
            </Typography>
        </Grid>
        <Grid item xs={12} md={6} className={classes.subContainer}>
            <Grid 
                container 
                justify='center' 
                alignItems='center' 
                className={classes.uploadButtonContainer}
                onMouseEnter={ () => setShowUpButton(true)}
                onMouseLeave={ () => setShowUpButton(false)}
            >                
                <img alt='img-avatar' src={avatar} />
                { showUpButton &&
                    <Button
                        variant='contained'
                        color='secondary'
                        disableElevation
                        className={classes.uploadButton}
                    >
                        Upload Image
                    </Button>
                }   
            </Grid>                
        </Grid>
        <Grid item xs={12} md={6} className={classes.subContainer}>
            <Grid container className={classes.infoContainer}>
                <Grid item xs={12} className={classes.gridItem}>
                    <TextField
                        name='FirstName'                          
                        variant='standard'
                        label='First Name'
                        color='secondary'
                        autoFocus
                        value={firstName.value}
                        onChange={handleFieldCahnge}
                        fullWidth
                        classes={{
                            root: classes.fontColorBlack
                        }}
                    />
                </Grid>
                <Grid item xs={12} className={classes.gridItem}>
                    <TextField
                        name='LastName'                          
                        variant='standard'
                        label='Last Name'
                        color='secondary'
                        autoFocus
                        value={lastName.value}
                        onChange={handleFieldCahnge}
                        fullWidth
                        classes={{
                            root: classes.fontColorBlack
                        }}                        
                    />
                </Grid>
                <Grid item xs={12} className={classes.gridItem}>
                    <TextField
                        name='Email' 
                        type='email'                         
                        variant='standard'
                        label='Email'
                        color='secondary'
                        autoFocus
                        value={email.value}
                        onChange={handleFieldCahnge}
                        fullWidth
                        classes={{
                            root: classes.fontColorBlack
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
        {/* <Grid item xs={12} className={classes.tabContainer}>
            <UserTabs />
        </Grid> */}
    </Grid>
    </Container>
)
}

export default UserInfo
