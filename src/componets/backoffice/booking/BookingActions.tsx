// React Imports
import React from 'react'
// 3rd Party
import { useMutation, RefetchOptions, QueryObserverResult } from 'react-query'
import { AxiosResponse } from 'axios'
// Material UI Imports
import { 
    GridCellParams,
} from '@material-ui/data-grid';
import { 
    Button,
    Grid,    
} from '@material-ui/core'
// Local Imports
import { changeStatus } from '../../../api/bookingApi'

// Interfaces
interface Props {
    status:GridCellParams
    refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<AxiosResponse<any>, unknown>>
}

const BookingActions:React.FC<Props> = ({ status, refetch }) => {

    // Query
    const {
        error: changeStateError,
        isLoading: changeStateIsloading,
        isError: changeStateIsError,
        mutate: changeStateMutate,
    } = useMutation(changeStatus, {
        onSuccess: () => refetch()
    })

    return (
        <Grid container spacing={2}>
            {
                (status.formattedValue === 10 || status.formattedValue === 20) &&
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={ () => changeStateMutate({
                            "bookingId":status.id,
                            "newStatusId":80
                        })}
                        disabled= {changeStateIsloading}
                    >
                        Confirm
                    </Button>
                </Grid>
            }
            {
                (status.formattedValue === 10 || status.formattedValue === 20 || status.formattedValue === 80) &&
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={ () => changeStateMutate({
                            "bookingId":status.id,
                            "newStatusId":90
                        })}
                        disabled= {changeStateIsloading}
                    >
                        Cancel
                    </Button>
                </Grid>
            }                    
        </Grid>
    )
}

export default BookingActions
