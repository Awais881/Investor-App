import React, { useState , useContext,useEffect} from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { InputAdornment } from "@material-ui/core";
import image from "../../assets/loginpage.png";
import EmailIcon from "@mui/icons-material/Email";
import { baseURl } from "../../constants";
import UserContext from "../../Context/UserContext";



const LoginPage = () => {
  const user = useContext(UserContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [user_Token, setUserToken] = useState(localStorage.getItem("token"));
  console.log("user_Token", user_Token);

  //Toaster messages function
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
  } else if (password.length < 6) {
    validationErrors.password = "Password must be at least 6 characters long";
  }

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
  } else {
    try {
      const login_URL = `${baseURl}api/login`;
      const response = await axios.post(login_URL, { email, password });

      if (response?.data?.status === 200) {
        const user_email = response?.data?.data?.user?.email;
        const user_token = response?.data?.data?.token;
        const user_id = response?.data?.data?.user?.id;

        localStorage.setItem("token", user_token);
        localStorage.setItem("email", user_email);
        localStorage.setItem("user_ID", user_id);
        setUserToken(user_token)
        navigate("/");
        setEmail("");
        setPassword("");

        user.setUserState({
          token: response?.data?.data?.token,
          id: response?.data?.data?.user?.id,
          role_id: response?.data?.data?.user?.role_id,
          name: response?.data?.data?.user?.name,
          email: response?.data?.data?.user?.email,
        });
      } else {
        // Handle invalid login credentials or display relevant error message
        alert("Invalid Login Credentials");
      }
    } catch (error) {
      // Handle error from API request
      console.log("Error:", error);
      // Display relevant error message to the user
      alert("An error occurred while logging in");
    }
  }
};
useEffect(() => {
  // Check if the user is already authenticated
  if (user_Token) {
    navigate("/");
  }
}, [user_Token, navigate]);
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
        </form>
      </div>
    </div>
  </>
)};
export default LoginPage;