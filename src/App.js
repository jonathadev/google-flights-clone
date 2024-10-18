import React from 'react';
import FlightSearchForm from './FlightSearchForm';
import { Container, Typography } from '@mui/material';

function App() {
  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Google Flights Clone
      </Typography>
      <FlightSearchForm />
    </Container>
  );
}

export default App;