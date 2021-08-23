// React Imports
import React, { useState } from 'react'
// 3rd Party
import { useQuery } from 'react-query'
import { useHistory } from 'react-router-dom'
// Material UI Imports
import { GridColDef, GridRowParams } from '@material-ui/data-grid';
import { 
    Container,
    Divider,
    Grid, 
    makeStyles,
    TextField,
    Theme,
    Typography,   
} from '@material-ui/core'
// Local Imports
import Table from '../../componets/backoffice/common/Table'
import { getUserList } from '../../api/userApi'
import UserPopup from '../../componets/backoffice/user/UserPopup'
import BreadCrumbs from '../../componets/backoffice/common/BreadCrumbs'

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
        marginBottom: 'auto'
    },
    gridContainer: {
        marginTop: theme.spacing(2)
    }    
}))

const UserListPage = () => {
    //  Style
    const classes = useStyles()

    // State
    const [page, setPage] = useState(1)
    
    // Routing 
    const history = useHistory()

    // Query
    const { 
        data,
        error,
        isLoading,
        isError
    } = useQuery(['UserInfo', page], 
        () => getUserList(page)
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
        history.push(`/backoffice/users/${param.id}`)
    }

    return (
        <Container className={classes.container}>
            <BreadCrumbs data={path}/>
            <Typography variant='h6' className={classes.textContainer}>
                User List - BackOffice
            </Typography>
            <Divider />
            <Grid container spacing={1} className={classes.gridContainer}>
                <Grid item xs={4}>
                    <Grid container spacing={2} className={classes.buttonContainer}>
                        <Grid item xs={12}>
                            <TextField 
                                variant='standard'
                                color='secondary'
                                label='Name'
                                size='small'
                                InputLabelProps={{
                                    shrink: true
                                }}
                                classes={{
                                    root: classes.fontColorBlack
                                }}
                                fullWidth
                            />
                        </Grid>
                    </Grid>                                    
                </Grid>                
            </Grid>
            {
                <Table 
                    columns={columns} 
                    rows={data?.data.pagedBookingList || []} 
                    card={(data: any) => <UserPopup data={data}/>} 
                    handleOnRowClick={handleOnRowClick} 
                    loading={isLoading} 
                    handlePageChange={(newPage:any) => setPage(newPage)}
                    pageCount={data?.data.totalCount || 0}
                />
            }
        </Container>
    )
}

export default UserListPage
