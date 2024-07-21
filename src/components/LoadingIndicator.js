import React from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Box } from '@mui/material';

const LoadingIndicator = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);

  if (!isLoading) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 1000,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingIndicator;
