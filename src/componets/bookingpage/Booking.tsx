// Reacr Imports
import React, { useState } from 'react'
// 3rd Party
// Material UI Imports
import { 
    Container,
    Grid, 
    makeStyles,
    Slide,
    Theme,
    Typography,
} from '@material-ui/core'
// Local Imports
import Stepper from './Stepper'
import PackageList from './PackageList'
import Temp from './Temp'
import DateTimePicker from './DateTimePicker'
import Contact from './Contact'
import Confirm from './Confirm'

// Style
const useStyles = makeStyles((theme: Theme) => ({
    container:{
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: theme.palette.primary.dark,
        overflow: 'hidden'
    },
  }));

//Interface
interface Props {
    data: {
        title: string,
        packages: any[]
    }
}

interface Package {
    id: number,
    name: string,
    price: number
}

const Booking:React.FC<Props> = ( { data } ) => {
    // Styles
    const classes = useStyles()

    // State
    const [page, setPage] = useState(0)
    const [selectedPackage, setSelectedPackage] = useState<Package>()
    const [selectedDate, setSelectedDate] = useState<any>()
    const [contacts, setContacts] = useState<any>()

    // Methods
    const handlePackageSelect = (selectedPackage:Package) => {
        setSelectedPackage(selectedPackage)
        setPage(1)
    }

    const handleDateSelectConfirm = (data:any) => {
        setSelectedDate(data)
        setPage(2)
    }

    const handleContactsConfirm = (data:any) => {
        setContacts(data)
        setPage(3)
    }

    const handleBackOnClick = () => {
        setPage(page - 1)
    }

    return (
        <Container className={classes.container}>
            <Slide in={true} direction='down' unmountOnExit mountOnEnter>
                <Grid container direction='column' spacing={1}>
                    <Grid item>
                        {/* Heading */}
                        <Typography variant='h3' component='h3' align='center'>
                            Make Your Booking in Four easy steps
                        </Typography>
                    </Grid>
                    <Grid item>
                        {/* Stepper */}
                        <Stepper activeStep={page}/>
                    </Grid>
                    <Grid item>
                        {/* Page Component */}
                        {
                            page === 0 && 
                            <PackageList 
                                data={data.packages} 
                                handlePackageSelect={handlePackageSelect}
                            />
                        }
                        {
                            (page === 1 && selectedPackage) && 
                            <DateTimePicker 
                                activePackageId={selectedPackage.id}
                                handleDateSelectConfirm={handleDateSelectConfirm}
                                handleBackOnClick={handleBackOnClick}
                            />
                        }
                        {
                            (page === 2 && selectedPackage) &&
                            <Contact 
                                activity={data.title} 
                                dateTime={selectedDate} 
                                packageSelected={selectedPackage}
                                handleDateSelectConfirm={handleContactsConfirm}
                                handleBackOnClick={handleBackOnClick}
                                contact={contacts}
                            />
                        }
                        {
                            (page === 3 && selectedPackage) &&
                            <Confirm
                                activity={data.title} 
                                dateTime={selectedDate} 
                                packageSelected={selectedPackage}
                                contacts={contacts}
                                handleDateSelectConfirm={handleContactsConfirm}
                                handleBackOnClick={handleBackOnClick}                            
                            />
                        }
                    </Grid>
                </Grid>
            </Slide>
        </Container>
    )
}

export default Booking
