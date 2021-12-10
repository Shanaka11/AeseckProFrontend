// React
import React, { useState } from 'react'
// 3rd Party
import { useMutation } from 'react-query'
import moment from 'moment';
// Material UI Imports
import { 
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    makeStyles,
    Theme,
    TextField,
    CircularProgress,
} from '@material-ui/core'
// Local
import { postDependentUser } from '../../../api/userApi'
// Style
const useStyles = makeStyles((theme: Theme) => ({
    container:{
        minHeight: 450,
    },
    headerText: {
        color: 'black'
    },
    textMargin: {
        marginBottom: theme.spacing(2)
    }
  }));

// Interfaces
interface Props {
    onClose: (success?: boolean) => void,
    open: boolean,
    userId: number
}

const AddDependentUserDialog:React.FC<Props> = ({ open, onClose, userId }) => {
    // Style
    const classes = useStyles()

    // State
    const [firstName, setFirstName] = useState<String>()
    const [lastName, setLastName] = useState<String>()
    const [dateOfBirth, setDateOfBirth] = useState<Date>()

    // Query
    const {
        isLoading: postDependentUserIsLoading,
        mutate: postDependentUserMutate
    } = useMutation(postDependentUser, {
        onSuccess: () => onClose(true)
    })

    // Methods
    const handleDateOfBirthChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setDateOfBirth(new Date(event.target.value))
    }

    const handleAddUser = () => {
        const data = {
            'id':0,
            'primaryUserId': userId,
            'name': `${firstName} ${lastName}`,
            'description': '',
            'catefory': null,
            'subCategory': null,
            'dateOfBirth': dateOfBirth
        }
        postDependentUserMutate(data)
    }

    return (
        <Dialog
            open={open}
            onClose={() => onClose()}
        >
            <DialogTitle
                className={classes.headerText}
            >
                Add New Dependent User
            </DialogTitle>
            <DialogContent>
                <TextField
                    label='First Name'
                    fullWidth
                    color='secondary'
                    InputLabelProps={{
                        shrink: true,
                    }}
                    className= {classes.textMargin}
                    InputProps={{
                        className: classes.headerText                                
                    }}
                    onChange={(event) => setFirstName(event.target.value)}
                    value={firstName}
                />
                <TextField
                    label='Last Name'
                    fullWidth
                    color='secondary'
                    InputLabelProps={{
                        shrink: true,
                    }}
                    className= {classes.textMargin}
                    InputProps={{
                        className: classes.headerText                                
                    }}
                    onChange={(event) => setLastName(event.target.value)}
                    value={lastName}
                />
                <TextField
                    label='Date of Birth'
                    fullWidth
                    type='date'
                    color='secondary'
                    InputLabelProps={{
                        shrink: true,
                    }}
                    className= {classes.textMargin}
                    InputProps={{
                        className: classes.headerText                                
                    }}
                    onChange={handleDateOfBirthChange}
                    value={moment(dateOfBirth).format('YYYY-MM-DD')}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant = 'contained' 
                    color='secondary'
                    onClick={() => handleAddUser()}
                    disableElevation
                    disabled={postDependentUserIsLoading}
                    startIcon={postDependentUserIsLoading && <CircularProgress size={20}/>}
                >
                    Save
                </Button>
                <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => onClose()}
                    disableElevation
                    disabled={postDependentUserIsLoading}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddDependentUserDialog
