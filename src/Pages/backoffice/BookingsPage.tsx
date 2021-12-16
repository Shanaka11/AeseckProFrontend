// React Imports
import React, { useState } from 'react'
// 3rd Party
import { useQuery } from 'react-query'
import moment from 'moment';
// Material UI Imports
import { 
    GridColDef, 
    GridCellParams
} from '@material-ui/data-grid';
import { 
    Container,
    Grid, 
    makeStyles,
    TextField,
    Theme,
    Typography,
    Divider,
    CircularProgress    
} from '@material-ui/core'
// Local Imports
import Table from '../../componets/backoffice/common/Table'
import BreadCrumbs from '../../componets/backoffice/common/BreadCrumbs'
import Filter from '../../componets/backoffice/common/Filter'
import BookingPopup from '../../componets/backoffice/booking/BookingPopup'
import BookingActions from '../../componets/backoffice/booking/BookingActions'
import { getBookingList, getBookingFilter } from '../../api/bookingApi'
import BackofficeWrapper from '../../componets/common/BackofficeWrapper'


// Style
const useStyles = makeStyles((theme:Theme)=> ({
    container:{        
        marginBottom: 24,
    },
    textContainer: {
        marginTop: 12,
    },
    dateItem:{
        marginBottom: 8
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
        marginBottom: 'auto'
    }
}))


const BookingsPage = () => {
    //  Style
    const classes = useStyles()

    // States
    const [page, setPage] = useState(1)
    const [stateFilterString, setStateFilterString] = useState('')
    const [roomFilterString, setRoomFilterString] = useState('')
    const [fromDate, setFromDate] = useState(moment().startOf('month').format('YYYY-MM-DD'))
    const [toDate, setToDate] = useState(moment().endOf('month').format('YYYY-MM-DD'))

    // Query
    const {
        data,
        isLoading,
        refetch
    } = useQuery(['BookingList', page, stateFilterString, roomFilterString, fromDate, toDate], () => getBookingList({        
        "statusFilters": stateFilterString,
        "resourceFilters": roomFilterString,
        "fromDate": fromDate,
        "toDate": toDate,
        "page": page,
        "pageSize": 5
    }))

    const {
        data: filterData,
        isLoading: filterDataIsLoading,
    } = useQuery(['BookingFilter'], () => getBookingFilter(3))

    // Const
    const columns: GridColDef[] = [
        {
          field: "id",
          headerName: "Booking No",
          flex: 1,
          align: "center",
          headerAlign: "center",
          sortable: false,
          disableColumnMenu: true,
        },
        { 
            field: "bookingDate", 
            headerName: "Date", 
            flex: 0.6,
            sortable: false,
            disableColumnMenu: true,
        },
        { 
            field: "timeSlot", 
            headerName: "Time", 
            flex: 0.9,
            sortable: false,
            disableColumnMenu: true,
        },
        { 
            field: "packageCodes", 
            headerName: "Package",
            flex: 0.9,
            sortable: false,
            disableColumnMenu: true,
        },
        { 
            field: "capacity", 
            headerName: "No of Guests", 
            flex: 0.9,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            disableColumnMenu: true,
        },    
        { 
            field: "statusLabel", 
            headerName: "Status",
            flex: 0.8,
            sortable: false,
            disableColumnMenu: true,
        },
        { 
            field: "status", 
            headerName: "Actions",            
            flex: 1,
            headerAlign: "center",
            sortable: false,
            disableColumnMenu: true,            
            renderCell: (params: GridCellParams) => (
                <BookingActions status={params} refetch={refetch}/>
              )             
        },    
    ];        

    const path = [
        {
            name: 'Dasboard',
            href: '/backoffice'
        },
        {
            name: 'Bookings',
            href: '/backoffice/bookings'
        },                
    ]

    return (
        <BackofficeWrapper>
        <Container className={classes.container}>
            <BreadCrumbs data={path}/>
            <Typography variant='h6' className={classes.textContainer}>
                BookingsPage - BackOffice
            </Typography>
            <Divider />
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <Typography variant='body1' className={classes.textContainer} align='center'>
                        Date Range
                    </Typography>
                    <Grid container spacing={1} direction='column' justify='center' className={classes.dateItem}>
                        <Grid item>
                            <TextField 
                                type='date'
                                variant='standard'
                                label='From'
                                color='secondary'
                                size='small'
                                InputLabelProps={{
                                    shrink: true
                                }}
                                classes={{
                                    root: classes.fontColorBlack
                                }}
                                fullWidth
                                value={fromDate}
                                onChange={(event) => setFromDate(event.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                type='date'
                                variant='standard'
                                label='To'
                                color='secondary'
                                size='small'
                                InputLabelProps={{
                                    shrink: true
                                }}
                                classes={{
                                    root: classes.fontColorBlack
                                }}
                                fullWidth
                                value={toDate}
                                onChange={(event) => setToDate(event.target.value)}
                            />
                        </Grid>
                    </Grid>                                    
                </Grid>
                <Grid item xs={5}>
                    <Grid container className={`${classes.fill}`} direction='column'>
                        <Grid item>
                            <Typography variant='body1' className={classes.textContainer} align='center'>
                                Booking State
                            </Typography>                        
                        </Grid>
                        <Grid item>
                            {
                                filterDataIsLoading ?
                                <CircularProgress />
                                :
                                <Filter 
                                    data={filterData?.data.response.bookingStatusFilters} 
                                    filterString={stateFilterString} 
                                    setFilterString={setStateFilterString}
                                />
                            }
                        </Grid>
                    </Grid>    
                </Grid>
                <Grid item xs={5}>
                <Grid container className={`${classes.fill}`} direction='column'>
                        <Grid item>
                            <Typography variant='body1' className={classes.textContainer} align='center'>
                                Room
                            </Typography>                        
                        </Grid>
                        <Grid item>
                            <Grid container spacing={1} className={classes.buttonContainer}>
                                {
                                    filterDataIsLoading ?
                                    <CircularProgress />
                                    :
                                    <Filter 
                                        data={filterData?.data.response.resourceFilters}
                                        filterString={roomFilterString}
                                        setFilterString={setRoomFilterString}
                                    /> 
                                }                                                                     
                            </Grid>
                        </Grid>
                    </Grid>   
                </Grid>
            </Grid>
            <Table 
                columns={columns} 
                rows={data?.data.pagedBookingList ? data?.data.pagedBookingList : []} 
                card={(data: any) => <BookingPopup data={data}/>} 
                loading={isLoading} 
                handlePageChange={(newPage:any) => setPage(newPage)}
                pageCount={data?.data.totalCount || 0}
            />
        </Container>
        </BackofficeWrapper>
    )
}

export default BookingsPage

