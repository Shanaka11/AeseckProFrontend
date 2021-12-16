// React
import React, { useEffect, useState } from 'react'
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
    userId: number,
    dialogProps: {
        open: boolean,
        data?: {
            id: number,
            name: string,
            dateOfBirth: string
        }
        action: 'ADD'|'UPDATE'
    }
}

const AddDependentUserDialog:React.FC<Props> = ({ onClose, userId, dialogProps }) => {
    // Style
    const classes = useStyles()

    console.log(dialogProps.data ? dialogProps.data.name.split(' ')[1] : '')

    // State
    const [firstName, setFirstName] = useState<String>(dialogProps.data ? dialogProps.data.name.split(' ')[0] : '')
    const [lastName, setLastName] = useState<String>(dialogProps.data ? dialogProps.data.name.split(' ')[1] : '')
    const [dateOfBirth, setDateOfBirth] = useState<Date>(dialogProps.data ? new Date(dialogProps.data.dateOfBirth.split('T')[0]) : new Date())

    // Query
    const {
        isLoading: postDependentUserIsLoading,
        mutate: postDependentUserMutate
    } = useMutation(postDependentUser, {
        onSuccess: () => onClose(true)
    })

    useEffect(() => {
        if(dialogProps.data && dialogProps.action === 'UPDATE'){
            setFirstName(dialogProps.data.name.split(' ')[0])
            setLastName(dialogProps.data.name.split(' ')[1])
            setDateOfBirth(new Date(dialogProps.data.dateOfBirth.split('T')[0]))
        }else if(dialogProps.action === 'ADD') {
            setFirstName('')
            setLastName('')
            setDateOfBirth(new Date())
        }
    }, [dialogProps])
    // Methods
    
    const handleDateOfBirthChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setDateOfBirth(new Date(event.target.value))
    }

    const handleAddUser = () => {
        const data = {
            'id': dialogProps.action === 'UPDATE' ? dialogProps.data!.id : 0,
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
            open={dialogProps.open}
            onClose={() => onClose()}
        >
            <DialogTitle
                className={classes.headerText}
            >
                {dialogProps.action === 'ADD' ? "Add New Dependent User" : 'Update Dependent User'}
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
