// React Imports
import React, { useEffect, useState } from 'react'
// 3rd Party
// Material UI Imports
import { DataGrid, GridColDef, GridRowParams } from '@material-ui/data-grid';
import { 
    makeStyles,
    Theme,
    Popover
} from '@material-ui/core'
// Local Imports


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
}

const Table:React.FC<TableProps> = ( { columns, rows } ) => {
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
            console.log(rowHover)
            if(rowHover){
                setShowCard(true)
            }            
        }, 2000)
        // console.log(event.clientX , event.clientY)
        console.log('enter')
    }

    const handleOnRowLeave = (param: GridRowParams, event: React.MouseEvent<Element, MouseEvent>) => {
        setShowCard(false)
        setRowHover(false)
        console.log('leave')
    }

    return (
        <>
        {showCard &&
            <div className={classes.card} style={{top: mouseY, left: mouseX}}>

            </div>
        }
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
