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
        backgroundColor: theme.palette.secondary.main,
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
    name: string,
    link: string
}

interface listItemProps {
    item: ItemProps,
    layout: number
}

const ListItem:React.FC<listItemProps> = ( { item, layout } ) => {
    // Style
    const classes = useStyles()
    const theme:Theme = useTheme()
    const small = useMediaQuery(theme.breakpoints.down("md"))    
    
    const listItemContent = (
        <>
        <Grid item>
            <Typography variant='h6'>
                { item.name }
            </Typography>                            
        </Grid>
        <Grid item>
            <Typography variant='body1' align={small ? 'center' : layout === 0 ? 'left' : 'right'}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium ad harum quae quod illo illum repudiandae in at, nihil rerum dolorum asperiores, molestiae, officia sint dolorem vitae. Quis, repellat ipsam?
            </Typography>   
        </Grid>
        <Grid item>
            <Button                
                variant='contained'
                color='primary'
                href={item.link}
            >
                Learn More
            </Button>
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
                    <img className={classes.image} alt='image1' src='https://media.timeout.com/images/105188692/750/422/image.jpg'/>
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
                    <img className={classes.image} alt='image1' src='https://media.timeout.com/images/105188692/750/422/image.jpg'/>
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
