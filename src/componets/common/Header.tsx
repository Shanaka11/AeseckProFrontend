// React Imports
import React, { useState, useContext } from 'react'
// 3rd Party
import { useLocation, useHistory } from 'react-router-dom'
// Material UI Imports
import { 
    makeStyles,
    useMediaQuery, 
    Theme,
    AppBar,
    Toolbar,
    Container,
    Tabs,
    Tab,
    IconButton,
    SwipeableDrawer,
    List,
    ListItem,
    ListItemText,
    Avatar,
    Menu,
    MenuItem
} from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import MenuIcon from '@material-ui/icons/Menu';
// Local Imports
import UserContext from '../../context/userContext'
import logo from '../../assets/Logo.png'

// Style
const useStyles = makeStyles((theme: Theme) => ({
    toolbar:{
        padding: 0
    },
    tabs: {
      marginLeft: 'auto'
    },
    bookingTab: {
        backgroundColor: theme.palette.secondary.main,
        fontWeight: 'bold'
    },
    logintab: {
        backgroundColor: theme.palette.secondary.main,
        opacity: 1
    },
    avatar: {
        backgroundColor: theme.palette.secondary.main,
        cursor: 'pointer'
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
    menu: {
        borderRadius: 0,
    },

    menuItem: {
        backgroundColor: theme.palette.primary.light,
        minWidth: 150
    },
    imageContainer : {
        height: 50,
        cursor: 'pointer'
    }
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
    const [menuUserOpen, setMenuUserOpen] = useState(false)
    // const [menuActivityOpen, setMenuActivityOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState<any>(null)

    // Context
    const { user, logout } = useContext(UserContext)

    // Routers
    const location = useLocation()    
    const history = useHistory()

    // Methods
    // const handleActivityOnClick = (event:any) => {
    //     setAnchorEl(event.currentTarget)
    //     setMenuActivityOpen(true)
    // }

    // const handleActivityMenuClose = () => {
    //     setAnchorEl(null)
    //     setMenuActivityOpen(false)
    // }

    const handleAvatarOnClick = (event:any) => {
        setAnchorEl(event.currentTarget)
        setMenuUserOpen(true)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
        setMenuUserOpen(false)
    }

    const handleProfileClick = () => {
        setAnchorEl(null)
        setMenuUserOpen(false)
        history.push('/profile')
    }

    const handleLogoutClick = () => {
        setAnchorEl(null)
        setMenuUserOpen(false)
        logout()
    }

    // Components
    const tabs = (
        <>
        <Tabs value={value} className={classes.tabs} indicatorColor='primary'>
            {/* Only show this tab when on the home page */}
            <Tab component='a' href='/3/booking' label='Make a Booking' className={classes.bookingTab}/>
            {/* <Tab component='a' href='#' label='Activities' onClick={ (event:any) => handleActivityOnClick(event)} /> */}
            <Tab 
                component='a' 
                href='' 
                label='Contact Us' 
                onClick={ (event) => {
                    let element = document.getElementById("footer");
                    event.preventDefault();  // Stop Page Reloading
                    element && element.scrollIntoView({ behavior: "smooth", block: "start" });                    
                }} 
                selected
                />
                <Tab component='a' href='#' label='About Us' onClick={ () => setValue(0)} />
                { !user && 
                    <Tab component='a' href='/login' label='Sign In / Sign Up' className={classes.logintab} selected/>
                }
        </Tabs>
        { user && 
            <Avatar
                className={classes.avatar}
                onClick={(event) => handleAvatarOnClick(event)}
            >
                {user.username ? user.username.substring(0,2) : 'UD'}
            </Avatar>
        }
        <Menu
            anchorEl={anchorEl}
            open={menuUserOpen}
            onClose={handleMenuClose}
            MenuListProps={{
                onMouseLeave: handleMenuClose
            }}
            keepMounted
            elevation={0}
            className={classes.menu}
            classes= {{
                paper: classes.menuItem
            }}
        >
            <MenuItem
                onClick={ () => handleProfileClick() }
            >
                Profile
            </MenuItem>
            <MenuItem
                onClick= { () => handleLogoutClick() }
            >
                Logout
            </MenuItem>
        </Menu>
        {/* <Menu
            anchorEl={anchorEl}
            open={menuActivityOpen}
            onClose={handleActivityMenuClose}
            MenuListProps={{
                onMouseLeave: handleActivityMenuClose
            }}
            keepMounted
            elevation={0}
            className={classes.menu}
            classes= {{
                paper: classes.menuItem
            }}
        >
            <MenuItem>
                Gymnasium
            </MenuItem>
            <MenuItem>
                Party Rooms
            </MenuItem>
            <MenuItem>
                Education
            </MenuItem>
            <MenuItem>
                Kids Play Area
            </MenuItem>
        </Menu> */}
        </>
    )

    const drawer = (
        <>
        <SwipeableDrawer 
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            onOpen={() => setOpenDrawer(true)}
            classes={{
                paper: classes.drawer
            }}
        >
            <List disablePadding>
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
                        Make a Booking
                    </ListItemText>
                </ListItem>
                {/* <ListItem 
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
                        Activities
                    </ListItemText>
                </ListItem> */}
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
                        About Us
                    </ListItemText>
                </ListItem>
                { user ?
                    <>
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
                                Profile
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
                                onClick={() => {logout(); setOpenDrawer(false);}}
                            >
                                Logout
                            </ListItemText>
                        </ListItem>
                    </>
                    :
                    <>
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
                                onClick={() => {history.push('/login'); setOpenDrawer(false)}}
                            >
                                Sign In / Sign Up
                        </ListItemText>
                    </ListItem>
                    </>
                }
            </List>
        </SwipeableDrawer>        
        <IconButton onClick={() => setOpenDrawer(!openDrawer)} disableRipple className={classes.drawerIconContainer}>
            <MenuIcon className={classes.drawerIcon}/>
        </IconButton>
        </>
    )

    if(location.pathname === '/login' || location.pathname === `/checkinout`){
        return (<></>)
    }

    return (
    <AppBar position="static">
        <Container>
            <Toolbar className={classes.toolbar}>
                {/* <Typography variant="h6">
                    Community Center
                </Typography> */}
                <img 
                    alt='login-img' 
                    src={logo} 
                    className={classes.imageContainer}
                    onClick={() => history.push('/')}
                />
                { matches ? drawer : tabs }
                {/* Show only when logged in */}
                {/* {false && 
                    <IconButton>
                        <AccountCircleIcon className={classes.avatar}/>
                    </IconButton>
                } */}
            </Toolbar>
        </Container>
      </AppBar>
    )
}

export default Header
