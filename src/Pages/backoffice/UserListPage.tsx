// React Imports
import React, { useState } from 'react'
// 3rd Party
import { useQuery } from 'react-query'
import { useHistory } from 'react-router-dom'
// Material UI Imports
import { GridColDef, GridRowParams, GridValueGetterParams } from '@material-ui/data-grid';
import { 
    Container,
    Divider,
    Grid, 
    makeStyles,
    // TextField,
    Theme,
    Typography,
    CircularProgress   
} from '@material-ui/core'
// Local Imports
import Table from '../../componets/backoffice/common/Table'
import { getUserList, getUserFilters } from '../../api/userApi'
import Filter from '../../componets/backoffice/common/Filter'
import UserPopup from '../../componets/backoffice/user/UserPopup'
import BreadCrumbs from '../../componets/backoffice/common/BreadCrumbs'
import FilterText from '../../componets/backoffice/common/FilterText'
import BackofficeWrapper from '../../componets/common/BackofficeWrapper'

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    container:{        
        marginBottom: 24,
    },
    textContainer: {
        marginTop: 12,
    },
    filterItem:{
        marginBottom: 12
    },
    fontColorBlack: {        
        color: 'black',
        "& .MuiTablePagination-root": {
            color: "black"
        },
        "& .MuiInputBase-root": {
            color: "black"
        }
    },
    toggleButton: {
        width: '100%'
    },
    fill:{
        height: '100%'
    },
    buttonContainer: {
        marginTop: 'auto',
        marginBottom: 'auto',
        height: '100%'
    },
    gridContainer: {
        marginTop: theme.spacing(2)
    },
    filterContainer:{
        display: 'flex',
        alignItems: 'end'
    }    
}))

const UserListPage = () => {
    //  Style
    const classes = useStyles()

    // State
    const [page, setPage] = useState(1)
    const [stateFilterString, setStateFilterString] = useState('')
    const [propertyFilter, setPropertyFilter] = useState<any>(null)
    
    // Routing 
    const history = useHistory()

    // Query
    const { 
        data,
        error,
        isLoading,
        isError
    } = useQuery(['UserInfo', page, stateFilterString, propertyFilter], 
        () => getUserList({
            page: page,
            pageSize: 5,
            statusFilters: stateFilterString,
            propertyFilters: propertyFilter
        })
    )

    const {
        data: filterData,
        isLoading: filterDataIsLoading,
    } = useQuery(['BookingFilter'], () => getUserFilters())

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
          valueGetter: (params: GridValueGetterParams) => {return params.row.primaryUser.id} 
        },
        { 
            field: "firstName", 
            headerName: "First Name", 
            flex: 1,
        },
        { 
            field: "surename", 
            headerName: "Surename", 
            flex: 1,
        },
    ]

    const path = [
        {
            name: 'Dasboard',
            href: '/backoffice'
        },
        {
            name: 'Users',
            href: '/backoffice/users'
        },                
    ]

    // Methods
    const handleOnRowClick = (param: GridRowParams, event: React.MouseEvent<Element, MouseEvent>) => {
        history.push(`/backoffice/users/${param.row.primaryUser.id}`)
    }

    const handleFilterChange = (filter: {name: string, value: string}) => {
        if(filter.value === ''){
            setPropertyFilter(null)
        }else{
            setPropertyFilter(
                [
                    {
                        name: filter.name,
                        operator: filter.name === 'Name' ? '_like' : '=',
                        values: [
                            filter.value
                        ]
                    }
                ]
            )   
        }
    }


    return (
        <BackofficeWrapper>
        <Container className={classes.container}>
            <BreadCrumbs data={path}/>
            <Typography variant='h6' className={classes.textContainer}>
                User List - BackOffice
            </Typography>
            <Divider />
            <Grid container spacing={1} className={classes.gridContainer}>
                <Grid item xs={4}>
                    <Grid container spacing={2} className={classes.buttonContainer} direction='column' justify='center'>
                        <Grid item xs={12} className={classes.filterContainer}>
                            { filterDataIsLoading ?
                                <CircularProgress />
                                :
                                <FilterText menuOptions={filterData?.data.propertyFilters} handleFilterSubmit={handleFilterChange}/>
                            }
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={8}>
                    <Grid container direction='column'>
                        <Grid item>
                            <Typography variant='body1' className={classes.textContainer} align='center'>
                                State
                            </Typography>                        
                        </Grid>    
                        <Grid item>
                            {
                                filterDataIsLoading ?
                                <CircularProgress />
                                :
                                <Filter 
                                    data={filterData?.data.userStatusFilters} 
                                    filterString={stateFilterString} 
                                    setFilterString={setStateFilterString}
                                />
                            }
                        </Grid>                        
                    </Grid>
                </Grid>                
            </Grid>
            {
                <Table 
                    columns={columns} 
                    rows={data?.data.pagedContactList || []} 
                    card={(data: any) => <UserPopup data={data}/>} 
                    handleOnRowClick={handleOnRowClick} 
                    loading={isLoading} 
                    handlePageChange={(newPage:any) => setPage(newPage)}
                    pageCount={data?.data.totalCount || 0}
                />
            }
        </Container>
        </BackofficeWrapper>
    )
}

export default UserListPage
