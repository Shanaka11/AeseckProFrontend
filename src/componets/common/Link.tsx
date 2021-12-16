import React from 'react'
import { Link as RouterLink} from 'react-router-dom'


interface Props {
    to: string
}

const Link:React.FC<Props> = ( { to, children} ) => {
    return (
        <RouterLink to={to} style={{ textDecoration: 'none'}}>
            {children}
        </RouterLink>
    )
}

export default Link
