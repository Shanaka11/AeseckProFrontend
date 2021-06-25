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
        color: theme.palette.text.primary
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
    data: PackageData[],
    activity: string,
    roomId: string,
}  

const PackageList:React.FC<PackageListProps> = ( { data, activity, roomId } ) => {

    // Style
    const classes = useStyles()

    return (
        <Container className={classes.container}>
            <Typography variant='h6'>
                Package List
            </Typography>
            <Grid container alignItems='center' spacing={1} className={classes.packageContainer}>
                {
                    data.map((item, index) => (
                        <Grid item  key={`${index}=${item.packageName}`} xs={12} md={4}>
                            <Package data={item} activity={activity} roomId={roomId}/>
                        </Grid>
                    ))
                }                
            </Grid>            
        </Container>
    )
}

export default PackageList
