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
    Slide
} from '@material-ui/core'
// Local Imports
import Package from './_Package'
import { useGetQueryParams } from '../../utils/hooks/useQueryHook'

// Style
const useStyles = makeStyles((theme: Theme) => ({
    container:{
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.text.primary,
        overflow: 'hidden'
    },
    packageContainer: {
        marginTop: 16,
    }
  }));

// Interface
interface PackageData {
    id: number,
    code: string,
    categoryId: number,
    displayName: string,
    description: string,
    activeFrom: string,
    activeUntill: string,
    activeStatus: boolean,
    financeGenericRateId: number,
    overrideChildRates: boolean,
    category: string,
    tags: string,
    genericFinanceRate: {
      id: number,
      code: string,
      grossAmountBeforeDiscount: number,
      grossAmount: number,
      netAmount: number,
      uoM: string,
      discountDetails: number,
      taxDetails: number
    },
    packageConsumables: any,
    packageResources: [
      {
        packageId: number,
        resourceId: number,
        volume: number,
        capacity: number
      }
    ],
    packageServices: any,
    packageTimeSlots: any
}

interface PackageListProps {
    data: PackageData[],
    show: boolean,
    handlePackageChangeParent: (selectedPackage: { id:number, name:string, price:number }) => void
}  

const PackageList:React.FC<PackageListProps> = ({ data, show, handlePackageChangeParent }) => {
    // Style
    const classes = useStyles()

    // Router
    const queryParams:URLSearchParams = useGetQueryParams()

    // States
    const [selectedIndex, setSelectedIndex] = useState(0)
    
    // UseEffect
    useEffect(() => {
        data.map((item, index) => {
            if(item.displayName === queryParams.get("package")){
                setSelectedIndex(index)
            }
            return item
        })
    }, [])

    // Methods
    const handleOnClick = (id:number, name:string, price:number) => {
        setSelectedIndex(id)
        handlePackageChangeParent({
            id: id,
            name: name,
            price: price
        })
    }


    return (        
            <Container className={classes.container}>
                <Typography variant='h6' align='center'>
                    Packages
                </Typography>
                <Slide in={show} direction='down' mountOnEnter unmountOnExit>
                    <Grid container alignItems='center' className={show ? classes.packageContainer : undefined}>
                        {                                    
                            data.map((item, index) => (
                                <Grid key={`${index}=${item.displayName}`} item xs={12} md={4}>
                                    <Package key={index} id={index} handleOnClick={handleOnClick} data={item} selected={selectedIndex === index}/>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Slide>
            </Container>        
    )
}

export default PackageList
