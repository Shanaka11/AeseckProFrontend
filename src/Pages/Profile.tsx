// React Imports
import React from 'react'
// 3rd Party
// Material UI Imports
import { 
    Container,
    makeStyles,
    Theme,
} from '@material-ui/core'
// Local Imports
import UserInfo from '../componets/userProfile/UserInfo'

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    container:{        
        backgroundImage: "url('https://i.redd.it/lsa3lv6c2r651.png')",
        backgroundColor: '#499F68',
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

    return (
        <div className={classes.container}>
            <Container className={classes.mainContainer}>
                <UserInfo />
            </Container>            
        </div>
    )
}

export default Profile
