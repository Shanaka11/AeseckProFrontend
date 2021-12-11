// React Imports
import React, { useState } from 'react'
// 3rd Party
// Material UI Imports
import { 
    Button,
    Grid,
    TextField,
    makeStyles,
    Theme,
    Menu,
    MenuItem
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';
// Local Imports

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    button:{        
        borderRadius: 0,
        width: 125
    },  
    searchButton: {
        borderRadius: 0
    },
    textFieldMain: {
        width: 200,
        borderRadius: 0
    },
    textFieldText: {
        color: 'black',
        borderRadius: 0
    },
    textFieldLabel: {
        color: theme.palette.text.primary
    },
    menu: {
        borderRadius: 0,
    },

    menuItem: {
        backgroundColor: theme.palette.secondary.main,
        minWidth: 125,
        borderRadius: 0
    },
    menuItemText: {
        textTransform: 'uppercase'
    }
}))

// Interfaces
interface Props {
    menuOptions: any,
    handleFilterSubmit: (filter: {name: string, value: string}) => void
}


const FilterText:React.FC<Props> = ( { menuOptions, handleFilterSubmit } ) => {
    // Style
    const classes = useStyles()

    // States
    const [anchorEl, setAnchorEl] = useState<any>(null)
    const [showMenu, setShowMenu] = useState(false)
    const [filterText, setFilterText] = useState('')
    const [filter, setFilter] = useState(menuOptions ? Object.keys(menuOptions)[0] : '')

    // Methods
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        handleFilterSubmit({
            name: filter,
            value: filterText
        })
        setShowMenu(false)
        setAnchorEl(null)
    }

    const handleFilterOnClick = (event:any) => {
        if(Object.keys(menuOptions).length !== 1){
            setAnchorEl(event.currentTarget)
            setShowMenu(true)
        }
    }

    const handleMenuItemOnClick = (value:string) => {
        setFilter(value)
        setFilterText('')
        setShowMenu(false)
    }

    return (
        <form onSubmit={handleSubmit}>
        <Grid container>
            <Menu
                anchorEl={anchorEl}
                open={showMenu}
                onClose={() => setShowMenu(false)}
                elevation={0}
                className={classes.menu}
                classes= {{
                    paper: classes.menuItem
                }}
            >
                {Object.keys(menuOptions).map((key) => (
                    <MenuItem
                        key={key}
                        onClick={ () => handleMenuItemOnClick(key) }
                        className={ classes.menuItemText }
                    >
                        {key}
                    </MenuItem>
                    ))
                }
            </Menu>
            <Button
                variant='contained'
                color='secondary'
                disableElevation
                className={
                    classes.button
                }
                endIcon= {
                    Object.keys(menuOptions).length !== 1 && <ExpandMoreIcon />
                }
                onClick={handleFilterOnClick}
            >
                {filter}
            </Button>
            <TextField
                variant='outlined'
                color='secondary'
                className={classes.textFieldMain}
                classes={{
                    root: classes.textFieldText
                }}
                InputProps={{
                    classes:{
                        root: classes.textFieldText
                    }
                }}
                // label='Filter Value'
                InputLabelProps={{
                    className:classes.textFieldLabel,
                    shrink: true,
                }}
                value={filterText}
                onChange={(event) => setFilterText(event.target.value)}
            />
            <Button
                variant='contained'
                disableElevation
                color='secondary'
                className={classes.searchButton}
                type='submit'
            >
                <SearchIcon />
            </Button>
        </Grid>
        </form>
    )
}

export default FilterText
