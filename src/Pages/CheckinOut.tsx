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
import { getUserStatus } from '../api/sessionApi'

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
        isLoading,
        refetch
    } = useQuery(
        'UserStatus',
        () => getUserStatus(barcode),
        {
            enabled: barcode !== ''
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
        <div className={classes.container}>
            {page === 1 ?
                // <Container className={classes.mainContainer}>
                    <Waiting handleCodeScan={handleCodeScan}/>
                // </Container>
                :
                // <Container className={classes.mainContainer}>

                    isLoading ? 
                    <LinearProgress /> : 
                    <div className={classes.mainContainer}>
                        <User 
                            barcode={barcode} 
                            userStatus={data?.data.response} 
                            refetchUser={refetch}
                            handleDone={handleDone}
                        />
                    </div>
                // </Container>
            }
        </div>
    )
}

export default CheckinOut
