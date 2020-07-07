import React, { createContext, useState } from 'react'

export const UserContext =createContext();

export default function UserContextProvider(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [id, setId] = useState("")

    return (
        <UserContext.Provider value={{isLoggedIn,setIsLoggedIn,isSeller,setIsSeller,id, setId}}>
            {props.children}
        </UserContext.Provider>
    )
}
