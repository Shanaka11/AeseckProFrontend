// React Imports
import React, { useState } from 'react'
// 3rd Party
import { RefetchOptions, QueryObserverResult } from 'react-query'
import { AxiosResponse } from 'axios'
// Material UI Imports
import { 
    GridColDef,
    GridValueGetterParams,
    GridRowParams
} from '@material-ui/data-grid';
import AddIcon from '@material-ui/icons/Add';
import {  
    makeStyles,
    Theme,
    Button ,
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
    userId: number,
    refetch?: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<AxiosResponse<any>, unknown>>
}

interface DialogProps {
    open: boolean,
    data?: {
        id: number,
        name: string,
        dateOfBirth: string
    }
    action: 'ADD'|'UPDATE'
}
// Datagrid Methods
const dataGridCalculateAge = (birthday?: string) => {
    if (birthday) {
        const birthDay = new Date (birthday)
        const currDay = new Date()
        return currDay.getFullYear() - birthDay.getFullYear()
    }
}
const dataGridGetAge = ( params:GridValueGetterParams ) => {
    const birthDayString = params.getValue(params.id, 'dateOfBirth')?.toString()
    return dataGridCalculateAge(birthDayString);
}

const dataGridGetAdultChild = (params:GridValueGetterParams) => {
    const birthDayString = params.getValue(params.id, 'dateOfBirth')?.toString()
    const age = dataGridCalculateAge(birthDayString);   

    if( age && age >= 18) {
        return 'Adult'
    }else{
        return 'Child'
    }
}

const UserTabDependentUserInfo:React.FC<Props> = ( { data, client, userId, refetch } ) => {
    // Style
    const classes = useStyles()

    // States
    const [add, setAdd] = useState<DialogProps>({
        action: 'ADD',
        open: false
    })

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
            sortable: false
        },
        { 
            field: "dateOfBirthDay", 
            headerName: "Date of Birth", 
            flex: 1,
            sortable: false,
            valueGetter: (params:GridValueGetterParams) => {return params.getValue(params.id, 'dateOfBirth')?.toString().split('T')[0] }
        },
        { 
            field: "age", 
            headerName: "Age", 
            flex: 1,
            sortable: false,
            valueGetter: dataGridGetAge
        },
        {
            field: "child", 
            headerName: "Child / Adult", 
            flex: 1,   
            sortable: false,
            valueGetter: dataGridGetAdultChild
        }
    ]

    // Methods
    const handleOnClose = (success: boolean = false) => {
        setAdd({...add, 'open' : false})
        if (success && refetch) {
            refetch()
        }
    }

    const handleRowClick = (param: GridRowParams, event: React.MouseEvent<Element, MouseEvent>) => {
        // TODO: Update dependent user
        // setAdd({
        //     action: 'UPDATE',
        //     open: true,
        //     data: {
        //         id: param.row.id,
        //         name: param.row.name,
        //         dateOfBirth: param.row.dateOfBirth,
        //     }
        // })
    }

    return (
        <div>
        {!client && 
            <>
            {add.open &&
                <Dialog 
                    onClose={handleOnClose}
                    userId={userId}
                    dialogProps={add}
                />
            }
            <Button
                variant='contained'
                disableElevation
                color='secondary'
                startIcon={ <AddIcon/> }
                className={classes.button}
                onClick={() => setAdd({...add, open : true, action : 'ADD'})}
            >
                Add Dependent Users
            </Button>
            </>
        }
        <Table 
            columns={columns} 
            rows={data.user.dependentUsers || []} 
            card={(data: any) => <></>} 
            handleOnRowClick={handleRowClick} 
            loading={false} 
            handlePageChange={(newPage:any) => {}}
            pageCount={data.user.dependentUsers ? data.user.dependentUsers.length : 0}
            light={client}
        />
        </div>
    )
}

export default UserTabDependentUserInfo
