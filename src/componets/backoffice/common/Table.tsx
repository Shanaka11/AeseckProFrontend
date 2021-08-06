// React Imports
import React, { useEffect, useState } from 'react'
// 3rd Party
// Material UI Imports
import { 
    DataGrid, 
    GridColDef, 
    GridRowParams, 
    GridPageChangeParams 
} from '@material-ui/data-grid';

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
    card: (data: any) => any,
    handleOnRowClick?: (param: GridRowParams, event: React.MouseEvent<Element, MouseEvent>) => void,
    handlePageChange: (newPage:number) => void,
    loading: boolean
}

const Table:React.FC<TableProps> = ( { columns, rows, card, handleOnRowClick, handlePageChange, loading } ) => {
    //  Style
    const classes = useStyles()

    // State
    const [mouseX, setMouseX] = useState(500)
    const [mouseY, setMouseY] = useState(500)
    const [showCard, setShowCard] = useState(false)
    const [rowHover, setRowHover] = useState(false)
    const [rowData, setRowData] = useState<any>()


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
        setRowData(param.row)        
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
            { card(rowData) }  
        </Popover>
        <DataGrid
            autoHeight
            pagination
            pageSize={5}
            rowCount={11}
            paginationMode='server'
            onPageChange={(newPage) => handlePageChange(newPage.page + 1)}
            loading={loading}             
            columns={columns}
            rows={rows}
            classes={{
                root: classes.fontColorBlack
            }}
            onRowLeave={ handleOnRowLeave }
            onRowEnter={ handleOnRowEnter }
            onRowClick={ handleOnRowClick }
        />
        </>
    )
}

export default Table
