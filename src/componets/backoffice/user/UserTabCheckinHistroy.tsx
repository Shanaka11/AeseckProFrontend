// React Imports
import React, { useState } from 'react'
// 3rd Party
import { useQuery } from 'react-query'
// Material UI Imports
import { 
    GridColDef
} from '@material-ui/data-grid';
// Local Imports
import Table from '../common/Table'
import { postSessionList } from '../../../api/sessionApi'


interface Props {
    data: any,
    client?: boolean
}

const UserTabCheckinHistroy:React.FC<Props> = ({ data, client }) => {

    // States
    const [page, setPage] = useState(1)

    // Query
    const {
        data: sessionListData,
        isLoading: sessionListIsLoading
    } = useQuery(
        ['SessionList', page],
        () => (
            postSessionList({
                "page": page,
                "pageSize": 10,
                "statusFilters": "10",
                "propertyFilters": [
                  {
                    "name": "UserId",
                    "operator": "=",
                    "values": [
                      `${data.contact.id}`
                    ]
                  }
                ]
            })
        )
    )

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
            field: "startDateTime", 
            headerName: "Start Date / Time", 
            flex: 1,
        },
        { 
            field: "type", 
            headerName: "Type", 
            flex: 1,
        },
        { 
            field: "category", 
            headerName: "Category", 
            flex: 1,
        }
    ]

    return (
        <Table 
            columns={columns} 
            rows={sessionListData?.data.response.response || []} 
            card={(data: any) => <></>} 
            handleOnRowClick={() => {}} 
            loading={sessionListIsLoading} 
            handlePageChange={(newPage:any) => setPage(newPage)}
            pageCount={sessionListData?.data.response.totalCount || 0}
            light={client}
        />
    )
}

export default UserTabCheckinHistroy
