// React Imports
import React from 'react'
// 3rd Party
// Material UI Imports
import { 
    Container,
    Grid,
    Theme,
    makeStyles,
    Typography,
} from '@material-ui/core'
// Local Imports
import Package from './Package'

// Style
const useStyles = makeStyles((theme: Theme) => ({
    container:{
        marginTop: 8,
        marginBottom: 8,
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: theme.palette.primary.light,
    },
    packageContainer: {
        marginTop: 16,
    }
  }));

// Interface
interface PackageData {
    packageName: string,
    description: string,
    price: string
}

interface PackageListProps {
    data: PackageData[]
}  

const PackageList:React.FC<PackageListProps> = ( { data } ) => {

    // Style
    const classes = useStyles()

    return (
        <Container className={classes.container}>
            <Typography variant='h6'>
                Package List
            </Typography>
            <Grid container alignItems='center' direction='column' className={classes.packageContainer}>
                {
                    data.map((item, index) => (
                        <Package key={`${index}=${item.packageName}`} data={item}/>
                    ))
                }                
            </Grid>            
        </Container>
    )
}

export default PackageList
