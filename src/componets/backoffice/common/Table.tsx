// React Imports
import React, { useState } from 'react'
// 3rd Party
// Material UI Imports
import { 
    DataGrid, 
    GridColDef, 
    GridRowParams,
    MuiEvent
} from '@material-ui/data-grid';

import { 
    makeStyles,
    Theme,    
} from '@material-ui/core'
// Local Imports
import Popover from './TablePopover'


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
    handleOnRowClick?: (param: GridRowParams, event: any) => void,
    handlePageChange: (newPage:number) => void,
    loading: boolean,
    pageCount: number,
}

const Table:React.FC<TableProps> = ( { columns, rows, card, handleOnRowClick, handlePageChange, loading, pageCount } ) => {
    //  Style
    const classes = useStyles()

    // State
    const [mouseX, setMouseX] = useState(500)
    const [mouseY, setMouseY] = useState(500)
    const [showCard, setShowCard] = useState(false)
    const [rowHover, setRowHover] = useState(false)
    const [rowData, setRowData] = useState<any>()
    const [page, setPage] = useState(0)


    // Methods
    const handleOnRowEnter = (param: GridRowParams, event: any) => {
        setMouseX(event.clientX) 
        setMouseY(event.clientY)
        setRowHover(true)
        setTimeout( () => {
            if(rowHover){
                setShowCard(true)
            }
        }, 1000)
        setRowData(param.row)        
    }

    const handleOnRowLeave = (param: GridRowParams, event: MuiEvent<React.SyntheticEvent<Element, Event>>) => {
        if(showCard){
            setShowCard(false)
        }
        setRowHover(false)
    }

    return (
        <>
        <Popover x={mouseX} y={mouseY} show={showCard && rowData} hover={rowHover}>
            {/* <UserPopup /> */}     
            { card(rowData) }  
        </Popover>
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                pagination
                pageSize={5}
                page={page}
                rowCount={pageCount}
                paginationMode='server'
                onPageChange={(newPage) => {setPage(newPage); handlePageChange(newPage + 1);}}
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
        </div>
        </>
    )
}

export default Table
