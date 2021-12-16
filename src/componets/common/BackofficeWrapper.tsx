// React Imports
import React, { useContext } from 'react'
// 3rd Party
import { useHistory } from 'react-router-dom'
// Local Imports
import UserContext from '../../context/userContext'

interface Props {
    children: any
}

const BackofficeWrapper:React.FC<Props> = ({ children }) => {

    const history = useHistory()

    const { user } = useContext(UserContext)

    if(!user || user.role !== 'admin'){
        history.goBack()
        return
    }

    return (
        children
    )
}

export default BackofficeWrapper
