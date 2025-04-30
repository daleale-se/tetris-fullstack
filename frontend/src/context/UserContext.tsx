import { createContext, useState } from 'react';
import { UserDataType } from '../types';
import { GUEST_USER } from '../constants';

export const UserContext = createContext("user");

export const UserContextProvider = ({children}) => {
    
    const [userData, setUserData] = useState<UserDataType | null>(GUEST_USER)

    return <UserContext.Provider value={{userData, setUserData}}>
        {children}
    </UserContext.Provider>
}