import React, { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

import axios from "axios";
// import $ from "jquery";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import classNameName from "./Login.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import InfoIcon from "@mui/icons-material/Info";
import { Formik } from "formik";
import image from "../../assets/loginpage.png";
import EmailIcon from "@mui/icons-material/Email";
import { InputAdornment } from "@material-ui/core";
import UserContext from "../../Context/context";
// import { baseURl } from "../../constants";

import { GlobalContext } from "../../Context/context";
import Loader from "../../assets/loader.gif";
// import React from "react";
// import Swal from "sweetalert2";
// import Swal from "sweetalert2";
// import "sweetalert2/src/sweetalert2.scss";

// CommonJS
const LoginPage = () => {
  // const user = useContext(UserContext);

  const navigate = useNavigate();
  let { state, dispatch } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [user_Token, setUserToken] = useState(localStorage.getItem("token"));
  // console.log("user_Token", user_Token);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    iconColor: "white",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
  // useEffect(() => {
  //   // Check if the user is already authenticated
  //   if (user_Token) {

  //     navigate("/");
  //   }
  //   else {

  //     <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: '100vh' }}>
  //     <img width={300} src={Loader} alt="loading" />
  //      </div>
  //   }

  // }, [user_Token, navigate]);

  // Toaster messages function
  // const Toast = Swal.mixin({
  //   toast: true,
  //   position: "top-right",
  //   iconColor: "white",
  //   customClass: {
  //     popup: "colored-toast",
  //   },
  //   showConfirmButton: false,
  //   timer: 4000,
  //   timerProgressBar: true,
  // });

  // const showToast = () => {
  //   Swal.fire({
  //     toast: true,
  //     position: "top-end",
  //     showConfirmButton: false,
  //     timer: 3000,
  //     timerProgressBar: true,
  //     icon: "success",
  //     title: "This is a toast notification",
  //     showClass: {
  //       popup: "swal2-noanimation",
  //       backdrop: "swal2-noanimation",
  //     },
  //     hideClass: {
  //       popup: "",
  //       backdrop: "",
  //     },
  //   });
  // };


   
  //Login Function
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = {};
  
    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Invalid email format";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    } else if (password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters long";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // submit the form
      // console.log('Email:', email);
      // console.log('Password:', password);
    }
    try {
      const login_URL = `${state.baseUrl}api/login`;

      const response = await axios.post(login_URL, { email, password });

      console.log("response", response?.data);
      // let data={data: response?.data}
      //Data save to local storage

      // const user_email = response?.data?.data?.user?.email;
      const user_token = response?.data?.data?.token;
      const user_id = response?.data?.data?.user?.id;

      localStorage.setItem("token", user_token);
      // localStorage.setItem("email", user_email);
      localStorage.setItem("user_ID", user_id);
      if (response.data.status === 200) {
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(user_id);
        }
        // console.log("response", data);
        dispatch({
          type: "USER_LOGIN",
          payload: response.data.user,
          //  token: response?.data?.data?.token,
        });

        console.log("user");
        // console.log("Login Success" );

        Toast.fire({
          icon: "success",
          title: response.data.message,
        });
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.response.data.message,
      });
      dispatch({
        type: "USER_LOGOUT",
        //  token: response?.data?.data?.token,
      });

      // console.log("Error_________________________", error);
    }
  };

  return (
    <>
      <div className="HA_main_div_of_from">
        <img className="HA_main_div_scnd mb-none" src={image} />
        <div className="HA_form_main_div">
          <p className="HA_from_heading_text1">Login</p>

          <form id="loginForm" onSubmit={handleSubmit}>
            <TextField
              className="formfields"
              label="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              className="formfields"
              label="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
          </form>
          <div className="HA_from_link_MAIn">
            <Link className="HA_from_link_text" to="/forget-password">
              Forget Password?
            </Link>
          </div>
          <div className="HA_from_main_div_btn">
            <Button
              className="HA_from_login_btn_div"
              variant="contained"
              color="primary"
              type="submit"
              form="loginForm"
              // onClick={loginFormHandler}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginPage;
