// React Imports
import React from 'react'
// 3rd Party Imports
import { Link as RouterLink} from 'react-router-dom';
// Material UI Imports

interface Props {
    to: string
}

const Link: React.FC<Props> = ({to, children}) => {
    return (
        <RouterLink to={to} style={{ textDecoration: 'none'}}>
            { children }
        </RouterLink>
    )
}

export default Link
