// React Imports
import React from 'react'
// 3rd Party
// Material UI Imports
// Local Imports
import ListItem from './ListItem'

// Interfaces
interface ListDataProps {
    name: string,
    link: string
}
interface ListProps {
    id: string,
    data: ListDataProps[]
}

const List:React.FC<ListProps> = ( { id, data } ) => {

    return (
        <div id={id}>
            {
                data.map((item, index) => (
                    <ListItem key={`ListItem-${item.name}`} item={item} layout={index % 2} />
                ))
            }            
            {/* <ListItem layout={1} />
            <ListItem layout={0} />
            <ListItem layout={1} /> */}
        </div>
    )
}

export default List
