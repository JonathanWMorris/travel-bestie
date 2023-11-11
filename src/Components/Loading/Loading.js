import React, { useEffect } from "react";
import './Loading.css';
import { useLocation } from 'react-router-dom';
import { getAIListPlaces } from "../../backend/openai";
import { yelpObjects } from "../../backend/yelp";
import { useNavigate } from "react-router-dom";
//import results from '../../backend/multiple_business_search.json';

export default function Loading() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { cityName, hours } = state;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseJson = await getAIListPlaces(cityName, hours);
        const results = await yelpObjects(cityName, responseJson);
        
        const descriptionArray =  responseJson;
        console.log(results);
        navigate('/iteniary', { state: { results, descriptionArray}});
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchData();
  });

  return (
    <div className="loading">
      LOADING
      <div className="d-flex align-items-center justify-content-center">
        <div className="spinner-grow " id="one" role="status"></div>
        <div className="spinner-grow" id="two" role="status"></div>
        <div className="spinner-grow" id="three" role="status"></div>
        <div className="spinner-grow" id="four" role="status"></div>
        <div className="spinner-grow" id="five" role="status"></div>
      </div>
    </div>
  );
}
