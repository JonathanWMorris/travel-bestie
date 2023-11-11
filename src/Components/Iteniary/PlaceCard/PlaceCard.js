
import * as React from 'react';
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
import "./PlaceCard.css";
import { yelpDetailedObject } from '../../../backend/yelp.js';
//import dataJson from '../../../backend/buisness_search.json';
import { useNavigate } from "react-router-dom";

export default function PlaceCard({ dataJson, description }) {
    const navigate = useNavigate();

    if (dataJson === undefined) {
        return (
            <div>
                Empty Json Object
            </div>
        );
    }
    const businessId = dataJson.businesses[0].id;
    const placeName = dataJson.businesses[0].name;
    const numDollarSigns = "$$$";
    const imgURL = dataJson.businesses[0].image_url;
    let address1 = dataJson.businesses[0].location.address1;
    if (address1 === null || address1.length === 0) {
        address1 = "Not Available";
    }

    let address2 = dataJson.businesses[0].location.address2;
    if (address2 === null || address2.length === 0) {
        address2 = "";
    }

    let address3 = dataJson.businesses[0].location.address3;
    if (address3 === null || address3.length === 0) {
        address2 = "";
    }

    const ratingPlace = dataJson.businesses[0].rating;

    const dollar_signs = [];
    for (let i = 0; i < numDollarSigns; i++) {
        dollar_signs.push("$");
    }

    async function redirectDescription(businessId) {
        console.log("Clicked" + businessId);
        const businessDetails = await yelpDetailedObject(businessId);
        console.log(businessDetails);
        navigate('/details', { state: { businessDetails } });
    }

    return (

        <Container maxWidth="m"
            onClick={() => redirectDescription(businessId)}
            sx={{ paddingTop: 2 }}
        >
            <Box sx={{
                height: '18vh',
                width: '85vw',
                borderRadius: 7,
                bgcolor: '#ffffff',
                boxShadow: '0 0 12px rgba(0,0,0,0.1)',
                '&:hover': {
                    bgcolor: '#D3D3D3',
                }, display: 'flex'
            }} >
                <img
                    className='thumbnail'
                    src={imgURL}
                    alt='place'
                    loading="lazy"
                    display="flex"
                />
                <Stack spacing={0} sx={{ display: 'flex', padding: '10px' }} >
                    <Typography >{placeName}</Typography>
                    <Stack direction="row" spacing={0} marginTop={'0'} >
                        <PlaceOutlinedIcon sx={{ fontSize: 18 }} />
                        <Typography sx={{ fontWeight: '450', fontSize: '14px' }} className="addy">{address1}{address2}{address3}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={0} alignItems="center" text-align="left">
                        <Typography variant="h4" sx={{ fontWeight: '250', fontSize: '14px' }}>{ratingPlace}</Typography>
                        <Rating name="half-rating" defaultValue={2.5} precision={0.5} sx={{ fontSize: 18 }} />
                        <p className="addy">·</p>
                        <Stack className="addy" direction="row" alignItems="center">
                            {dollar_signs}
                        </Stack>
                        <Typography variant="h4" sx={{ fontWeight: '250', fontSize: '14px' }}></Typography>
                    </Stack>
                    <Typography className="description" spacing={0} sx={{ fontWeight: '250', fontSize: '14px' }}>{description}</Typography>
                </Stack>
            </Box>
        </Container>
    );
}