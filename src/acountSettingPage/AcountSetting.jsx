import React from 'react'
import className from './AcountSetting.css'
import Switch from '@mui/material/Switch';
import image from '../assets/undraw_Development_re_g5hq.png'
const AcountSetting = () => {
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        console.log(checked)
    };
    return (
        <div className='HA_main_div'>
            {/* <div className='HA_main_header'>
                <p className='HA_Navbar_text'>Account Setting</p>
            </div> */}
            <img className='HA_main_image_div' src={image} alt="" />

            {/* <div className='HA_card_main'> */}
                <div className='HA_card_main_div'>
                    <div className='HA_card_text_heading'>
                        <p className='HA_card_headind_text_stn'>Acount Detail</p>
                    </div>
                    <div className='HA_card_info_div'>
                        <div className='HA_card_info_inner_text'>
                            <p className='HA_card_info_name'>Name</p>
                            <p>Huzaifa Ahmed</p>
                        </div>
                        <div className='HA_card_info_inner_text'>
                            <p className='HA_card_info_name'>Email</p>
                            <p>huziafaahmed829@gmail.com</p>
                        </div>
                    </div>
                    <div className='HA_reset_main_div'>
                        <div className='HA_reset_heading_main'>
                            <p className='HA_reser_heading_text'>Reset Your Password</p>
                        </div>
                        <div className='HA_reset_from_main'>
                            <div className='HA_reset_from_part1'>
                                <p className='HA_reset_from_old_ps_heading'>Old Password</p>
                                <input className='HA_reset_old_ps_input' type="password" />
                            </div>
                            <div className='HA_reset_from_part1'>
                                <p className='HA_reset_from_old_ps_heading'>New Password</p>
                                <input className='HA_reset_old_ps_input' type="password" />
                            </div>
                            <div className='HA_toggle_btn_main'>
                                <p className='HA_toggle_btn_main_text'>Announcement Notification</p>
                                <Switch
                                    checked={checked}
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </div>
                        </div>
                        <div className='HA_reset_btn_main_div'>
                            <button className='HA_reset_btn_main'>Set New Password</button>
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </div>
    )
}

export default AcountSetting