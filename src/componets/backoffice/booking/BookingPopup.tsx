// React Imports
import React from 'react'
// 3rd Party
// Material UI Imports
import { 
    CircularProgress,
    Grid,
} from '@material-ui/core'
// Local Imports
import GridItem from '../common/PopoverGridItem'

// Interface
interface Props {
    data: any
}

const BookingPopup:React.FC<Props> = ( { data } ) => {

    if(!data){
        return <CircularProgress />
    }

    return (        
        <Grid container>             
            <Grid item xs={6}>
                <GridItem label="First Name" value={data.primaryContact.firstName}/>
                <GridItem label="Surename" value={data.primaryContact.surename}/>
                <GridItem label="Email" value={data.primaryContact.emails[0].email.emailAddress}/>               
                <GridItem label="Phone" value={data.primaryContact.phoneNumbers[0].phoneNumber.number}/> 
                <GridItem label="Subscribed" value={data.primaryContact.subscribed ? 'Yes' : 'No'}/>
            </Grid>
            <Grid item xs={6}>
                <GridItem label="Middle Name" value={data.primaryContact.middleName}/>
                <GridItem label="Date of Birth" value={data.primaryContact.dateofbirth}/>
                <GridItem label="" value=""/>
                <GridItem label="" value=""/>
                <GridItem label="Primary User" value={data.primaryContact.primaryUser ? 'Yes' : 'No'}/>
            </Grid>
        </Grid>
    )
}

export default BookingPopup
