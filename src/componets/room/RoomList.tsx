// React Imports
import React, { useState } from 'react'
// 3rd Party
// Material UI Imports
import { 
    Container,
    Grid,
    Theme,
    makeStyles,
} from '@material-ui/core'
// Local Imports
import RoomListItem from './RoomListItem'
import PackageList from './PackageList'

// Style
const useStyles = makeStyles((theme: Theme) => ({
    container:{
        paddingTop: 32,
        paddingBottom: 32,        
        backgroundColor: '#499F68',
        color: theme.palette.text.primary
    },
  }));

interface RoomListProps {
    id: string
}

// Const
const rooms = [
    {
        name: 'Room1',
        description: 'Room Short Description1',
        packages: [
            {
                packageName: 'Package11',
                description: '11 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, illum?',
                price: '1020.00'
            },
            {
                packageName: 'Package12',
                description: '12 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, illum?',
                price: '1023.00'
            },
            {
                packageName: 'Package13',
                description: '13 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, illum?',
                price: '1025.00'
            },                        
        ]
    },
    {
        name: 'Room2',
        description: 'Room Short Description2',
        packages: [
            {
                packageName: 'Package21',
                description: '11 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, illum?',
                price: '1021.00'
            },
            {
                packageName: 'Package22',
                description: '12 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, illum?',
                price: '1026.00'
            },
            {
                packageName: 'Package23',
                description: '13 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, illum?',
                price: '1026.00'
            },            
        ]        
    },
    {
        name: 'Room3',
        description: 'Room Short Description3',
        packages: [
            {
                packageName: 'Package31',
                description: '31 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, illum?',
                price: '500.00'
            },
            {
                packageName: 'Package32',
                description: '32 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, illum?',
                price: '189.00'
            },
            {
                packageName: 'Package33',
                description: '33 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, illum?',
                price: '1201.00'
            },                        
        ]        
    }
]

const RoomList:React.FC<RoomListProps> = ({ id }) => {
    // Style
    const classes = useStyles()

    // State
    const [selectedIndex, setSelectedIndex] = useState(0)


    // Methods
    const handleOnMouseOver = (id:number) => {
        setSelectedIndex(id)
    }

    return (
        <Grid id={id} container className={`${classes.container}`}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={5} md={7}>
                        <div> 
                            {rooms.map((item, index) => (
                                <RoomListItem data={item} key={`Room-${item.name}`}id={index} selected={ index === selectedIndex} handleOnMouseOver={handleOnMouseOver}/>
                            ))}
                        </div>
                    </Grid>
                    <Grid item xs={7} md={5}>
                        <PackageList data={rooms[selectedIndex].packages}/>
                    </Grid>
                </Grid>
            </Container>
        </Grid>
    )
}

export default RoomList
