// React Imports
import React, { useState } from 'react'
// 3rd Party
// Material UI Imports
import { 
    GridColDef
} from '@material-ui/data-grid';
import AddIcon from '@material-ui/icons/Add';
import {  
    makeStyles,
    Theme,
    Button 
} from '@material-ui/core';
// Local Imports
import Table from '../common/Table'
import Dialog from '../user/AddDependentUserDialog'

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    button: {
        marginBottom: theme.spacing(2)
    },
}))

interface Props {
    data: any,
    client?: boolean,
    userId: number
}

const UserTabDependentUserInfo:React.FC<Props> = ( { data, client, userId } ) => {
    // Style
    const classes = useStyles()

    // States
    const [add, setAdd] = useState(false)

    // Const
    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "Id",
            flex: 0.3,
            align: "center",
            headerAlign: "center",
            sortable: false,
            disableColumnMenu: true,       
        },
        { 
            field: "name", 
            headerName: "Name", 
            flex: 1,
        },
        { 
            field: "dateOfBirth", 
            headerName: "Date of Birth", 
            flex: 1,
        },
        { 
            field: "age", 
            headerName: "Age", 
            flex: 1,
        },
        {
            field: "child", 
            headerName: "Child / Adult", 
            flex: 1,   
        }
    ]

    return (
        <div>
        {!client &&
            <>
            <Dialog 
                onClose={() => setAdd(false)}
                open={add}
                userId={userId}
            />
            
            <Button
                variant='contained'
                disableElevation
                color='secondary'
                startIcon={ <AddIcon/> }
                className={classes.button}
                onClick={() => setAdd(true)}
            >
                Add Dependent Users
            </Button>
            </>
        }
        <Table 
            columns={columns} 
            rows={data.user.dependentUsers || []} 
            card={(data: any) => <></>} 
            handleOnRowClick={() => {}} 
            loading={false} 
            handlePageChange={(newPage:any) => {}}
            pageCount={data.user.dependentUsers ? data.user.dependentUsers.length : 0}
            light={client}
        />
        </div>
    )
}

export default UserTabDependentUserInfo
