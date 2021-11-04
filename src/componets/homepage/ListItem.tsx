// React Imports
import React from 'react'
// 3rd Party
// Material UI Imports
import { 
    Container,
    Grid,
    Theme,
    makeStyles,
    Button,
    Typography,
    useMediaQuery
} from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
// Local Imports

// Style
const useStyles = makeStyles((theme: Theme) => ({
    container:{
        paddingTop: 32,
        paddingBottom: 32,        
        color: theme.palette.text.primary
    },
    layout1: {
        backgroundColor: '#77B28C'
    },
    layout2: {
        backgroundColor: '#499F68',
    },
    image: {
        width: '100%',
        maxWidth: 400,
        maxHeight:400
    },
    detailContainer: {
        height: '100%'
    }
  }));

// Interfaces
interface ItemProps{
    id: number,
    title: string,
    description: string,
    images: imageType[],
    activities?: string[],
}

interface listItemProps {
    item: ItemProps,
    layout: number,
    activityCenter?: string
}

interface imageType {
    imageId: number,
    imageCategory: string,
    imageTitle: string,
    imageDescription: string,
    imageUrl: string    
}

const ListItem:React.FC<listItemProps> = ( { item, layout, activityCenter } ) => {
    // Style
    const classes = useStyles()
    const theme:Theme = useTheme()
    const small = useMediaQuery(theme.breakpoints.down("md"))    

    const listItemContent = (
        <>
        <Grid item>
            <Typography variant='h6'>
                { item.title }
            </Typography>                            
        </Grid>
        <Grid item>
            <Typography variant='body1' align='justify'>
                {item.description}
            </Typography>   
        </Grid>
        <Grid item>
            {!activityCenter &&
                <Button                
                    variant='contained'
                    color='secondary'
                    href={activityCenter ? `/${activityCenter}/booking?activity=${item.id}` : `/${item.id}`}
                >
                    { activityCenter ? 'Make A Booking' : 'Learn More'}
                </Button>
            }
        </Grid>    
        </>    
    )
    const largeDesc = (
        <Grid container alignItems={layout === 0 ? 'flex-start' : 'flex-end'} justify='space-between' direction='column' className={ classes.detailContainer }>
            { listItemContent }
        </Grid>
    )

    const smallDesc = (
        <Grid container alignItems='center' justify='space-between' direction='column' className={ classes.detailContainer }>
            { listItemContent }
        </Grid>
    )
    
    const layout1 = (
        <>
        <Grid item sm={12} lg={6}>
            <Grid container alignItems='center' justify='center'>
                <Grid item>
                    <img className={classes.image} alt='image1' src={item.images.filter((image:any) => image.imageCategory === 'TileImage')[0] && item.images.filter((image:any) => image.imageCategory === 'TileImage')[0].imageUrl}/>
                </Grid>
            </Grid> 
        </Grid>
        <Grid item sm={12} lg={6}>
            {small ? smallDesc : largeDesc }
        </Grid>        
        </>
    )
    
    const layout2 = (
        <>
        <Grid item sm={12} lg={6}>
            {small ? smallDesc : largeDesc }
        </Grid>            
        <Grid item sm={12} lg={6}>
            <Grid container alignItems='center' justify='center'>
                <Grid item>
                    <img className={classes.image} alt='image1' src={item.images.filter((image:any) => image.imageCategory === 'TileImage')[0] && item.images.filter((image:any) => image.imageCategory === 'TileImage')[0].imageUrl}/>
                </Grid>
            </Grid> 
        </Grid>    
        </>        
    )

    return (
        <Grid container className={`${classes.container}  ${layout === 0 ? classes.layout1 : classes.layout2}`}>
        <Container>
            <Grid container spacing={2}>
                { layout === 0 ? layout1 : small ? layout1 : layout2 }
            </Grid>
        </Container>
        </Grid>
    )
}

export default ListItem
