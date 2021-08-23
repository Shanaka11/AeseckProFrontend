import React, { useState }  from 'react'
// 3rd Party
import { useMutation } from 'react-query'
// Material UI Imports
import { 
    Button,
    CircularProgress,
    Grid, 
    makeStyles,
    Theme,
    Typography,
} from '@material-ui/core'
// Local Imports
import { postCheckoutDependentUser, postCheckinDependentuser } from '../../api/sessionApi'
import BarcodeModal from './BarcodeModal'
import Alert from '../common/Alert'

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    container:{        
        backgroundColor: theme.palette.primary.main,
        marginTop: 6,
        marginBottom: 6,
        padding: 12
    },
    subContainer: {
        height: '100%'
    },
    button: {
        width: 138
    }
}))

// Interface
interface Props {
    primaryUserId: number,
    user: any,
    refetchUser: () => any
}

const ConnectedUserInfo:React.FC<Props> = ( { user, primaryUserId, refetchUser } ) => {
    // Styles
    const classes = useStyles()    

    // State
    // const [newBarcode, setNewBarcode] = useState('BR110112553')
    const [showScan, setShowScan] = useState<boolean>(false)

   // Query

   const {
        data:checkinData,
        error: checkinError,
        isLoading: checkinIsloading,
        isError: checkinIsError,
        mutate: checkinMutate,
    } = useMutation(postCheckinDependentuser,{
        onSuccess: () => refetchUser()
    })

    const {
        data:checkoutData,
        error: checkoutError,
        isLoading: checkoutIsloading,
        isError: checkoutIsError,
        mutate: checkoutMutate,
    } = useMutation(postCheckoutDependentUser , {
        onSuccess: () => refetchUser()
    })

    // Methods
    const handleOnClick = () => {
        setShowScan(true)
    }

    const handleCheckin = (barcode: string) => {
        if(user.checkInStatus === 10) {
            checkoutMutate({
                userId: primaryUserId,
                barcode: barcode
            })
        }else{
            checkinMutate({
                primaryUserId,
                userId: user.dependentId,
                barcode: barcode
            })
        }

        setShowScan(false)
    }

    return (
        <Grid container className={classes.container}>
            {/* Alert */}
            {(checkoutIsError || (checkoutData ? !checkoutData?.data.status : false)) && 
                <Alert message={checkoutError ? 'Error Encountered, Please Try Again': checkoutData?.data.msg} severity='error'/> 
            }
            {(checkinIsError || (checkinData ? !checkinData?.data.status : false)) && 
                <Alert message={checkinError ? 'Error Encountered, Please Try Again': checkinData?.data.msg} severity='error'/> 
            }
            {/* Dialog */}
            <BarcodeModal 
                show={showScan}
                handleClose={() => setShowScan(false)}
                handleSubmit={handleCheckin}
            />
            {/* Name */}
            <Grid item xs={8}>
                <Grid container direction='column'>
                    <Typography variant='h6' color='textPrimary'>
                        { user.name }
                    </Typography>
                    <Typography variant='subtitle1' color='textPrimary'>
                        {user.dateOfBirth.split('T')[0]}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <Grid container direction='column' alignItems='flex-end' justify='flex-end' className={classes.subContainer}>
                    <Button
                        variant='contained'
                        color='secondary'
                        disableElevation
                        className={classes.button}
                        disabled={checkinIsloading || checkoutIsloading}
                        onClick={handleOnClick}
                        startIcon={(checkinIsloading || checkoutIsloading) && <CircularProgress color='secondary' size={20}/>}
                    >
                        {user.checkInStatus === 10 ? 'Check Out' : 'Check In' }
                    </Button>
                </Grid>
            </Grid>         
        </Grid>
    )
}

export default ConnectedUserInfo
