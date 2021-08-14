// React Imports
import React from 'react'
// Material UI Imports
import { 
    Grid,
    Typography
} from '@material-ui/core'

// Style

// Interfaces
interface ItemProps {
    label: string,
    value: string|number
}

const Item:React.FC<ItemProps> = ({ label, value }) => {
    return(
        <>
            <Grid item>
                <Typography variant='caption'>
                    { label }
                </Typography>
                <Typography variant='h5' component='h5'>
                    { value }
                </Typography>
            </Grid>
        </>
    )
}

export default Item
