import React, { useState, useContext } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import className from './Login.css'
import { Link } from 'react-router-dom'
import UserContext from '../../Context/context'
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import image from '../../assets/loginpage.png'
import { InputAdornment } from '@material-ui/core';
import axios from 'axios';
import Swal from 'sweetalert2';
import Spinner from 'react-spinner-material';
import { useNavigate } from "react-router-dom";

const ForgotPsword = () => {
  const hellow = useContext(UserContext)
  
  const navigate = useNavigate();




  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false)

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = {};

    if (!email) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = 'Invalid email format';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // submit the form
      try {
        setLoader(true)
        const login_URL = "https://cloud1.sty-server.com/api/password/email";

        const response = await axios.post(login_URL, { email });
        console.log('response=====================', response?.data);

        if (response?.data?.status != 200) {
          await Toast.fire({
            icon: 'error',
            title: `${response.data.message}`
          })
        
          setEmail("");
          setLoader(false);
        } else {
          await Toast.fire({
            icon: 'success',
            title: `${response.data.message}`
          })
          navigate("/");
          setEmail("");
          setLoader(false);
        }

      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <>
      <div className='HA_main_div_of_from'>
        <img className='HA_main_div_scnd mb-none' src={image} />
        <div className='HA_form_main_div'>
          <p className='HA_from_heading_text1'>Reset Password</p>

          <form id="resetForm" onSubmit={handleSubmit}>
            <TextField
              className="formfields"
              label="Email"
              placeholder='User Email'
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
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
          </form>

          <div className='HA_from_link_MAIn'>
            <Link className='HA_from_link_text' to="/login">Login</Link>
          </div>
          <div className='HA_from_main_div_btn'>
            <Button
              className='HA_from_login_btn_div'
              variant="contained"
              color="primary"
              type="submit"
              form="resetForm"
            >
              {loader ?  <Spinner size={15} spinnerColor={"#333333"} spinnerWidth={2} visible={loader} /> : "Submit"}
            </Button>
          </div>
        </div>

      </div>

    </>
  )
}

export default ForgotPsword