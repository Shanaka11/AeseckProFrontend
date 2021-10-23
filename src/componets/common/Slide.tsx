// React Imports
import React from 'react'
// 3rd Party
// Material UI Imports
import { 
    makeStyles,
    Theme,
} from '@material-ui/core'
// Local Imports

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    image:{
        // height: 910,
        height: 600,
        width: '100%',
        verticalAlign: 'bottom',
        objectFit: 'cover'
    },
    details:{
        position: 'absolute',
        top: 0,
        height: 600,
        width: '100%',
    },
}))

// Interfaces
interface SlideProps {
    index: number,
    imgPath: string,
    children?: React.ReactNode
}

const Slide:React.FC<SlideProps> = ({ index, imgPath, children }) => {

    // Style
    const classes = useStyles()
    
    return (
        <>
            <div>
            <img
                className={classes.image} 
                // height='910'
                // width='1920'            
                src={imgPath}
                alt={`carousal-${index}`}
            />
            </div>
            <div className={classes.details}>
                {children}
            </div>
        </>
    )
}

export default Slide
