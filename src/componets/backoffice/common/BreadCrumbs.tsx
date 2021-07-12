// React Imports
import React, { useState } from 'react'
// 3rd Party
// Material UI Imports
import { 
    makeStyles,
    Theme,
    Breadcrumbs,
    Link,
} from '@material-ui/core'
// Local Imports

// Style
const useStyles = makeStyles((theme:Theme)=> ({
    container:{        
        marginTop: theme.spacing(3)
    },
    link: {
        fontSize: 'small'
    }
}))

// Interface
interface Props {
    data: {
        name: string,
        href: string
    }[]
}

const BreadCrumbs:React.FC<Props> = ( { data } ) => {
    
    // Styles
    const classes = useStyles()

    return (
        <Breadcrumbs className={classes.container}>
            {data.map((item, index) => (
                <Link 
                    key={index} 
                    href={item.href} 
                    className={classes.link}
                    color={index !== data.length - 1 ? 'inherit' : undefined}
                >
                    { item.name }
                </Link>
            ))}
      </Breadcrumbs>
    )
}

export default BreadCrumbs
