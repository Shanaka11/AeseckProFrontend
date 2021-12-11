import React, { useState } from 'react'
// 3rd Party
import { useQuery } from 'react-query'
// Material UI Imports
import { 
    makeStyles,
    Theme,
    LinearProgress
} from '@material-ui/core'
// Local Imports
import Waiting from '../componets/checkinout/Waiting'
import User from '../componets/checkinout/User'
import Alert from '../componets/common/Alert'
import { getUserStatus } from '../api/sessionApi'
import BackofficeWrapper from '../componets/common/BackofficeWrapper'

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    container:{        
        backgroundColor: theme.palette.primary.main,
        backgroundBlendMode: 'screen',        
    },
    mainContainer: {
        height: '100vh',
        backgroundColor: theme.palette.primary.light
    }
}))

const CheckinOut = () => {
    // Styles
    const classes = useStyles()

    // States
    const [page, setPage] = useState(1)
    const [barcode, setBarcode] = useState('')

    // Query
    const {
        data,
        isError,
        isLoading,
        refetch
    } = useQuery(
        ['UserStatus', barcode],
        () => getUserStatus(barcode),
        {
            enabled: barcode !== '',
            // onSuccess: () => setPage(2)
        }
    )
    
    // Methods
    const handleCodeScan = (barcode: string) => {
        setBarcode(barcode)
        setPage(2)
    }

    const handleDone = () => {
        setPage(1)
    }


    return (
        <BackofficeWrapper>
        <div className={classes.container}>
            { console.log(isError || !data?.data.status)}
            {
                isLoading ?
                <LinearProgress />
                :
                <>
                {(isError || !data?.data.status) && <Alert message={isError ? 'There was an error, Please scan again': data?.data.msg} severity='error'/>}
                {(page === 1 || (isError || !data?.data.status))?
                    <Waiting handleCodeScan={handleCodeScan}/>
                    :
                    <div className={classes.mainContainer}>
                        <User 
                            barcode={barcode} 
                            userStatus={data?.data.response} 
                            refetchUser={refetch}
                            handleDone={handleDone}
                        />
                    </div>
                }
                </>
            }
        </div>
        </BackofficeWrapper>
    )
}

export default CheckinOut
