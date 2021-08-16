// React Imports
import React from 'react'
// Material UI Imports
import { 
    Grid,
    Typography,
    useMediaQuery,
    Theme
} from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
// Style

// Interfaces
interface ItemProps {
    label: string,
    value: string|number
}

const Item:React.FC<ItemProps> = ({ label, value }) => {
    // Styles
    const theme:Theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down("sm"))

    return(
        <>
            <Grid item>
                <Typography variant={matches ? 'subtitle2' : 'caption'} align={matches ? 'center' : undefined}>
                    { label }
                </Typography>
                <Typography variant='h5' component='h5' align={matches ? 'center' : undefined}>
                    { value }
                </Typography>
            </Grid>
        </>
    )
}

export default Item
