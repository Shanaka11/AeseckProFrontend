import React, {createContext, useState} from 'react'
// 3rd Party
import { useHistory } from 'react-router-dom'
// Local Imports

//Interface
interface Props {
    children:  React.ReactNode
}

interface ContextProps {
    user: any,
    setUser: (user:any) => void,
    logout: () => void
}

// Context
const UserContext = createContext<ContextProps>({
    user: '',
    setUser: (user:any) => 1,
    logout: () => {}
})

// Provider
export const UserContextProvider:React.FC<Props> = ({ children }) => {

    // States
    const [user, setUser] = useState<any>(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : null)
    const history = useHistory()

    // Query

    // Methods
    const logout = () => {
        localStorage.removeItem('userInfo')
        localStorage.removeItem('token')
        setUser(null)
        history.push('/')
    }

    return (
        <UserContext.Provider value={{
            user, setUser, logout
        }}>
            {children}
        </UserContext.Provider>
    )

}

export default UserContext

