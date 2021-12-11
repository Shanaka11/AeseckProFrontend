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
import OrgContext from '../../context/orgContext';
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
        // backgroundColor: theme.palette.secondary.main,
        opacity: 1
    },
    avatar: {
        backgroundColor: theme.palette.secondary.main,
        cursor: 'pointer'
    },
    avatarBackoffice: {
        backgroundColor: theme.palette.primary.main,
        cursor: 'pointer',
        marginLeft: 'auto'
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

    // States
    const [openDrawer, setOpenDrawer] = useState(false)
    const [menuUserOpen, setMenuUserOpen] = useState(false)
    const [menuActivitiesOpen, setMenuActivitiesOpen] = useState(false)

    const [anchorEl, setAnchorEl] = useState<any>(null)
    const [anchorElActivities, setAnchorElActivities] = useState<any>(null)

    // Context
    const { user, logout } = useContext(UserContext)
    const { activities } = useContext(OrgContext)

    // Routers
    const location = useLocation()    
    const history = useHistory()

    // Const
    const backoffice = location.pathname.includes('/backoffice')

    // Methods

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

    const handleActivitiesOnClick = (event:any) => {
        setAnchorElActivities(event.currentTarget)
        setMenuActivitiesOpen(true)
    }

    const handleActivitiesMenuItemClick = (href:string) => {
        setAnchorElActivities(null)
        setMenuActivitiesOpen(false)
        history.push(href)
    }

    const handleActivitiesMenuClose = () => {
        setAnchorElActivities(null)
        setMenuActivitiesOpen(false)
    }

    // Components
    const tabs = (
        <>
        {   
            !backoffice &&
            <Tabs 
                value={0}
                className={classes.tabs} 
                indicatorColor={backoffice ? 'secondary' : 'primary'}
            >
                <Tab
                    component='a'
                    label='Home'
                    href='/'
                    selected
                >
                </Tab>
                {/* <Tab
                    component='a'
                    label='Activities'
                    className={classes.logintab}
                    onClick={handleActivitiesOnClick}
                    selected
                >
                </Tab> */}
                            {
                activities.map((item:any) => (
                    <Tab
                        component='a'
                        className={classes.logintab}
                        href={`/${item.id}`}
                        label={item.title}
                    />
                ))
                }
                <Tab 
                    component='a' 
                    href='' 
                    label='Contact Us' 
                    className={classes.logintab}
                    onClick={ (event) => {
                        let element = document.getElementById("footer");
                        event.preventDefault();  // Stop Page Reloading
                        element && element.scrollIntoView({ behavior: "smooth", block: "start" });                    
                    }} 
                    selected
                />
                <Tab 
                    component='a' 
                    href='/aboutus' 
                    label='About Us' 
                    className={classes.logintab}
                    selected
                />
                { !user && 
                    <Tab component='a' href='/login' label='Sign In' className={classes.logintab} selected/>
                }
            </Tabs>
        }
        { user && 
            <Avatar
                className={backoffice ? classes.avatarBackoffice : classes.avatar}
                onClick={(event) => handleAvatarOnClick(event)}
                src={user.avatar}
            >
                {user.username ? user.username.substring(0,2).toUpperCase() : 'UD'}
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
        <Menu
            anchorEl={anchorElActivities}
            open={menuActivitiesOpen}
            onClose={handleActivitiesMenuClose}
            MenuListProps={{
                onMouseLeave: handleActivitiesMenuClose
            }}
            keepMounted
            elevation={0}
            className={classes.menu}
            classes = {{
                paper: classes.menuItem
            }}
        >
            {
                activities.map((item:any) => (
                    <MenuItem
                        onClick = { () => handleActivitiesMenuItemClick(`/${item.id}`) }
                    >
                        {item.title}
                    </MenuItem>
                ))
            }
        </Menu>
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
                        onClick={() => {history.push('/'); setOpenDrawer(false)}}
                    >
                        Home
                    </ListItemText>
                </ListItem>
                {
                    activities.map((item:any) => (
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
                                onClick={() => {history.push(`/${item.id}`); setOpenDrawer(false)}}
                            >
                                { item.title }
                            </ListItemText>
                        </ListItem>
                    ))
                }
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
                        onClick={() => {history.push('/aboutus'); setOpenDrawer(false)}}
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
                                onClick={() => {history.push('/profile'); setOpenDrawer(false)}}
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
    <AppBar position="static" color={backoffice ? 'secondary' : 'primary'}>
        <Container>
            <Toolbar className={classes.toolbar}>
                <img 
                    alt='login-img' 
                    src={logo} 
                    className={classes.imageContainer}
                    onClick={() => history.push('/')}
                />
                { matches ? drawer : tabs }
            </Toolbar>
        </Container>
      </AppBar>
    )
}

export default Header
