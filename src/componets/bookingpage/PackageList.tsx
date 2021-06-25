// React Imports
import React, { useEffect, useState } from 'react'
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
import { useQuery } from '../../utils/hooks/useQueryHook'

// Style
const useStyles = makeStyles((theme: Theme) => ({
    container:{
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
}  

const PackageList:React.FC<PackageListProps> = ({ data }) => {
    // Style
    const classes = useStyles()

    // Router
    const queryParams:URLSearchParams = useQuery()

    // States
    const [selectedIndex, setSelectedIndex] = useState(1)
    
    // UseEffect
    useEffect(() => {
        data.map((item, index) => {
            if(item.packageName === queryParams.get("package")){
                setSelectedIndex(index)
            }
            return item
        })
    }, [])
    // Methods
    const handleOnClick = (id:number) => {
        setSelectedIndex(id)
    }

    return (
        <Container className={classes.container}>
            <Typography variant='h6' align='center'>
                Packages
            </Typography>
            <Grid container alignItems='center' className={classes.packageContainer}>
                {                                    
                    data.map((item, index) => (
                        <Grid key={`${index}=${item.packageName}`} item xs={12} md={4}>
                            <Package key={index} id={index} handleOnClick={handleOnClick} data={item} selected={selectedIndex === index}/>
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    )
}

export default PackageList
