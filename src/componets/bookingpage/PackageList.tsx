import React from 'react'
// 3rd Party
// Material UI Imports
import { 
    Container,
    Grid, 
    Slide,
    Theme,
    makeStyles
} from '@material-ui/core'
// Local Imports
import Package from './Package'

// Style
const useStyles = makeStyles((theme: Theme) => ({
    container:{
        height: 450
    },
  }));

// Interface
interface Props {
    data: any[],
    handlePackageSelect: (selectedPackage: {id: number, name: string, price: number}) => void
}

const PackageList:React.FC<Props> = ( { data, handlePackageSelect } ) => {
    // Styles
    const classes = useStyles()

    return (
        <Slide in={true} direction='right' mountOnEnter unmountOnExit>
            <Container className={classes.container}>
                <Grid container spacing={1} justify='space-evenly'>
                    {
                        data.map((packageItem)=> (
                            <Grid item key={packageItem.id}>
                                <Package key={packageItem.id} data={packageItem} handlePackageSelect={handlePackageSelect}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        </Slide>
    )
}

export default PackageList
