import React, { useState } from 'react';
import UserContext from './UserContext';

const UsersState = ({ children }) => {

    const [userState, setUserState] = useState({
        token: null,
        id: null,
        role_id: null,
        name: null,
        email: null,
    })
    return (
        <UserContext.Provider value={{ userState, setUserState }}>
            {children}
        </UserContext.Provider>
    )
}

export default UsersState;