// React Imports
import React from 'react'
// 3rd Party
// Material UI Imports
import { 
    Grid,
} from '@material-ui/core'
// Local Imports
import GridItem from '../common/PopoverGridItem'

// Interface
interface Props {
    data: any
}

const UserPopup:React.FC<Props> = ( { data } ) => {

    return (        
        <Grid container>             
            <Grid item xs={6}>
                <GridItem label="First Name" value={data.firstName}/>
                <GridItem label="Surename" value={data.surename}/>
                <GridItem label="Email" value={data.email}/>                
                <GridItem label="Subscribed" value={data.subscribed ? 'Yes' : 'No'}/>
            </Grid>
            <Grid item xs={6}>
                <GridItem label="Middle Name" value={data.middleName}/>
                <GridItem label="Date of Birth" value={data.dateofbirth}/>
                <GridItem label="" value=""/>
                <GridItem label="Primary User" value={data.primaryUser ? 'Yes' : 'No'}/>
            </Grid>            
        </Grid>
    )
}

export default UserPopup
