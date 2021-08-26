// React Imports
import React, { useContext, useEffect } from 'react'
// 3rd Party
import { useHistory } from 'react-router-dom'
// Material UI Imports
import { 
    Container,
    makeStyles,
    Theme,
} from '@material-ui/core'
// Local Imports
import UserInfo from '../componets/userProfile/UserInfo'
import UserContext from '../context/userContext'

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    container:{        
        backgroundColor: theme.palette.primary.main,
        backgroundBlendMode: 'screen',        
    },
    mainContainer:{
        minHeight: 'calc(100vh - 400px)',
        backgroundColor: theme.palette.primary.light
    }
}))

// Interface
interface ProfileProps {

}

const Profile:React.FC<ProfileProps> = () => {
    // Styles
    const classes = useStyles()

    // Router
    const history = useHistory()

    // Context
    const { user } = useContext(UserContext)

    // Methods
    useEffect(() => {
        if(!user){
            // redirect
            history.push('/')
        }
    },
    [user, history])

    return (
        <div className={classes.container}>
            <Container className={classes.mainContainer}>
                <UserInfo />
            </Container>            
        </div>
    )
}

export default Profile
