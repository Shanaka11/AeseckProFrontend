// React Imports
import React, { useState } from 'react'
// 3rd Party
// Material UI Imports
import { GridColDef, GridCellParams } from '@material-ui/data-grid';
import { 
    Button,
    Container,
    Divider,
    Grid, 
    makeStyles,
    TextField,
    Theme,
    Typography,    
} from '@material-ui/core'
import { 
    ToggleButton 
} from '@material-ui/lab';
// Local Imports
import Table from '../../componets/backoffice/common/Table'

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
    }
}))

// Const
const columns: GridColDef[] = [
    {
      field: "bookingNo",
      headerName: "Booking No",
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable: false,
      disableColumnMenu: true,
    },
    { 
        field: "date", 
        headerName: "Date", 
        flex: 0.7,
    },
    { 
        field: "time", 
        headerName: "Time", 
        flex: 0.7,
    },
  ];

const rows = [
    { id: 1, bookingNo: 1, date: '12/10/2021', time: '12:00', age: 35 },
    { id: 2, bookingNo: 2, date: '12/10/2021', time: '11:00', age: 42 },
    { id: 3, bookingNo: 3, date: '12/10/2021', time: '10:30', age: 45 },
    { id: 4, bookingNo: 4, date: '12/10/2021', time: '9:30', age: 16 },
    { id: 5, bookingNo: 5, date: '12/10/2021', time: '8:30', age: null },
    { id: 6, bookingNo: 6, date: '12/10/2021', time: '12:30', age: 150 },
    { id: 7, bookingNo: 7, date: '12/10/2021', time: '13:30', age: 44 },
    { id: 8, bookingNo: 8, date: '12/10/2021', time: '14:30', age: 36 },
    { id: 9, bookingNo: 9, date: '12/10/2021', time: '15:30', age: 65 },
];  


const UserListPage = () => {
    //  Style
    const classes = useStyles()
    const [confirmed, setConfirmed] = useState(false)
    const [pending, setPending] = useState(false)
    const [cancelled, setCancelled] = useState(false)

    const [bakery, setBakery] = useState(false)
    const [science, setScience] = useState(false)
    const [partyRoom, setPartyRoom] = useState(false)
    const [other, setOther] = useState(false)
    
    // Const
    const columns: GridColDef[] = [
        {
          field: "bookingNo",
          headerName: "Booking No",
          flex: 1,
          align: "center",
          headerAlign: "center",
          sortable: false,
          disableColumnMenu: true,
        },
        { 
            field: "date", 
            headerName: "Date", 
            flex: 0.7,
        },
        { 
            field: "time", 
            headerName: "Time", 
            flex: 0.7,
        },
    ]

    return (
        <Container className={classes.container}>
            <Typography variant='h6' className={classes.textContainer}>
                User List - BackOffice
            </Typography>
            <Divider />
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <Grid item>
                        <Typography variant='body1' className={classes.textContainer}>
                            Name
                        </Typography>
                    </Grid>
                    <Grid container spacing={2} className={classes.buttonContainer}>
                        <Grid item xs={12}>
                            <TextField 
                                variant='standard'
                                color='secondary'
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
                <Grid item xs={3}>
                    <Grid container className={`${classes.fill}`} direction='column'>
                        <Grid item>
                            <Typography variant='body1' className={classes.textContainer}>
                                Booking State
                            </Typography>                        
                        </Grid>
                        <Grid item>
                            <Grid container spacing={1} className={classes.buttonContainer}>
                                <Grid item xs={4}>
                                    <ToggleButton
                                        selected={confirmed}
                                        onChange={() => {
                                            setConfirmed(!confirmed);
                                        }}
                                        size='small'
                                        className={classes.toggleButton}
                                    >
                                        Confirmed
                                    </ToggleButton>                                    
                                </Grid>
                                <Grid item xs={4}>
                                    <ToggleButton
                                        selected={pending}
                                        onChange={() => {
                                            setPending(!pending);
                                        }}
                                        size='small'
                                        className={classes.toggleButton}
                                    >
                                        Pending
                                    </ToggleButton>                                    
                                </Grid>
                                <Grid item xs={4}>
                                    <ToggleButton
                                        selected={cancelled}
                                        onChange={() => {
                                            setCancelled(!cancelled);
                                        }}
                                        size='small'
                                        className={classes.toggleButton}
                                    >
                                        Cancelled
                                    </ToggleButton>                                    
                                </Grid>                                                                
                            </Grid>
                        </Grid>
                    </Grid>    
                </Grid>
                <Grid item xs={5}>
                <Grid container className={`${classes.fill}`} direction='column'>
                        <Grid item>
                            <Typography variant='body1' className={classes.textContainer}>
                                Room
                            </Typography>                        
                        </Grid>
                        <Grid item>
                            <Grid container spacing={1} className={classes.buttonContainer}>
                                <Grid item xs={3}>
                                    <ToggleButton
                                        selected={bakery}
                                        onChange={() => {
                                            setBakery(!bakery);
                                        }}
                                        size='small'
                                        className={classes.toggleButton}
                                    >
                                        Bakery
                                    </ToggleButton>                                    
                                </Grid>
                                <Grid item xs={3}>
                                    <ToggleButton
                                        selected={science}
                                        onChange={() => {
                                            setScience(!science);
                                        }}
                                        size='small'
                                        className={classes.toggleButton}
                                    >
                                        Science
                                    </ToggleButton>                                    
                                </Grid>
                                <Grid item xs={3}>
                                    <ToggleButton
                                        selected={partyRoom}
                                        onChange={() => {
                                            setPartyRoom(!partyRoom);
                                        }}
                                        size='small'
                                        className={classes.toggleButton}
                                    >
                                        Party Room
                                    </ToggleButton>                                    
                                </Grid>            
                                <Grid item xs={3}>
                                    <ToggleButton
                                        selected={other}
                                        onChange={() => {
                                            setOther(!other);
                                        }}
                                        size='small'
                                        className={classes.toggleButton}
                                    >
                                        Other Room
                                    </ToggleButton>                                    
                                </Grid>                                                                                     
                            </Grid>
                        </Grid>
                    </Grid>   
                </Grid>
            </Grid>
            <Table columns={columns} rows={rows}/>
        </Container>
    )
}

export default UserListPage
