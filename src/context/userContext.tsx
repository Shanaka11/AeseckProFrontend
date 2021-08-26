import React, {createContext, useState} from 'react'
// 3rd Party
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

    // Query

    // Methods
    const logout = () => {
        localStorage.removeItem('userInfo')
        localStorage.removeItem('token')
        setUser(null)
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

