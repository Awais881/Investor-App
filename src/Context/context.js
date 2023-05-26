// import { createContext } from 'react';

// const UserContext = createContext();

// export default UserContext;




import React, { createContext, useReducer } from 'react'
import { reducer } from './reducer';

export const GlobalContext = createContext("Initial Value");

let data = {
  darkTheme: true,
  user: {},
  isLogin: null,
  baseUrl: (window.location.href.includes('localhost')) ?
  `https://cloud1.sty-server.com/` : `/api/v1`,
  
   
 
}


export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, data)
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
} 