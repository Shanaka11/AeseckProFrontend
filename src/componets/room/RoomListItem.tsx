// React Imports
import React from 'react'
// 3rd Party
// Material UI Imports
import { 
    Grid,
    Theme,
    makeStyles,
    Typography,
    Hidden,
} from '@material-ui/core'
// Local Imports

// Style
const useStyles = makeStyles((theme: Theme) => ({
    container:{
        marginTop: 8,
        marginBottom: 8,
        marginRight: 8,
        backgroundColor: theme.palette.primary.main,
        height: 100,        
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            width: '130%'
        }
    },
    containerSelected: {
        backgroundColor: theme.palette.primary.light,
        width: '130%'
    },
    image: {
        height: 100,
        objectFit: 'cover'
    },
    textContainer: {
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 100,
        marginLeft: 16
    },
    description: {
        opacity: 0.7
    }
  }));

// Interface
interface Data {
    name: string,
    description: string
}

interface RoomListItemProps {
    id: number,
    selected: boolean,
    handleOnMouseOver: (id: number) => void
    data: Data
}  

const RoomListItem:React.FC<RoomListItemProps> = ( { data, id, selected,  handleOnMouseOver} ) => {

    // Style
    const classes = useStyles()

    // Methods
    const handleOnMouseOverLocal = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        handleOnMouseOver(id)
    }

    const handleOnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        handleOnMouseOver(id)
    }

    return (
        <Grid 
            container 
            className={`${classes.container} ${selected ? classes.containerSelected : undefined}`}
            onMouseOver={handleOnMouseOverLocal}
            onClick={handleOnClick}
        >
            <Hidden smDown>
                <img className={classes.image} alt='room-img' src='https://media.istockphoto.com/photos/hands-of-bakers-male-knead-dough-picture-id941594062?k=6&m=941594062&s=612x612&w=0&h=SH1aFSfq08E3GbF9vOhHt9luhnuNzg0P-8rL5ygInCU='/>
            </Hidden>            
            {/* Text */}
            <div className={classes.textContainer}>
                <Typography variant='h6'>
                    {data.name}
                </Typography>
                <Typography className={classes.description} variant='subtitle2'>
                    {data.description}
                </Typography>                
            </div>
        </Grid>
    )
}

export default RoomListItem
