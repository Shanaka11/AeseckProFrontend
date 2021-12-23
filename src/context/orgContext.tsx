import React, {createContext, useState} from 'react'
// 3rd Party
// Local Imports

//Interface
interface Props {
    children:  React.ReactNode
}

interface ContextProps {
    activities: any,
    setActivities: (data:any) => void,
    orgData?: any,
    setOrgData: (data:any) => void,
    activityData?:any,
    appendActivityDataList: (data:any) => void
}

// Context
const OrgContext = createContext<ContextProps>({
    activities: [],
    setActivities: (data:any) => [],
    setOrgData: (data:any) => [],
    appendActivityDataList: (data:any) => []
})


// Provider
export const OrgContextProvider:React.FC<Props> = ({ children }) => {

    // States
    const [activities, setActivities] = useState<any>([])
    const [activityData, setActivityData] = useState<any>()
    const [orgData, setOrgData] = useState<any>()

    // Query

    // Methods
    const appendActivityDataList = ( data:any ) => {
        console.log(data)
        setActivityData((prevState:any) => ({
            ...prevState,
            [data.id] : data
        }))
    }

    return (
        <OrgContext.Provider value={{
            activities, setActivities, orgData, setOrgData, activityData, appendActivityDataList
        }}>
            {children}
        </OrgContext.Provider>
    )

}

export default OrgContext