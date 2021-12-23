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
        minHeight: 600,
        width: 350,
        cursor: 'pointer',
        transition: '0.3s background-color',
        '&:hover': {
            backgroundColor: theme.palette.primary.main, 
        },
        [theme.breakpoints.down('xs')] : {
            width: 300
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
            <Grid item container direction='column'>
                <Typography
                    variant='h4'
                    component='h4'
                    align='center'
                >
                    {data.displayName}
                </Typography>
                <Typography
                    variant='body1'
                    style={{ marginTop: '2em', marginLeft: '1em', marginRight: '1em'}}
                >
                    <div dangerouslySetInnerHTML={{'__html': data.description}}/>
                </Typography>
            </Grid>
            <Grid item container direction='column' alignItems='center'>
                <Typography
                    variant='h3'
                    component='h3'
                    align='center'
                >
                    {`${data.genericFinanceRate.netAmount} AUD`}
                </Typography>
                <Grid item  style={{ marginTop: '1em'}}>
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
        </Grid>
    )
}

export default Package
