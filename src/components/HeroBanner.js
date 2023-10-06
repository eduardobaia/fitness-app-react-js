import  {Box, Stack, Typography, Button} from '@mui/material';
import HeroBannerImage from '../assets/images/banner2.jpg'
import React, { useEffect, useState } from 'react';

const HeroBanner = () => {

 

  return (
    <Box sx={{
        mt: {lg: '212px', xs: '70px'},
        ml: {sm: '50px'}
    }} position="relative" p="40px">
        <Typography
         color='#225588'
         fontWeight="600" fontSize="26px"
        >
            Fintess Club
        </Typography>
        <Typography fontWeight="700"
        sx={{ fontSize: { lg: '44px', xs: '40px'},color: '#225588', borderWidth:'2'
        }}
        mb='23px' mt='30px'
        >
            Sweat, Smile <br /> and Repeat
        </Typography>
        <Typography fontSize="22px" lineHeight="35px" mb={4} color={'#225588'} >
            Check out the most effective exercises
        </Typography>
        <Button variant='contained' href="#exercises"
         sx={{ backgroundColor: '#ff2625', padding:'10px'}}>
            Explore Exercises
        </Button>
        <Typography fontWeight={600}
        color="#00000"
        sx={{
            opacity: 0.1, 
            display: { lg: 'block', xs: 'none' }
        }}
        fontSize='300px'
        >
            Exercises
        </Typography>
  

<img src={HeroBannerImage} 
        alt='banner'
          className='hero-banner-img'
        
        />
    </Box>
  )
}

export default HeroBanner