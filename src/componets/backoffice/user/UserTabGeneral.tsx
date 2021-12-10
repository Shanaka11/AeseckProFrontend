// React Imports
import React, { useState } from 'react'
// 3rd Party
import { useMutation } from 'react-query'
// Material UI Imports
import { 
    makeStyles,
    Theme,
    Grid,
    Typography,
    Button,
    TextField,
    CircularProgress
} from '@material-ui/core'
// Local Imports
import avatar from '../../../assets/avatar.jpg'
import { postSaveContact } from '../../../api/userApi'
import useFileUpload from '../../../utils/hooks/useFileUpload'
import { useHistory } from 'react-router'

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    subHeader: {
        marginTop: theme.spacing(4)
    },
    membershipButton: {
        marginTop: theme.spacing(2),
        height: 80,
        borderRadius: 0
    },
    fontColorBlack: {        
        color: 'black',
        "& .MuiTablePagination-root": {
            color: "black"
        },
        "& .MuiInputBase-root": {
            color: "black"
        }
    },
    uploadButtonContainer:{
        marginBottom: theme.spacing(3),
        position: 'relative'
    },
    uploadButton: {
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    updateButton: {
        marginTop: theme.spacing(2)
    },
    membershipContainer:{ 
        height: '100%'
    },
    fontWhite: {
        color: 'white'
    },
    textFieldUnderline: {
        '&:before':{
            borderColor: '#ffffff'//theme.palette.secondary.main,
        }
    },
    avatar: {
        objectFit: 'cover'
    }
}))

// Interface
interface Props {
    data: any,
    client?: boolean
}

// User Conctac detials / Membership details / Dependent users
const UserTabGeneral:React.FC<Props> = ( { data, client } ) => {
    // Style
    const classes = useStyles()

    // History
    const history = useHistory()

    // File Upload
    const { loading, filePath, handleUpload} = useFileUpload(() => updateContact(true))

    // Query
    const {
        isLoading: updateContactIsLoading,
        mutate: updateContactMutate
    } = useMutation(postSaveContact)


    // State
    const [formData, setFormData] = useState({
        firstName: data.contact.firstName,
        middleName: data.contact.middleName,
        surename: data.contact.surename,
        email: data.contact.emails[0] ? data.contact.emails[0].email.emailAddress : null,
        phoneNumber: data.contact.phoneNumbers[0] ? data.contact.phoneNumbers[0].phoneNumber.number : null,
        street: data.contact.addresses[0] ? data.contact.addresses[0].address.streetAddress : null,
        suburb: data.contact.addresses[0] ? data.contact.addresses[0].address.suburb : null,
        state: data.contact.addresses[0] ? data.contact.addresses[0].address.state : null,
        postalCode: data.contact.addresses[0] ? data.contact.addresses[0].address.postalCode : null,
        avatar: data.contact.avatarImage,
        edited: false
    })
    const [avatarLink] = useState(data.contact.avatarImage ? data.contact.avatarImage.s3Link : null)

    // Methods
    const handleFormChange = (event:any) => {
        const name = event.target.name
        if( name ==='profilePic') {
            handleUpload(event, `Avatar_${data.contact.id}_${data.contact.firstName}`)
        }else{
            setFormData({
                ...formData,
                [name]: event.target.value,
                edited: true
            })
        }
    }

    const handleOnSubmit = (event:any) => {
        event.preventDefault()
        updateContact()
    }

    const updateContact = (success :boolean = false) => {
        const contact = data.contact
        contact.firstName = formData.firstName
        contact.middleName = formData.middleName
        contact.surename = formData.surename
        if(formData.avatar || success){
            contact.avatar = {
                id: formData.avatar ? formData.avatar.id : 0,
                type: formData.avatar ? formData.avatar.type : `Avatar Image`,
                name: formData.avatar ? formData.avatar.name : `Avatar_${data.contact.id}_${data.contact.firstName}`,
                description: formData.avatar ? formData.avatar.description : `Avatar_${data.contact.id}_${data.contact.firstName}`,
                s3Link: success ? filePath : formData.avatar.s3Link ,
            }
        }else{
            contact.avatar = null
        }
        if(contact.emails[0]){
            contact.emails[0].email.emailAddress = formData.email
        }else{
            contact.emails[0] = { 
                contactId: contact.id,
                emailId: 0,
                default: true,
                email : {
                     id: 0,
                     emailAddress : formData.email 
                    }
                }
        }
        if(contact.phoneNumbers[0]){
            contact.phoneNumbers[0].phoneNumber.number = formData.phoneNumber
        }else{
            contact.phoneNumber[0] = {
                contactId: contact.id,
                phoneNumberId: 0,
                default: true,
                phoneNumber: {
                    id: 0,
                    default: false,
                    countryCode: '+61',
                    number : formData.phoneNumber
                }
            }
        }

        if(contact.addresses[0]){
            contact.addresses[0].address.streetAddress = formData.street
            contact.addresses[0].address.suburb = formData.suburb
            contact.addresses[0].address.state = formData.state
            contact.addresses[0].address.postalCode = formData.postalCode
        }else{
            contact.addresses[0] = {
                contactId: contact.id,
                addressId: 0,
                default: true,
                address: {
                    id: 0,
                    country: 'Australia',
                    streetAddress: formData.street,
                    suburb: formData.suburb,
                    state: formData.state,
                    postalCode: formData.postalCode
                }
            }
        }

        updateContactMutate(contact)
        if(success) {
            history.go(0)
        }
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={client ? 12 : 6}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Grid 
                                container 
                                justify='center' 
                                alignItems='center' 
                                className={classes.uploadButtonContainer}
                            >                
                                <img 
                                    alt='img-avatar' 
                                    className= {classes.avatar}
                                    src={avatarLink ?  avatarLink : avatar} 
                                    height={200} 
                                    width={200}
                                />
                                { //showUpButton &&
                                    <Button
                                        variant='contained'
                                        color='secondary'
                                        disableElevation
                                        className={classes.uploadButton}
                                        component='label'
                                        disabled= {loading}
                                        startIcon={loading && <CircularProgress size={20} />}
                                    >
                                        Upload Image
                                        <input
                                            name='profilePic'
                                            type='file'
                                            hidden
                                            onChange={handleFormChange}
                                        />
                                    </Button>
                                }   
                            </Grid>  
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                name='firstName'                          
                                variant='standard'
                                label='Firstname'
                                color='secondary'
                                value={formData.firstName}
                                onChange={handleFormChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                    classes: {
                                        root: client ? classes.fontWhite : undefined
                                    }
                                }}
                                classes={{
                                    root: client ? undefined : classes.fontColorBlack
                                }}
                                InputProps={{
                                    classes:{
                                        underline: client ? classes.textFieldUnderline : undefined
                                    }                                        
                                }}                        
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                name='middleName'                          
                                variant='standard'
                                label='Middlename'
                                color='secondary'
                                value={formData.middleName}
                                onChange={handleFormChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                    classes: {
                                        root: client ? classes.fontWhite : undefined
                                    }
                                }}
                                classes={{
                                    root: client ? undefined : classes.fontColorBlack
                                }}
                                InputProps={{
                                    classes:{
                                        underline: client ? classes.textFieldUnderline : undefined
                                    }                                        
                                }}                         
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name='surename'                          
                                variant='standard'
                                label='Surename'
                                color='secondary'
                                value={formData.surename}
                                onChange={handleFormChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                    classes: {
                                        root: client ? classes.fontWhite : undefined
                                    }
                                }}
                                classes={{
                                    root: client ? undefined : classes.fontColorBlack
                                }}  
                                InputProps={{
                                    classes:{
                                        underline: client ? classes.textFieldUnderline : undefined
                                    }                                        
                                }}                      
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name='email'    
                                type='email'                      
                                variant='standard'
                                label='Email'
                                color='secondary'
                                value={formData.email}
                                onChange={handleFormChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                    classes: {
                                        root: client ? classes.fontWhite : undefined
                                    }
                                }}
                                classes={{
                                    root: client ? undefined : classes.fontColorBlack
                                }}
                                InputProps={{
                                    classes:{
                                        underline: client ? classes.textFieldUnderline : undefined
                                    }                                        
                                }}                        
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name='phoneNumber'                          
                                variant='standard'
                                label='Phone Number'
                                color='secondary'
                                value={formData.phoneNumber}
                                onChange={handleFormChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                    classes: {
                                        root: client ? classes.fontWhite : undefined
                                    }
                                }}
                                classes={{
                                    root: client ? undefined : classes.fontColorBlack
                                }}
                                InputProps={{
                                    classes:{
                                        underline: client ? classes.textFieldUnderline : undefined
                                    }                                        
                                }}                          
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name='street'                          
                                variant='standard'
                                label='Street'
                                color='secondary'
                                value={formData.street}
                                onChange={handleFormChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                    classes: {
                                        root: client ? classes.fontWhite : undefined
                                    }
                                }}
                                classes={{
                                    root: client ? undefined : classes.fontColorBlack
                                }}
                                InputProps={{
                                    classes:{
                                        underline: client ? classes.textFieldUnderline : undefined
                                    }                                        
                                }}                          
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                name='suburb'                          
                                variant='standard'
                                label='Suburb'
                                color='secondary'
                                value={formData.suburb}
                                onChange={handleFormChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                    classes: {
                                        root: client ? classes.fontWhite : undefined
                                    }
                                }}
                                classes={{
                                    root: client ? undefined : classes.fontColorBlack
                                }}
                                InputProps={{
                                    classes:{
                                        underline: client ? classes.textFieldUnderline : undefined
                                    }                                        
                                }}                        
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                name='state'                          
                                variant='standard'
                                label='State'
                                color='secondary'
                                value={formData.state}
                                onChange={handleFormChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                    classes: {
                                        root: client ? classes.fontWhite : undefined
                                    }
                                }}
                                classes={{
                                    root: client ? undefined : classes.fontColorBlack
                                }}
                                InputProps={{
                                    classes:{
                                        underline: client ? classes.textFieldUnderline : undefined
                                    }                                        
                                }}                        
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                name='postalCode'                          
                                variant='standard'
                                label='Postal Code'
                                color='secondary'
                                value={formData.postalCode}
                                onChange={handleFormChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                    classes: {
                                        root: client ? classes.fontWhite : undefined
                                    }
                                }}
                                classes={{
                                    root: client ? undefined : classes.fontColorBlack
                                }}
                                InputProps={{
                                    classes:{
                                        underline: client ? classes.textFieldUnderline : undefined
                                    }                                        
                                }}                         
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.updateButton}>
                            <Grid container justifyContent='flex-end'>
                                <Grid item>
                                    <Button
                                        variant='contained'
                                        color='secondary'
                                        disableElevation
                                        disabled={!formData.edited || updateContactIsLoading}
                                        type='submit'
                                    >
                                        Update
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                { !client && 
                <Grid item xs={12} md={6}>
                    <Grid container justifyContent='center' alignItems='center' direction='column' className={classes.membershipContainer}>
                        <Grid item>
                            <Typography
                                variant = 'h6'
                            >
                                Membership
                            </Typography>
                        </Grid>
                        <Grid item>
                            {data.user.membershipTerm ? data.user.membershipTerm.displayName : null}
                        </Grid>
                        <Grid item>
                            <Button
                                fullWidth
                                color='secondary'
                                variant='contained'
                                disableElevation
                                className={classes.membershipButton}
                                disabled={updateContactIsLoading}
                            >
                                Change Membership
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                }
            </Grid>
        </form>
    )
}

export default UserTabGeneral
