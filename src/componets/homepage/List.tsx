// React Imports
import React from 'react'
// 3rd Party
// Material UI Imports
// Local Imports
import ListItem from './ListItem'

// Interfaces
interface ListDataProps {
    id: number,
    title: string,
    description: string,
    images: imageType[],
    activities?: string[],
}
interface ListProps {
    id: string,
    data: ListDataProps[],
    activityCenter?: string
}

interface imageType {
    imageId: number,
    imageCategory: string,
    imageTitle: string,
    imageDescription: string,
    imageUrl: string    
}

const List:React.FC<ListProps> = ( { id, data, activityCenter } ) => {

    // console.log(data)
    return (
        <div id={id}>
            {
                data.map((item, index) => (
                    <ListItem key={`ListItem-${item.title}`} item={item} layout={index % 2} activityCenter={activityCenter}/>
                ))
            }            
        </div>
    )
}

export default List
