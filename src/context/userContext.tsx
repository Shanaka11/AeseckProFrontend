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
}

// Context
const UserContext = createContext<ContextProps>({
    user: '',
    setUser: (user:any) => 1,
})

// Provider
export const UserContextProvider:React.FC<Props> = ({ children }) => {

    // States
    const [user, setUser] = useState<any>(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : null)

    // Query

    // Methods

    return (
        <UserContext.Provider value={{
            user, setUser
        }}>
            {children}
        </UserContext.Provider>
    )

}

export default UserContext

