import { createContext, useState } from 'react';
import { UserDataType } from '../types';

export const UserContext = createContext("user");

export const UserContextProvider = ({children}) => {
    
    const [userData, setUserData] = useState<UserDataType>()

    return <UserContext.Provider value={{userData, setUserData}}>
        {children}
    </UserContext.Provider>
}