import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import Loader from './assets/Rolling-1s-200px.gif'
import App from './App'
import LoginPage from './components/login/Login'
import { GlobalContext } from './Context/context';
import { Routes, Route, Link,  Navigate } from "react-router-dom"
import ForgotPsword from './components/login/ForgotPsword'
import ChatScreen from './components/chatscreen'

// import UsersState from './Context/reducer';
import AccountSetting from './accountSettingPage/AccountSetting'
import { BrowserRouter } from 'react-router-dom';
// import Crypto from 'crypto'
// import 'react-toastify/dist/ReactToastify.css';
const FrontPage = () => {
    // const navigate = useNavigate();
    let { state, dispatch } = useContext(GlobalContext);
 
    //  var mykey = crypto.createCipher('aes-128-cbc', 'chatMessages');
    //  var mystr = mykey.update('abc', 'utf8', 'hex')
    // mystr += mykey.final('hex');

    const [user_Token, setUserToken] = useState(localStorage.getItem("token"));

    
    console.log('state', state)
    console.log('state detail', state.user)
    // setUserToken(state.user)
    const headers = {
        headers: {
          Authorization: `Bearer ${user_Token}`,
        },
      };
    useEffect(() => {

        const getUserData = async () => {
            axios
               .get(`https://cloud1.sty-server.com/api/user`, headers)
               .then(function (response) {
                if (response?.data?.status === 200) {
                   dispatch({
                     type: 'USER_LOGIN',
                     payload: response.data.user
                   })
                 }
                 console.log('re', response)
               })
               .catch(function (error) {
                 dispatch({
                   type: 'USER_LOGOUT',
                  
                 })
                 console.error(error);
               });
           }
           getUserData()
           
       }, [])
       

        //    useEffect(() => {
        //     // Check if the user is already authenticated
        //     if (user_Token) {
        
        //       navigate("/");
        //     }
        //     else  navigate("/login")
        
        //   }, [user_Token, navigate]);
      
    return (
        <>
            {/* //  <UsersState> 
            //  <BrowserRouter>
            //         <Routes>
            //             <Route path="/" element={<App />}></Route>
            //             <Route path="/login" element={<LoginPage />} />
            //             <Route path="/forget-password" element={<ForgotPsword />} />
            //             <Route path="/account-setting" element={<AccountSetting />}></Route>
            //         </Routes>
            //     </BrowserRouter > 
            //  </UsersState>   */}





            {(state.isLogin != (null || '' || undefined) && state.isLogin === true) ?
             
                     
                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route path='/m/:id' element={<ChatScreen />} />
                        <Route path="/account-setting" element={<AccountSetting />} />
                       
                        <Route path="*" element={<Navigate to="/" replace={true} />} />
                    </Routes>
                      
                
                : null}

            {state.isLogin == (null || '' || undefined || false) ?
           

                       
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/forget-password" element={<ForgotPsword />} />
                        <Route path="*" element={<Navigate to="/login" replace={true} />} />
                    </Routes>
                      
                
                : null
            }
           {(state.isLogin === null) ?

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: '100vh' }}>
        <img width={100} src={Loader} alt="loading" />
         </div>

          : null}



        </>
    )
}

export default FrontPage