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
        maxHeight: 600,
        height: 'calc(100vh - 100px)',
        width: '100%',
        verticalAlign: 'bottom',
        objectFit: 'cover',
        [theme.breakpoints.down('md')]:{
            height: 'calc(100vh - 150px)',
        },
        [theme.breakpoints.down('xs')]:{
            height: 'calc(100vh - 200px)',
        }, 
    },
    aboutUsImage:{
        height: 250,
        width: '100%',
        verticalAlign: 'bottom',
        objectFit: 'cover',
        // [theme.breakpoints.down('md')]:{
        //     height: 'calc(100vh - 150px)',
        // },
        [theme.breakpoints.down('xs')]:{
            height: 150,
        }, 
    },
    details:{
        position: 'absolute',
        top: 0,
        maxHeight: 600,
        height: 'calc(100vh - 100px)',
        width: '100%',
        [theme.breakpoints.down('md')]:{
            height: 'calc(100vh - 150px)',
        },
        [theme.breakpoints.down('xs')]:{
            height: 'calc(100vh - 200px)',
        }, 
    },
    aboutUsDetails:{
        position: 'absolute',
        top: 0,
        maxHeight: 250,
        width: '100%',
        // [theme.breakpoints.down('md')]:{
        //     height: 'calc(100vh - 150px)',
        // },
        [theme.breakpoints.down('xs')]:{
            height: 150,
        }, 
    }
}))

// Interfaces
interface SlideProps {
    index: number,
    imgPath: string,
    children?: React.ReactNode,
    aboutUs?: boolean
}

const Slide:React.FC<SlideProps> = ({ index, imgPath, children, aboutUs }) => {

    // Style
    const classes = useStyles()
    
    return (
        <>
            <div>
            <img
                className={aboutUs ? classes.aboutUsImage : classes.image} 
                // height='910'
                // width='1920'            
                src={imgPath}
                alt={`carousal-${index}`}
            />
            </div>
            <div className={aboutUs ? classes.aboutUsDetails : classes.details}>
                {children}
            </div>
        </>
    )
}

export default Slide
