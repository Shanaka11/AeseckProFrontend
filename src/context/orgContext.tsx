import React, {createContext, useState} from 'react'
// 3rd Party
// Local Imports

//Interface
interface Props {
    children:  React.ReactNode
}

interface ContextProps {
    activities: [],
    setActivities: (data:any) => void
}

// Context
const OrgContext = createContext<ContextProps>({
    activities: [],
    setActivities: (data:any) => []
})


// Provider
export const OrgContextProvider:React.FC<Props> = ({ children }) => {

    // States
    const [activities, setActivities] = useState<any>([])

    // Query

    // Methods

    return (
        <OrgContext.Provider value={{
            activities, setActivities
        }}>
            {children}
        </OrgContext.Provider>
    )

}

export default OrgContext