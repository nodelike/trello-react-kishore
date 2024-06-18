import React from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import { styled } from '@mui/system';

const bounce = keyframes`
  0% {
    transform: translate(0px, 0px);
  }
  40% {
    transform: translate(0px, -80px);
  }
  100% {
    transform: translate(0px, 0px);
  }
`;

const LoaderContainer = styled(Box)({
  position: 'absolute',
  bottom: '45px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  zIndex: 1300
});

const LoaderDot = styled(Box)(({ delay }) => ({
  width: '20px',
  height: '20px',
  backgroundColor: '#DCFE0B',
  borderRadius: '50%',
  animation: `${bounce} 1s infinite`,
  border: '2px solid black',
  animationDelay: delay,
}));

function Loader() {
  return (
    <LoaderContainer>
      <Box sx={{ display: 'flex', gap: '40px' }}>
        <LoaderDot delay="0s" />
        <LoaderDot delay="0.1s" className="delay-100" />
        <LoaderDot delay="0.2s" className="delay-200" />
        <LoaderDot delay="0.3s" className="delay-300" />
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: '8px', color: 'white' }}>
        Loading
      </Typography>
    </LoaderContainer>
  );
}

export default Loader;
