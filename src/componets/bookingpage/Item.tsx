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
    value: string|number,
    small?: boolean
}

const Item:React.FC<ItemProps> = ({ label, value, small }) => {
    // Styles
    const theme:Theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down("sm"))

    return(
        <>
            <Grid item>
                <Typography variant={matches ? 'subtitle2' : 'caption'} align={matches ? 'center' : undefined}>
                    { label }
                </Typography>
                <Typography variant={small ? 'h6' : 'h5'} component='h5' align={matches ? 'center' : 'inherit'}>
                    { value }
                </Typography>
            </Grid>
        </>
    )
}

export default Item
