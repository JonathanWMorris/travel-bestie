import { React, useState } from 'react';
import { Box } from '@mui/system';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import Carousel from 'react-bootstrap/Carousel';

import Rating from '@mui/material/Rating';
import DirectionsIcon from '@mui/icons-material/Directions';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './Details.css';

import "../../backend/yelp.js";
import { useLocation } from 'react-router-dom';

export default function Deatails() {
  const location = useLocation();
  const { state } = location;
  const { businessDetails } = state;

  console.log(businessDetails);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  let isOpen = "";
  if (businessDetails.hours.is_open_now) {
    isOpen = "Open";
  } else {
    isOpen = "Closed";
  }

  const businessName = businessDetails.name;
  const rating = businessDetails.rating;
  const review_count = businessDetails.review_count;
  const category_type = businessDetails.categories[0].title;

  const quote = "Get a quote soon!";

  var address = "";
  for (let i = 0; i < businessDetails.location.display_address.length; i++) {
    address += businessDetails.location.display_address[i] + " ";
  }

  const distance = "2.1 mi";
  const timings = "11:00 AM - 10:00 PM";
  const phone_number = businessDetails.display_phone;
  const menu_url = businessDetails.yelp_menu_url;

  const price = businessDetails.price;

  var dollar_sign_count = 0;
  if (price === "$") {
    dollar_sign_count = 1;
  } else if (price === "$$") {
    dollar_sign_count = 2;
  } else if (price === "$$$") {
    dollar_sign_count = 3;
  } else if (price === "$$$$") {
    dollar_sign_count = 4;
  } else {
    dollar_sign_count = 0;
  }

  const dollar_signs = [];
  for (let i = 0; i < dollar_sign_count; i++) {
    dollar_signs.push(<AttachMoneyIcon />);
  }

  return (
    <Box>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="top_img"
            src={businessDetails.photos[0]}
            alt={"yes"}
            loading="lazy"
            display="flex"
          />
        </Carousel.Item>
        <img
          className="top_img"
          src={businessDetails.photos[1]}
          alt={"yes"}
          loading="lazy"
          display="flex"
        />
        <Carousel.Item>
          <img
            className="top_img"
            src={businessDetails.photos[2]}
            alt={"yes"}
            loading="lazy"
            display="flex"
          />
        </Carousel.Item>
      </Carousel>

      <Box sx={{
        height: '85vh',
        width: '100vw',
        bgcolor: '#ffffff',
        boxShadow: '0 -100 40px rgba(0,0,0,0.25)',
      }} >
        <Box sx={{ padding: '15px', paddingLeft: '25px' }}>
          <Typography variant="h3" sx={{ fontWeight: '400', fontSize: '2.2rem' }}>{businessName}</Typography>
          <Stack direction="row" spacing={1} alignItems="center" justifyItems="center">
            <Typography variant="h4" sx={{ fontWeight: '250', fontSize: '1.1rem' }}>{rating}</Typography>
            <Stack direction="row" spacing={0.5} alignItems="center" justifyItems="center">
              <Rating name="read-only" value={rating} precision={0.5} sx={{ fontSize: 25, paddingTop: 0.9 }} />
              <Typography variant="h4" sx={{ fontWeight: '250', fontSize: '1.1rem' }}>({review_count})</Typography>
            </Stack>
            <Stack justifyItems="center" direction="row" spacing={0} alignItems="center">
              {dollar_signs}
            </Stack>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center" justifyItems="center">
            <Typography variant="h4" sx={{ fontWeight: '250', fontSize: '1.1rem' }}>{category_type}</Typography>
            <Typography variant="h4" sx={{ fontWeight: '600', fontSize: '1rem' }}>·</Typography>
            <Typography variant="h4" sx={{ fontWeight: '250', fontSize: '1.1rem', color: "green" }}>{isOpen}</Typography>
          </Stack>
          <Typography variant="h7" sx={{ fontWeight: '100', fontSize: '1.1rem', fontStyle: "italic" }}>"{quote}"</Typography>
        </Box>
        <Box>
          <Divider sx={{ borderColor: "black" }} />
          <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={3} sx={{ paddingTop: 1.5, paddingLeft: '25px' }}>
            <DirectionsIcon sx={{ fontSize: "3rem" }} />
            <Box>
              <Typography variant="h4" sx={{ fontWeight: '250', fontSize: '1.2rem' }}>{address}</Typography>
              <Typography variant="h4" sx={{ fontWeight: '250', fontSize: '1rem' }}>{distance}</Typography>
            </Box>
          </Stack>
          <Divider sx={{ borderColor: "black", paddingY: 1 }} />
          <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={3} sx={{ paddingTop: 1, paddingLeft: '25px' }}>
            <AccessTimeIcon sx={{ fontSize: "3rem" }} />
            <Typography variant="h4" sx={{ fontWeight: '250', fontSize: '1.2rem' }}>{timings}</Typography>
          </Stack>
          <Divider sx={{ borderColor: "black", paddingY: 1 }} />
          <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={3} sx={{ paddingTop: 1, paddingLeft: '25px' }}>
            <LocalPhoneIcon sx={{ fontSize: "3rem" }} />
            <Box>
              <Typography variant="h4" sx={{ fontWeight: '250', fontSize: '1.2rem' }}>{phone_number}</Typography>
            </Box>
          </Stack>
          <Divider sx={{ borderColor: "black", paddingY: 1 }} />
          <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={3} sx={{ paddingTop: 1, paddingLeft: '25px' }}>
            <RestaurantMenuIcon sx={{ fontSize: "3rem" }} />
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0.5} sx={{ paddingTop: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: '300', fontSize: '1.2rem' }}> Menu </Typography>
              <Typography variant="h4" sx={{ fontWeight: '600', fontSize: '1rem' }}>·</Typography>
              <Typography variant="h4" sx={{ fontWeight: '50', fontSize: '1.2rem' }}>{menu_url}</Typography>
            </Stack>
          </Stack>
          <Divider sx={{ borderColor: "black", paddingY: 1 }} />
        </Box>
      </Box>
    </Box >
  );
}
