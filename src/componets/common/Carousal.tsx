// React Imports
import React, {useState} from 'react'
// 3rd Party
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
// Material UI Imports
import { 
        makeStyles
    } from '@material-ui/styles'
import { 
    Hidden,
    IconButton, 
    Theme
    } from '@material-ui/core'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
// Local Imports

// Style
const useStyles = makeStyles((theme: Theme)=>({
    control: {
        display: 'flex',
        position: 'absolute',
        justifyContent: 'space-between',
        top: '50%',
        width: '100%',
        zIndex: 1000,
    },
    nav:{
        backgroundColor: 'black',
        color: 'white',
        opacity: 0.5,
        '&:hover': {
            backgroundColor: 'black',
            opacity: 0.7
        }
    },
    navLeft: {
        marginLeft: 8
    },
    navRight: {
        marginRight: 8
    },
    stepperContainer: {
        position: 'absolute',
        width: '100%',
        display: 'flex',
        bottom: '10%',
        zIndex: 1000
    },
    stepper: {
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto',
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
}

// Consts
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Carousal:React.FC<CarousalProps> = ( { children, fixed } ) => {

    // Style
    const classes = useStyles()

    // States
    const [activeIndex, setActiveIndex] = useState(0)

    // Methods
    const handleStepChange = (step: number) => {
        setActiveIndex(step)
    }

    // Components
    const stepIcons = []    

    for(let x = 0; x < children.length; x++){
        stepIcons.push(
            <div key={`step-${x}`} className={`${classes.stepIcon} ${activeIndex === x ? classes.stepIconSelected : undefined}`} onClick={() => setActiveIndex(x)}/>
        )
    }

    return (
        <div>
        {/* Controls */}
            <Hidden smDown>
                <div className={classes.control}>
                    <IconButton className={`${classes.nav} ${classes.navLeft}`} onClick={() => (setActiveIndex(activeIndex === 0 ? children.length - 1 : activeIndex -1))}>
                        <KeyboardArrowLeftIcon />
                    </IconButton>
                    <IconButton className={`${classes.nav} ${classes.navRight}`} onClick={() => (setActiveIndex(activeIndex === children.length - 1 ? 0 : activeIndex +1))}>
                        <KeyboardArrowRightIcon />
                    </IconButton>
                </div>
                {/* <div className={classes.stepperContainer}>
                    <div className={classes.stepper}>
                        { stepIcons }
                    </div>                
                </div>         */}
            </Hidden>    
            {/* Slides */}
            <div>
                { fixed ? 
                    (
                        <SwipeableViews
                            axis={'x'}
                            index={activeIndex}
                            onChangeIndex={handleStepChange} 
                            autoPlay={false}
                        >
                        {
                            children
                        }                        
                        </SwipeableViews>
                    )
                    :
                    (
                        <AutoPlaySwipeableViews
                            axis={'x'}
                            index={activeIndex}
                            onChangeIndex={handleStepChange} 
                            interval={105000} 
                        >
                        {
                            children
                        }
                        </AutoPlaySwipeableViews>
                    )
                }
            </div>
        </div>
    )
}

export default Carousal
