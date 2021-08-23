// React Imports
import React, { useState } from 'react'
// 3rd Party
import { useParams } from 'react-router-dom'
// Material UI Imports
import { 
    Container,
    Grid,
    Theme,
    makeStyles,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    Hidden
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// Local Imports
import PackageList from './PackageList'


// Style
const useStyles = makeStyles((theme: Theme) => ({
    container:{
        paddingTop: 32,
        paddingBottom: 32,        
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.primary
    },
    accordian: {
        backgroundColor: theme.palette.primary.main
    },
    accordianDetails: {
        backgroundColor: theme.palette.primary.light
    },
    iconButton: {
        color: theme.palette.text.primary,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark
        }
    },
    imageActive: {
        height: '96px !important',
        transition: 'height 100ms'
    },
    image: {
        height: 80,
        objectFit: 'cover',
        transition: 'height 100ms'
    },
    imageContainer: {
        position: 'absolute',
        top: -4,
        left: -4
    }
  }));

interface RoomListProps {
    id: string
}

// Const
const rooms = [
    {
        name: 'Room1',
        description: 'Room Short Description1',
        packages: [
            {
                packageName: 'Package11',
                description: '11 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, illum?',
                price: '1020.00'
            },
            {
                packageName: 'Package12',
                description: '12 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, illum?',
                price: '1023.00'
            },
            {
                packageName: 'Package13',
                description: '13 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, illum?',
                price: '1025.00'
            },                        
        ]
    },
    {
        name: 'Room2',
        description: 'Room Short Description2',
        packages: [
            {
                packageName: 'Package21',
                description: '11 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, illum?',
                price: '1021.00'
            },
            {
                packageName: 'Package22',
                description: '12 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, illum?',
                price: '1026.00'
            },
            {
                packageName: 'Package23',
                description: '13 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, illum?',
                price: '1026.00'
            },            
        ]        
    },
    {
        name: 'Room3',
        description: 'Room Short Description3',
        packages: [
            {
                packageName: 'Package31',
                description: '31 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, illum?',
                price: '500.00'
            },
            {
                packageName: 'Package32',
                description: '32 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, illum?',
                price: '189.00'
            },
            {
                packageName: 'Package33',
                description: '33 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, illum?',
                price: '1201.00'
            },                        
        ]        
    }
]

// Interface
interface ParamsProps {
    activity?: string,
    room?: string
}

const RoomList:React.FC<RoomListProps> = ({ id }) => {
    // Style
    const classes = useStyles()

    // Router
    const params:ParamsProps = useParams()

    // State
    const [selectedIndex, setSelectedIndex] = useState(-1)

    // Methods
    const handlePanalChange = (id:number) => (event: React.ChangeEvent<{}>, expanded: boolean) => {
        if(!expanded){
            setSelectedIndex(-1)
        }else{
            setSelectedIndex(id)
        }        
    }

    return (
        <Grid id={id} container className={`${classes.container}`}>
            <Container>
                {rooms.map((item, index) => (
                <Accordion 
                    key={`Room-${item.name}`} 
                    expanded={index === selectedIndex} 
                    onChange={handlePanalChange(index)} 
                    className={classes.accordian} 
                    elevation={0} 
                    square
                    TransitionProps={{ unmountOnExit: true }}
                    >
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    IconButtonProps={{
                        className: classes.iconButton,
                        size: 'small'
                    }}
                    >
                    <Grid container spacing={1}>
                        <Hidden smDown>
                            <Grid item className={classes.imageContainer}>
                                <img className={`${index === selectedIndex ? classes.imageActive : undefined} ${classes.image}`} alt='room-img' src='https://media.istockphoto.com/photos/hands-of-bakers-male-knead-dough-picture-id941594062?k=6&m=941594062&s=612x612&w=0&h=SH1aFSfq08E3GbF9vOhHt9luhnuNzg0P-8rL5ygInCU='/>
                            </Grid>
                            <Grid item xs={2}></Grid>                            
                        </Hidden>
                        <Grid item>
                            <Grid container direction='column'>
                                <Grid item>
                                    <Typography variant='h6'>Room Name</Typography>
                                    <Typography>Room Description</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordianDetails}>
                        <PackageList data={rooms[index].packages} activity={params.activity ? params.activity : ''} roomId={rooms[index].name}/>
                    </AccordionDetails>
                </Accordion>        
                ))}   
            </Container>
        </Grid>
    )
}

export default RoomList
