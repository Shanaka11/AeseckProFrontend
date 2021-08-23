import React from 'react'
// 3rd Party
// Material UI Imports
import { 
    Button,
    Container,
    Grid, 
    makeStyles,
    Theme,
    Typography,
} from '@material-ui/core'
// Local Imports
import UserInfo from './UserInfo'
import ConnectedUserInfo from './ConnectedUserInfo'
import Session from './Session'
import AccessCards from './AccessCards'

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    container:{        
        backgroundColor: theme.palette.primary.light
    },
    subContainer: {
        marginTop: 12,
        marginBottom: 12,
    },
    buttonContainer:{ 
        marginTop: theme.spacing(2)
    },
    button: {
        height: 50,
        width: 100,
    },
    headerConatainer: {
        display: 'flex',
        alignItems: 'center'
    }
}))

// Interface
interface Props {
    barcode: string,
    userStatus: any,
    refetchUser: () => any,
    handleDone: () => void
}

const User:React.FC<Props> = ( { barcode, userStatus, refetchUser, handleDone } ) => {
    // Styles
    const classes = useStyles()

    // if userStatus is 10 then user is Checked in else he is not
    // When he is not Checked in call the check in end point
    // When he is checked in call the checkout end point

    if( !userStatus ) {
        return (
            <>
            </>
        )
    }

    const userInfo = userStatus.userDetails
    const sessionInfo = {
        sessionId: userStatus.sessionId,
        status: userStatus.status,
        startDateTime: userStatus.startDateTime.split('T')[1].split('.')[0],
        expectedEndDateTime: userStatus.expectedEndDateTime.split('T')[1].split('.')[0],
        endDateTime: userStatus.endDateTime.split('T')[1].split('.')[0],
        createdBy: userStatus.createdBy,
        type: userStatus.type,
        category: userStatus.category,
    }
    const accessCardList = userStatus.accessCards

    return (
        <Grid container className={classes.container}>
            <Grid item xs={6} className={classes.headerConatainer}>         
                <Container>
                    <Typography variant='h3' component='h3' color='textPrimary'>
                        Hi, {userInfo.firstName}
                    </Typography>
                </Container>
            </Grid>
            <Grid item xs={6}>
                <Container className={classes.buttonContainer}>
                    <Grid container justifyContent='flex-end'>
                        <Button
                            variant='contained'
                            color='secondary'
                            className={classes.button}
                            onClick={handleDone}
                            disableElevation
                        >
                            Done
                        </Button>
                    </Grid>
                </Container>
            </Grid>
            <Grid item xs={6}>
                <Container className={classes.subContainer}>
                    {/* UserDetails */}
                    <UserInfo refetch={refetchUser} userInfo={userInfo} handleDone={handleDone}/>
                    {/* Dependent Users */}
                    {
                        userStatus.dependentUsers.map((item:any, index:number) => (
                            <ConnectedUserInfo key={item.dependentId} primaryUserId={userInfo.userId} user={item} refetchUser={refetchUser}/>
                        ))
                    }
                </Container>
            </Grid> 
            <Grid item xs={6}>
                <Container className={classes.subContainer}>
                    {/* Session Info */}
                    <Session sessionInfo={sessionInfo}/>
                    {/* AccessCards */}
                    <AccessCards accessCardList={accessCardList || []} sessionId={sessionInfo.sessionId} refetchUser={refetchUser}/>
                </Container>
            </Grid>
        </Grid>
    )
}

export default User