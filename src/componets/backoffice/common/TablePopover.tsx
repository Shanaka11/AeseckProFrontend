// React Imports
import React, { useEffect, useState } from 'react'
// 3rd Party
// Material UI Imports
import { DataGrid, GridColDef, GridRowParams } from '@material-ui/data-grid';
import { 
    makeStyles,
    Theme,
    Fade
} from '@material-ui/core'
// Local Imports

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    card: {
        position: 'absolute',
        backgroundColor: 'white',
        padding: theme.spacing(3),
        width: 300,
        zIndex: 1,
        boxShadow: '5px 6px 8px -6px rgba(0,0,0,0.59)',
        border: '1px solid #00000012'
    },
}))

// Interface
interface Props {
    x: number,
    y: number,
    show: boolean,
    hover: boolean
}

const TablePopover:React.FC<Props> = ( { x, y, show, children } ) => {
    //  Style
    const classes = useStyles()

    return (
        <Fade in={show} unmountOnExit>
            <div className={classes.card} style={{top: y - 10, left: x}}>
                { children }
            </div>
        </Fade>
    )
}

export default TablePopover
