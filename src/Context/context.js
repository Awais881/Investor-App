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
  baseUrl: `https://cloud1.sty-server.com/`,
  localURI: (window.location.href.includes('localhost'))? `https://localhost:3000` :`https://investor-e9e1c.web.app`
  
   
 
}


export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, data)
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
} 