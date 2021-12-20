import React, { useState } from 'react'
// 3rd Party
import { useMutation } from 'react-query'
// Material UI Imports
import { 
    Grid, 
    makeStyles,
    Theme,
    Button,
    CircularProgress
} from '@material-ui/core'
// Local Imports
import BarcodeModal from './BarcodeModal'
import AccessCardItem from './AccessCardItem'
import Alert from '../common/Alert'
import { postAttachAccessCard, postDettachAccessCard } from '../../api/sessionApi'

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    container:{        
        marginTop: 12,
        // color: theme.palette.text.primary
    },
    userContainer:{
        backgroundColor: theme.palette.primary.main,
        height: '100%',
        padding: 12
    },
    header: {
        marginBottom: theme.spacing(1)
    },
    button: {
        width: '49%'
    }
}))

// Interfaces
interface Props {
    sessionId: number,
    accessCardList: any[],
    refetchUser: () => any
}

const AccessCards:React.FC<Props> = ( { sessionId, accessCardList, refetchUser } ) => {

    // Styles
    const classes = useStyles()

    // States
    const [scanBarcode, setScanBarcode] = useState<boolean|string>(false)

    // Queries
    const {
        data:attachAccessCardData,
        error: attachAccessCardError,
        isLoading: attachAccessCardIsloading,
        isError: attachAccessCardIsError,
        mutate: attachAccessCardMutate,
    } = useMutation(postAttachAccessCard , {
        onSuccess: () => refetchUser()
    })

    const {
        data:dettachAccessCardData,
        error: dettachAccessCardError,
        isLoading: dettachAccessCardIsloading,
        isError: dettachAccessCardIsError,
        mutate: dettachAccessCardMutate,
    } = useMutation(postDettachAccessCard , {
        onSuccess: () => refetchUser()
    })

    // Methods
    const handleAddOnClick = () => {
        setScanBarcode('Add')
    }

    const handleRemoveOnClick = () => {
        setScanBarcode('Rem')
    }

    const handleBarcodeScanDone = (barcode: string) => {
        setScanBarcode(false)
        if(scanBarcode === 'Add'){
            attachAccessCardMutate({
                accesscardBarcode: barcode,
                sessionId: sessionId
            })
        }else{
            if(scanBarcode === 'Rem'){
                dettachAccessCardMutate({
                    accesscardBarcode: barcode,
                    sessionId: sessionId
                })
            }
        }
    }

    return (
    <>
        {/* Alert */}
        {(attachAccessCardIsError || (attachAccessCardData ? !attachAccessCardData?.data.status : false)) && 
            <Alert message={attachAccessCardError ? 'Error Encountered, Please Try Again': attachAccessCardData?.data.msg} severity='error'/> 
        }
        {(dettachAccessCardIsError || (dettachAccessCardData ? !dettachAccessCardData?.data.status : false)) && 
            <Alert message={dettachAccessCardError ? 'Error Encountered, Please Try Again': dettachAccessCardData?.data.msg} severity='error'/> 
        }
        <BarcodeModal show={scanBarcode ? true : false} handleClose={() => setScanBarcode(false)} handleSubmit={handleBarcodeScanDone}/>
        <Grid container direction='column' className={classes.container}>
            <Grid item>
                <Grid container justify='space-between'>
                    <Button
                        variant='contained'
                        color='secondary'
                        disableElevation
                        className={classes.button}
                        onClick={handleAddOnClick}
                        disabled={attachAccessCardIsloading || dettachAccessCardIsloading}
                        startIcon={attachAccessCardIsloading && <CircularProgress color='secondary' size={20}/>}
                    >
                        Add Access Cards
                    </Button>
                    <Button
                        variant='contained'
                        color='secondary'
                        disableElevation
                        className={classes.button}
                        onClick={handleRemoveOnClick}
                        disabled={attachAccessCardIsloading || dettachAccessCardIsloading}
                        startIcon={dettachAccessCardIsloading && <CircularProgress color='secondary' size={20}/>}
                    >
                        Remove Access Cards
                    </Button>
                </Grid>
            </Grid>
            {
                accessCardList.map((item) => (
                    <Grid item key={item.id}>
                        <AccessCardItem accessCard={item}/>
                    </Grid>
                ))
            }
        </Grid>
    </>
    )
}

export default AccessCards