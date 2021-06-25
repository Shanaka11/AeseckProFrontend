// React Imports
import React from 'react'
// 3rd Party
// Material UI Imports
import { 
    Container,
    Grid,
    Theme,
    makeStyles,
    Typography,
    Button
} from '@material-ui/core'
// Local Imports

// Style
const useStyles = makeStyles((theme: Theme) => ({
    container:{
        marginBottom: 8,
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.primary,        
        maxWidth: 400,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    },
    containerSelected: {
        transition: 'background_color 1500ms',
        backgroundColor: theme.palette.primary.dark,
    },
    gridContainer: {
        minHeight: 200,
    },
    button: {
        backgroundColor: '#499F68',
        color: theme.palette.text.primary,
        '&:hover':{
            backgroundColor: '#63d68c',            
        }
    },    
  }));

// Interface
interface PackageData {
    packageName: string,
    description: string,
    price: string
}

interface PackageListProps {
    id: number,
    handleOnClick: (id:number) => void
    data: PackageData,
    selected: boolean
}  

const Package:React.FC<PackageListProps> = ({ id, handleOnClick, data, selected }) => {
    //Styles
    const classes = useStyles()

    return (
        <Container 
            className={`${classes.container} ${selected ? classes.containerSelected : undefined}`}
            onClick={() => handleOnClick(id)}
        >
            <Grid container direction='column' justify='space-between' className={classes.gridContainer}>
                <Grid item>
                    <Typography variant='h6' align='center'>
                        {data.packageName}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='subtitle1'>
                        {data.description}
                    </Typography>                    
                </Grid>          
                <Grid item>
                    <Grid container justify='space-between'>
                        <Grid item>
                            <Typography variant='h6'>
                                {`${data.price} AUD`}
                            </Typography>                            
                        </Grid>
                        <Grid item>
                            <Button
                                variant='contained'
                                color='primary'
                                className={classes.button}
                                onClick={ () => handleOnClick(id) }
                            >
                                {selected ? 'Selected' : 'Select'}
                            </Button>
                        </Grid>
                    </Grid>                
                </Grid>      
            </Grid>
        </Container>
    )
}

export default Package
