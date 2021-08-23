import React from 'react'
// 3rd Party
import { useMutation } from 'react-query'
// Material UI Imports
import { 
    Button,
    Grid, 
    makeStyles,
    Theme,
    CircularProgress
} from '@material-ui/core'
// Local Imports
import avatar from '../../assets/avatar.jpg'
import Item from '../bookingpage/Item'
import Alert from '../common/Alert'
import { postCheckoutPrimary, postCheckinPrimary } from '../../api/sessionApi'

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    container:{        
        marginTop: 12,
        color: theme.palette.text.primary
    },
    userContainer:{
        backgroundColor: theme.palette.primary.main,
        height: '100%',
        padding: 12
    },
    avatar: {
        borderRadius: '50%',
        height: 200,
        width: 200
    },
    button: {
        width: 138
    }
}))

// Interfaces
interface Props {
    userInfo: any
    refetch: () => void
    handleDone: () => void
}

const UserInfo:React.FC<Props> = ( { userInfo, refetch, handleDone } ) => {
    // Styles
    const classes = useStyles()

    // Queries
    const {
        data:checkInUserData,
        error: checkInUserError,
        isLoading: checkInUserIsloading,
        isError: checkInUserIsError,
        mutate: checkInUserMutate,
    } = useMutation(postCheckinPrimary , {
        onSuccess: () => refetch()
    })

    const {
        data:checkOutUserData,
        error: checkOutUserError,
        isLoading: checkOutUserIsloading,
        isError: checkOutUserIsError,
        mutate: checkOutUserMutate,
    } = useMutation(postCheckoutPrimary , {
        onSuccess: () => handleDone()
    })

    const address = userInfo.address

    // Methods
    const handleCheckinOut = () => {
        if(userInfo.checkInStatus === 10) {
            checkOutUserMutate({
                'userId': `${userInfo.userId}`
            })
        } else {
            checkInUserMutate({
                'reference': `${userInfo.userId}`
            })
        }
    }

    return (
        <Grid container className={classes.container}>
            {/* Alert */}
            {(checkInUserIsError || (checkInUserData ? !checkInUserData?.data.status : false)) && 
                <Alert message={checkInUserError ? 'Error Encountered, Please Try Again': checkInUserData?.data.msg} severity='error'/> 
            }
            {(checkOutUserIsError || (checkOutUserData ? !checkOutUserData?.data.status : false)) && 
                <Alert message={checkOutUserError ? 'Error Encountered, Please Try Again': checkOutUserData?.data.msg} severity='error'/> 
            }
            <Grid item xs={12}>                
                <Grid container className={classes.userContainer} direction='column' justify='space-between'>
                    <Grid item>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Grid container spacing={1} direction='column'>
                                    <Item label='Name' value={`${userInfo.firstName}${userInfo.middleName && ` ${userInfo.middleName}`} ${userInfo.surename}`} small/>
                                    <Item label='Email' value={`${userInfo.emailAddress}`} small/>
                                    <Item label='Phone Number' value={`${userInfo.phoneNumber}`} small/>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container justify='center' alignItems='center'>
                                    <img alt='img-avatar' src={avatar} className={classes.avatar}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid> 
                    <Item label='Address' value={`${address.streetAddress}, ${address.suburb}, ${address.state}, ${address.postalCode}, ${address.country}`} small/>                                    
                    <Grid item>
                        <Grid container justify='flex-end'>
                            <Button
                                variant='contained'
                                color='secondary'
                                disableElevation
                                className={classes.button}
                                onClick={handleCheckinOut}
                                startIcon={(checkOutUserIsloading || checkInUserIsloading) && <CircularProgress color='secondary' size={20}/>}
                                disabled={checkOutUserIsloading || checkInUserIsloading}
                            >
                                {userInfo.checkInStatus === 10 ? 'Check Out' : 'Check In'}
                            </Button>
                        </Grid>
                    </Grid>   
                </Grid>                
            </Grid>          
        </Grid>
    )
}

export default UserInfo
