// React Imports
import React, { useEffect, useState } from 'react'
// 3rd Party
// Material UI Imports
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { 
    makeStyles,
    Theme,
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
    }
}))

// interface
interface TableProps {
    columns: GridColDef[],
    rows: any
}

const Table:React.FC<TableProps> = ( { columns, rows } ) => {
    //  Style
    const classes = useStyles()

    return (
        <DataGrid
            autoHeight
            pageSize={20}                
            columns={columns}
            rows={rows}
            classes={{
                root: classes.fontColorBlack
            }}
        />
    )
}

export default Table
