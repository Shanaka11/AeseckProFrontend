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
import { postBookingList } from '../../../api/bookingApi'

interface Props {
    data: any,
    client?: boolean
}

const UserTabBookingHistory:React.FC<Props> = ({ data, client }) => {
    // States
    const [page, setPage] = useState(1)

    // Query
    const {
        data: bookingListData,
        isLoading: bookingListIsLoading
    } = useQuery(
        ['BookingList', page],
        () => (
            postBookingList({
                "page": page,
                "pageSize": 10,
                "statusFilters": "",
                "resourceFilters": "",
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
            rows={bookingListData?.data.response.response || []} 
            card={(data: any) => <></>} 
            handleOnRowClick={() => {}} 
            loading={bookingListIsLoading} 
            handlePageChange={(newPage:any) => setPage(newPage)}
            pageCount={bookingListData?.data.response.totalCount || 0}
            light={client}
        />
    )
}

export default UserTabBookingHistory
