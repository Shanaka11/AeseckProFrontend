// React Imports
import React from 'react'
// 3rd Party Imports
// Material UI Imports
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

// Interfaces
interface MainAlertProps{
    message: string,
    severity: "success" | "info" | "warning" | "error" | undefined
}
function SubAlert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const Alert:React.FC<MainAlertProps> = ( { message, severity } ) => {

    // States
    const [open, setOpen] = React.useState(message ? true : false);

    // Methods
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <SubAlert onClose={handleClose} severity={severity}>
                { message }
            </SubAlert>
      </Snackbar>
    )
}

export default Alert
