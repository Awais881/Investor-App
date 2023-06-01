import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import FrontPage from './FrontPage';
import GlobalContext from "./Context/context"
import { BrowserRouter } from 'react-router-dom';
import OneSignal from 'react-onesignal';
ReactDOM.render(




  <React.StrictMode>
  <GlobalContext>
    <BrowserRouter>
    <FrontPage />
    </BrowserRouter>
  </GlobalContext >
  </React.StrictMode>,
  

  document.getElementById('root')
);

<script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" defer>


  
  window.OneSignal = window.OneSignal || [];
  OneSignal.push(function() {
      OneSignal.init({
      appId: "04ebde81-8492-424e-bb30-ce087ea24240",
      })
  });
  console.log("Hello");
  
</script>
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



