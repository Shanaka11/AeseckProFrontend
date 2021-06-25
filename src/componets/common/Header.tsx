// TODO
// Drawer
// Menu - Activities
// Menu - Avatar
// Add Dynamic Data
// Add Functionality

// React Imports
import React, { useState } from 'react'
// 3rd Party
import { useLocation } from 'react-router-dom'
// Material UI Imports
import { 
    makeStyles,
    useMediaQuery, 
    Theme,
    AppBar,
    Toolbar,
    Typography,
    Container,
    Tabs,
    Tab,
    IconButton,
    SwipeableDrawer,
    List,
    ListItem,
    ListItemText,
} from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
// Local Imports

// Style
const useStyles = makeStyles((theme: Theme) => ({
    toolbar:{
        padding: 0
    },
    tabs: {
      marginLeft: 'auto'
    },
    avatar: {
        color: '#ffffff'
    },
    drawerIconContainer: {
        marginLeft: 'auto',
        '&hover': {
            backgroundColor: 'transparent'
        }
    },
    drawerIcon: {
        height: 50,
        width: 50,
        color: '#ffffff'
    },
    drawer: {
        backgroundColor: theme.palette.primary.main
    },
    drawerItem: {
        color: '#ffffff',
        opacity: 0.7,
        '&:hover': {
            opacity: 1
        }
    },
    drawerItemSelected:{
        '& .MuiListItemText-root':{
            opacity: 1
        }
    },
  }));

const Header = () => {

    // Style
    const classes = useStyles()
    const theme:Theme = useTheme()

    const matches = useMediaQuery(theme.breakpoints.down("md"))
    // const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    // States
    const [value, setValue] = useState(0)
    const [openDrawer, setOpenDrawer] = useState(false)

    // Routers
    const location = useLocation()    

    // Methods

    // Components
    const tabs = (
        <Tabs value={value} className={classes.tabs} indicatorColor='primary'>
            {/* Only show this tab when on the home page */}
            <Tab component='a' href='#' label='Activities' onClick={ () => setValue(0)} />
            <Tab 
                component='a' 
                href='' 
                label='Contact Us' 
                onClick={ (event) => {
                    let element = document.getElementById("footer");
                    event.preventDefault();  // Stop Page Reloading
                    element && element.scrollIntoView({ behavior: "smooth", block: "start" });                    
                }} 
                />
        </Tabs>
    )

    const drawer = (
        <>
        <SwipeableDrawer 
            // disableBackdropTransition={!iOS} 
            // disableDiscovery={iOS}
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            onOpen={() => setOpenDrawer(true)}
            classes={{
                paper: classes.drawer
            }}
        >
            <List disablePadding>
                <ListItem 
                    // onClick={() => { setOpenDrawer(false); setValue(route.activeIndex)}}
                    // component = {Link}
                    divider
                    button
                    // selected = { value === route.activeIndex}
                    // to={route.link}
                    classes={{
                        selected: classes.drawerItemSelected
                    }}
                >
                    <ListItemText 
                        className={classes.drawerItem}
                        disableTypography
                    >
                        Activities
                    </ListItemText>
                </ListItem>
                <ListItem
                    divider
                    button
                    classes={{
                        selected: classes.drawerItemSelected
                    }}                        
                >
                    <ListItemText
                        className={classes.drawerItem}
                        disableTypography
                    >
                        Contact Us
                    </ListItemText>
                </ListItem>
            </List>
        </SwipeableDrawer>        
        <IconButton onClick={() => setOpenDrawer(!openDrawer)} disableRipple className={classes.drawerIconContainer}>
            <MenuIcon className={classes.drawerIcon}/>
        </IconButton>
        </>
    )

    if(location.pathname === '/login'){
        return (<></>)
    }

    return (
    <AppBar position="static">
        <Container>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6">
                    Community Center
                </Typography>
                { matches ? drawer : tabs }
                {/* Show only when logged in */}
                {false && 
                    <IconButton>
                        <AccountCircleIcon className={classes.avatar}/>
                    </IconButton>
                }
            </Toolbar>
        </Container>
      </AppBar>
    )
}

export default Header
