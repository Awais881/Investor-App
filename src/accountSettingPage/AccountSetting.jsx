import React, { useEffect, useState ,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import className from './AccountSetting.css'
import Switch from '@mui/material/Switch';
import image from '../assets/acsetting.svg'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../Context/context';
import  Loader  from '../assets/loader.gif';
import { notification } from 'antd';
const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },

}));

const Form = () => {
  const navigate = useNavigate();

  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);
  const [notification, setNotification] = React.useState("enable");
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [user_Token, setUserToken] = useState(localStorage.getItem("token"));
  // const [userAccountData, setUserAccountData] = useState(null);
  let { state, dispatch } = useContext(GlobalContext);
  // console.log('userAccountData', userAccountData)



  // setName(state.user.name)
  // setEmail (state.user.email)
  useEffect(() => {
    getUserData()
  }, []);

  const headers = {
    headers: {
      Authorization: `Bearer ${user_Token}`,
    },
  };

  const getUserData = async () => {
    axios
      .get(`https://cloud1.sty-server.com/api/user`, headers)
      .then(function (response) {
        // console.log(response?.data?.status);
        if (response?.data?.status == 200) {
        
          dispatch({
             type: 'USER_LOGIN',
            payload: response.data.user
          })
        }
      })
      .catch(function (error) {
        dispatch({
          type: 'USER_LOGOUT',
          
        })
        console.error(error);
      });
  }


  // const headers = {
  //     headers: {
  //       Authorization: `Bearer ${user_Token}`,
  //     },
  //   };
  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const response = await axios.get(`https://cloud1.sty-server.com/api/user`, headers);
  //       if (response?.data?.status === 200) {
  //         dispatch({
  //           type: 'USER_LOGIN',
  //           payload: response.data
  //         });
  //       }
  //     } catch (error) {
  //       dispatch({
  //         type: 'USER_LOGOUT',
  //       });
  //       console.error(error);
  //     }
  //   };

  //   getUserData();
  // }, []);

  // if (!state.user || !state.user.email) {
  //   // Render a loading state or return null until the email data is available
  //   return (
  //     <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: '100vh' }}>
  //       <img width={300} src={Loader} alt="loading" />
  //     </div>
  //   );
  // }

  //Toaster messages function
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = {};

    const data = {
      password: password,
      password_confirmation: confirmPassword,
      notification: notification
    }

    // if (!name) {
    //   validationErrors.name = 'Name is required';
    // }

    // if (!email) {
    //   validationErrors.email = 'Email is required';
    // } else if (!/\S+@\S+\.\S+/.test(email)) {
    //   validationErrors.email = 'Invalid email format';
    // }

    if (!password) {
      validationErrors.password = 'Password is required';
    } else if (password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters long';
    }

    if (!confirmPassword) {
      validationErrors.confirmPassword = 'Confirm password is required';
    } else if (confirmPassword !== password) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // submit the form
      console.log('Password:', password);
      console.log('Confirm password:', confirmPassword);

      axios
        .put(`https://cloud1.sty-server.com/api/change/password`, data, headers)
        .then(function (response) {
          console.log(response);
          if (response?.data?.status == 200) {
            Toast.fire({
              icon: 'success',
              title: `Password updated successfully`
            })
            // navigate("/")
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
    setNotification("disable");
    console.log(checked)
  };

  return (
    <div className='HA_main_div'>
      <div className='HA_img mb-none'>
        <img className='HA_main_image_div' src={image} alt="" />

      </div>

      {/* <div className='HA_card_main'> */}
      <div className='HA_card_main_div'>
        <div className='HA_card_text_heading'>
          <p className='HA_card_headind_text_stn'>Account Details</p>
        </div>

        <div className='inputdiv'>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              className="formfields disableInput"
              label="Name"
              type="text"
              value={state.user[0].name}
              // onChange={(event) => setName(event.target.value)}
              error={!!errors.name}
              helperText={errors.name}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
             readOnly: true,
               }}
            />

            <TextField
              className="formfields disableInput"
              label="Email"
              type="text"
              value={state.user[0].email}
              // onChange={(event) => setEmail(event.target.value)}
              // error={!!errors.email}
              // helperText={errors.email}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                readOnly: true,
                  }}
            />

            <div className='HA_reset_heading_main'>
              <p className='HA_reser_heading_text'>Reset Your Password</p>
            </div>
            <TextField
              className="formfields "
              label="Password"
              type="password"
              value={password}
              onChange={(event) => {
                event.preventDefault();
                setPassword(event.target.value)
              }}
              error={!!errors.password}
              helperText={errors.password}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              className="formfields"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(event) => {
                event.preventDefault();
                setConfirmPassword(event.target.value)
              }}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div className='HA_toggle_btn_main'>
              <p className='HA_toggle_btn_main_text'>Announcement Notification</p>
              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </div>
            <Button
              className='HA_reset_btn_main'
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
      {/* </div> */}
    </div>

  );
};

export default Form;
