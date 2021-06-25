import React, { useState } from 'react'
// 3rd Party
// Material UI Imports
import { 
    Button,
    Container,
    Grid, 
    makeStyles,
    Theme,
    Typography,
} from '@material-ui/core'
// Local Imports
import Waiting from '../componets/checkinout/Waiting'
import User from '../componets/checkinout/User'

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    container:{        
        backgroundImage: "url('https://i.redd.it/lsa3lv6c2r651.png')",
        backgroundColor: '#499F68',
        backgroundBlendMode: 'screen',        
    },
    mainContainer:{
        minHeight: 'calc(100vh - 400px)',
    }
}))

const CheckinOut = () => {
    // Styles
    const classes = useStyles()

    // States
    const [page, setPage] = useState(1)

    // Methods
    const handleCodeScan = (page: number) => {
        setPage(page)
    }

    return (
        <div className={classes.container}>
            {page === 1 &&
                <Container className={classes.mainContainer}>
                    <Waiting handleCodeScan={handleCodeScan}/>
                </Container>
            }
            {page === 2 && 
                <Container className={classes.mainContainer}>
                    <User />
                </Container>
            }
        </div>
    )
}

export default CheckinOut
