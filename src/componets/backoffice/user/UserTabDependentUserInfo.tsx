// React Imports
import React from 'react'
// 3rd Party
// Material UI Imports
import { 
    GridColDef
} from '@material-ui/data-grid';
// Local Imports
import Table from '../common/Table'

interface Props {
    data: any,
    client?: boolean
}

const UserTabDependentUserInfo:React.FC<Props> = ( { data, client } ) => {

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
            field: "firstName", 
            headerName: "First Name", 
            flex: 1,
        },
        { 
            field: "lastName", 
            headerName: "Last Name", 
            flex: 1,
        },
        { 
            field: "dateofbirth", 
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
