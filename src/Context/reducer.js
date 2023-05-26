// import React, { useState } from 'react';
// import UserContext from './context';

// const UsersState = ({ children }) => {

//     const [userState, setUserState] = useState({
//         token: null,
//         id: null,
//         role_id: null,
//         name: null,
//         email: null,
//         isLogin: null
//     })
//     return (
//         <UserContext.Provider value={{ userState, setUserState }}>
//             {children}
//         </UserContext.Provider>
//     )
// }

// export default UsersState;






export  const reducer = (state, action) => {
  switch (action.type) {

    case "USER_LOGIN": {
      return { ...state, isLogin: true, user: action.payload };
    }
    case "USER_LOGOUT": {
      return { ...state, isLogin: false } // set this to null on purpose, do not change
    }

    
    case "TOGGLE_THEME": {
      return { ...state, darkTheme: !state.darkTheme } // set this to null on purpose, do not change
    }



    default: {
      return state
    }
  }
}