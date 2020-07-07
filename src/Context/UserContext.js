import React, { createContext, useState } from 'react'

export const UserContext =createContext();

export default function UserContextProvider(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isSeller, setIsSeller] = useState(true);
    const [id, setId] = useState("")

    return (
        <UserContext.Provider value={{isLoggedIn,setIsLoggedIn,isSeller,setIsSeller,id, setId}}>
            {props.children}
        </UserContext.Provider>
    )
}
