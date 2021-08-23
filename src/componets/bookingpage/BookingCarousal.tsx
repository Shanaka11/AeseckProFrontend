// React Imports
import React, {useEffect, useState} from 'react'
// 3rd Party
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
// Material UI Imports
import { 
        makeStyles
    } from '@material-ui/styles'
import { 
    Container,
    Hidden,
    IconButton, 
    Theme
    } from '@material-ui/core'
// Local Image
import arrows from '../../assets/arrows.png'

// Style
const useStyles = makeStyles((theme: Theme)=>({
    container: {
        position:'relative',
        paddingRight: 0,
        paddingLeft: 0        
    },
    navigator: {
        height: 400,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 0,
        zIndex: 1
    },
    arrowLeftContainer: {
        cursor:'pointer',
        padding: '36px 11px',
        '&:hover': {
            background: 'linear-gradient( to right, rgba( 0, 0, 0, 0.3) 5%,rgba( 0, 0, 0, 0) 95%)'   
        }        
    },
    arrowLeft: {
        backgroundImage: `url(${arrows})`,
        backgroundPositionX: 23,
        height: 36,
        width: 23,
    },    
    arrowRightContainer: {
        cursor:'pointer',
        padding: '36px 11px',
        '&:hover': {
            background: 'linear-gradient( to left, rgba( 171, 218, 244, 0) 5%,rgba( 171, 218, 244, 0.3) 95%)'   
        }        
    },
    arrowRight: {
        backgroundImage: `url(${arrows})`,
        height: 36,
        width: 23,      
    },
    stepContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 50,
        zIndex: 1
    },
    stepIcon: {
        backgroundColor: '#ffffff61',
        borderRadius: '50%',
        height: 15,
        width: 15, 
        margin: 4,
        cursor: 'pointer'
    },
    stepIconSelected: {
        backgroundColor: '#ffffffd1'
    }
}))

// Interfaces
interface CarousalProps {
    children:  React.ReactNode[],
    fixed?: boolean,
    handleStepChangeParent?: (id:number) => void,
    startStep: number
}

// Consts
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const BookingCarousal:React.FC<CarousalProps> = ( { children, fixed, handleStepChangeParent, startStep} ) => {

    // Style
    const classes = useStyles()

    // States
    const [activeIndex, setActiveIndex] = useState(startStep)

    // Methods
    const handleStepChange = (step: number) => {
        setActiveIndex(step)
    }

    // UseEffect
    useEffect(() => {
        if(handleStepChangeParent) {
            handleStepChangeParent(activeIndex)
        }
    }, [activeIndex])

    // Components
    const stepIcons = []    

    for(let x = 0; x < children.length; x++){
        stepIcons.push(
            <div key={`step-${x}`} className={`${classes.stepIcon} ${activeIndex === x ? classes.stepIconSelected : undefined}`} onClick={() => setActiveIndex(x)}/>
        )
    }

    return (
        <Container className={classes.container}>
            {/* Navigator */}
            <Hidden smDown>
                <div className={classes.navigator}>
                    <div className={classes.arrowRightContainer} onClick={() => (setActiveIndex(activeIndex === 0 ? children.length - 1 : activeIndex -1))}>
                        <div className={classes.arrowLeft}></div>
                    </div>
                    <div className={classes.arrowRightContainer} onClick={() => (setActiveIndex(activeIndex === children.length - 1 ? 0 : activeIndex +1))}>
                        <div className={classes.arrowRight}></div>
                    </div>
                </div>
                {/* Stepper */}
                <div className={classes.stepContainer}>
                    { stepIcons }
                </div>
            </Hidden>
            {/* Slide Container */}
            <SwipeableViews
                axis={'x'}
                index={activeIndex}
                onChangeIndex={handleStepChange} 
                autoPlay={false}
            >
            {     
                // Slides
                children
            }                        
            </SwipeableViews>
        </Container>
    )
}

export default BookingCarousal
