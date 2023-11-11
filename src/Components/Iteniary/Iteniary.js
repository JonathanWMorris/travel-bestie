import React from "react";
import './Iteniary.css';
import { Box, Container } from '@mui/system';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import backarrow from "../../assets/backarrow.svg";
import { useNavigate } from "react-router-dom";
import PlaceCard from "./PlaceCard/PlaceCard";

export default function Iteniary() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { results, descriptionArray} = state;

  function redirectBack() {
    navigate('/');
  }
  
  if (results === undefined) {
    return (
      <div>
      </div>
    );
  }
  var placeCards = [];
  for (let i = 0; i < results.length; i++) {
    placeCards.push(<PlaceCard key={results[i].businesses[0].id} 
      dataJson={results[i]}
      description={descriptionArray[i].description} />);
  }

  return (
    <Box>
      <Typography variant="h4" className="title" sx={{paddingTop:results.length*9, paddingLeft:2}}>Iteniary</Typography>
      {placeCards}
    </Box>
  );
}
