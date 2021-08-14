import React from 'react'
import { Slide } from '@material-ui/core'

const Temp = () => {
    return (
        <Slide in={true} direction='left' mountOnEnter unmountOnExit >
            <h1>Test</h1>
        </Slide>
    )
}
export default Temp
