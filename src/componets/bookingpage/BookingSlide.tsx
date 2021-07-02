// React Imports
import React from 'react'
// 3rd Party
// Material UI Imports
import { 
    Container,
    makeStyles,
    Theme,
} from '@material-ui/core'
// Local Imports

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    mainContainer: {
        paddingLeft: 0,
        paddingRight: 0
    },
    imgContainer: {
        position: 'relative'
    },
    image:{
        height: 400,
        width: '100%',
        verticalAlign: 'bottom',
        objectFit: 'cover'    
    },
    details:{
        height: 400,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0
    },
}))

// Interfaces
interface SlideProps {
    index: number,
    imgPath: string,
    children?: React.ReactNode
}

const BookingSlide:React.FC<SlideProps> = ({ index, imgPath, children }) => {
    // Style
    const classes = useStyles()
    
    return (
        <Container className={classes.mainContainer}>
            <div className={classes.imgContainer}>
            <img
                className={classes.image} 
                src={imgPath}
                alt={`carousal-${index}`}
            />
                <div className={classes.details}>
                    {children}
                </div>
            </div>
        </Container>
    )
}

export default BookingSlide
