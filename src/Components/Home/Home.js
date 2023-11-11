import React, { useState } from "react";
import './Home.css';
import background from "../../assets/homebackground.png";
import { useNavigate } from "react-router-dom";
import { Box, Container } from '@mui/system';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Rating from '@mui/material/Rating';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


export default function Home() {
  const [cityName, setCityName] = useState("");
  const [hours, setHours] = useState(5);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  function handleCityChange(e) {
    setCityName(e.target.value);
  }

  function handleHoursChange(e) {
    setHours(e.target.value);
  }

  function checkEmpty() {
    if (cityName === "") {
      setErrorMsg("Please enter in the city name");
      return true;
    }
    if (hours === "") {
      setErrorMsg("Please enter in the number of hours");
      return true;
    }
    return false;
  }


  function redirectOptions() {

    const empty = checkEmpty();
    if (empty) {
      return;
    }

    navigate('../loading', { state: { cityName, hours } });
  }

  return (
    <Box>
      <div className="home" style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
      }}>

        <Box className="content">
          <div className="location">
            <div className="subject1"> What can I do at </div>
            <input
              className="enterCityName"
              placeholder="City Name"
              onChange={handleCityChange} />
          </div>
          <div className="time">
            <div className="subject1"> in </div>
            <input
              className="enterHours"
              value={hours}
              onChange={handleHoursChange} />
            <div className="subject1">Hours</div>
          </div>

          <button className="button1" onClick={redirectOptions}>
            Begin journey &raquo;
          </button>

          <div className="error">
            {errorMsg}
          </div>

        </Box>
      </div>
    </Box>
  );
}
