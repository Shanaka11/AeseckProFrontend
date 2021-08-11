// React Imports
import React from 'react'
// Material UI Imports
import { 
    Grid,
    CircularProgress,
    makeStyles,
    Theme
} from '@material-ui/core'
// Local Imports
import FilterItem from './FilterItem'

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    container:{        
        marginBottom: 8,
    },
}))

// Interfaces
interface Props {
    data: any,
    filterString: string,
    loading?: boolean,
    setFilterString: (filterString: string) => void
}

const Filter:React.FC<Props> = ( { data, filterString, loading, setFilterString } ) => {
    // Styles
    const classes = useStyles()

    // Methods
    const handleFilterItemOnClick = (id:number, selected:boolean) => {
        if(selected){
            if(filterString.length === 0){
                setFilterString(`${id}`)
            }else{
                setFilterString(`${filterString},${id}`)
            }
        }else{
            const list = filterString.split(',')

            const reducer = (accumulator:string, currentValue:string, currentIndex:number) => {
                if(currentValue !== `${id}`){
                    if(accumulator === ''){
                        return accumulator = currentValue
                    }
                    return accumulator = accumulator + ',' + currentValue
                }
                return accumulator
            }

            setFilterString(list.reduce(reducer, ''))
            
        }
    }

    return (
        <Grid container spacing={1} justify='center' alignItems='center' className={classes.container}>
            {
                loading ?
                <CircularProgress />
                :
                Object.keys(data).map((key) => (
                    <Grid item key={data[key]}>
                        <FilterItem item={{id: data[key], label: key}} handleOnClick={handleFilterItemOnClick}/>
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default Filter
