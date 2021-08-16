import React from 'react'
// 3rd Party
import clsx from 'clsx';
// Material UI Imports
import { 
    StepConnector,
    StepIconProps,
    Step,
    StepLabel,
    useMediaQuery
} from '@material-ui/core'
import { 
  useTheme
} from '@material-ui/styles'
import CoreStepper from '@material-ui/core/Stepper'
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import Check from '@material-ui/icons/Check';
// Local Imports

// Styles
const useStepIconStyles = makeStyles({
    root: {
      display: 'flex',
      height: 22,
      alignItems: 'center',
    },
    active: {
      color: '#f17828',
    },
    circle: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
    completed: {
      color: '#f17828',
      zIndex: 1,
      fontSize: 18,
    },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    stepContainer: {
        background: theme.palette.primary.dark
    },
    labelRoot: {
        color: 'white !important'
    },
    labelActive: {
        color: `${theme.palette.secondary.main} !important`
    }
  }),
);

// Connector Component
const Connector = withStyles({
    alternativeLabel: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    active: {
      '& $line': {
        borderColor: '#f17828',
      },
    },
    completed: {
      '& $line': {
        borderColor: '#f17828',
      },
    },
    line: {
      borderColor: 'white',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  })(StepConnector);

function StepIcon(props: StepIconProps) {
    const classes = useStepIconStyles();
    const { active, completed } = props;

    return (
        <div
        className={clsx(classes.root, {
            [classes.active]: active,
        })}
        >
        {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
        </div>
    );
}

const getSteps = () => {
    return ['Pick Your Package', 'Mark Your Date', 'Give Contact Information', 'Confirm Booking'];
}

// Interfaces
interface Props {
    activeStep: number
}

const Stepper:React.FC<Props> = ( { activeStep } ) => {
    // Styles
    const classes = useStyles();
    const theme:Theme = useTheme()

    const matches = useMediaQuery(theme.breakpoints.down("sm"))

    const steps = getSteps();

    return (
        <div className={classes.root}>
          <CoreStepper alternativeLabel activeStep={activeStep} connector={<Connector />} className={classes.stepContainer}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel 
                    StepIconComponent={StepIcon} 
                    classes={{
                        label: classes.labelRoot,
                        active: classes.labelActive,
                        completed: classes.labelActive
                    }}
                    >
                        {!matches && label}
                </StepLabel>
              </Step>
            ))}
          </CoreStepper>
        </div>
    )
}

export default Stepper
