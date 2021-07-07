// React Imports
import React, { useEffect, useState } from 'react'
// 3rd Party
// Material UI Imports
import { DataGrid, GridColDef, GridRowParams } from '@material-ui/data-grid';
import { 
    makeStyles,
    Theme,    
} from '@material-ui/core'
// Local Imports
import Popover from './TablePopover'
import UserPopup from '../user/UserPopup'


// Style
const useStyles = makeStyles((theme:Theme)=> ({
    container:{        
        marginBottom: 24,

    },
    textContainer: {
        marginTop: 12,
        marginBottom: 12
    },
    fontColorBlack: {        
        color: 'black',
        "& .MuiTablePagination-root": {
            color: "black"
        }
    },
    card: {
        position: 'absolute',
        backgroundColor: 'pink',
        height: 350,
        width: 300,
        zIndex: 1
    },
    textColor: {
        color: 'black'
    }
}))

// interface
interface TableProps {
    columns: GridColDef[],
    rows: any,
    card: React.ReactNode
}

const Table:React.FC<TableProps> = ( { columns, rows, card } ) => {
    //  Style
    const classes = useStyles()

    // State
    const [mouseX, setMouseX] = useState(500)
    const [mouseY, setMouseY] = useState(500)
    const [showCard, setShowCard] = useState(false)
    const [rowHover, setRowHover] = useState(false)


    // Methods
    const handleOnRowEnter = (param: GridRowParams, event: React.MouseEvent<Element, MouseEvent>) => {
        setMouseX(event.clientX) 
        setMouseY(event.clientY)
        setRowHover(true)
        setTimeout( () => {
            if(rowHover){
                setShowCard(true)
            }            
        }, 500)        
    }

    const handleOnRowLeave = (param: GridRowParams, event: React.MouseEvent<Element, MouseEvent>) => {
        if(showCard){
            setShowCard(false)
        }
        setRowHover(false)
    }

    return (
        <>
        <Popover x={mouseX} y={mouseY} show={showCard} hover={rowHover}>
            {/* <UserPopup /> */}
            { card }
        </Popover>
        <DataGrid
            autoHeight
            pageSize={20}                
            columns={columns}
            rows={rows}
            classes={{
                root: classes.fontColorBlack
            }}
            // onRowOver={(param: GridRowParams, event: React.MouseEvent<Element, MouseEvent>) => {setMouseX(event.clientX); setMouseY(event.clientY); setShowCard(true)}}
            onRowLeave={ handleOnRowLeave }
            onRowEnter={ handleOnRowEnter }
            // onMouseLeave={handlePopoverClose}
        />
        </>
    )
}

export default Table
