import React from 'react';
import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: 'url("/bg4.jpg")', // replace with your image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#fff',
        px: 2, // padding for small screens
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 'bold',
          textShadow: '2px 2px 6px rgba(0,0,0,0.6)',
          fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
        }}
      >
        Welcome To Contact Page
      </Typography>
    </Box>
  );
};

export default Home;
