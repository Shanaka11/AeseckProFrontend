// React Imports
import React from 'react'
// 3rd Party
// Material UI Imports
import { 
    Grid, 
    makeStyles,
    Theme,
    Typography,
    Button
} from '@material-ui/core'
// Local Imports

// Style
const useStyles = makeStyles((theme: Theme) => ({
    container:{
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: theme.palette.primary.light,
        height: 400,
        width: 300,
        cursor: 'pointer',
        transition: '0.3s background-color',
        '&:hover': {
            backgroundColor: theme.palette.primary.main, 
        }
    },
  }));

// Interface
interface Props {
    data: any,
    handlePackageSelect: (selectedPackage: {id: number, name: string, price: number}) => void
}

const Package:React.FC<Props> = ( { data, handlePackageSelect } ) => {
    // Style
    const classes = useStyles()

    return (
        <Grid 
            container 
            className={classes.container} 
            direction='column'
            justify='space-between'
            alignItems='center'
            onClick={(event) => handlePackageSelect({
                id: data.id,
                name: data.displayName,
                price: data.genericFinanceRate.netAmount
            })}
        >
            <Typography
                variant='h4'
                component='h4'
                align='center'
            >
                {data.displayName}
            </Typography>
            <Typography
                variant='body1'
                align='center'
            >
                {data.description}
            </Typography>
            <Grid item>
                <Button
                    variant='contained'
                    color='secondary'
                    disableElevation
                    onClick={(event) => handlePackageSelect({
                        id: data.id,
                        name: data.displayName,
                        price: data.genericFinanceRate.netAmount
                    })}
                >
                    Select
                </Button>
            </Grid>
        </Grid>
    )
}

export default Package
