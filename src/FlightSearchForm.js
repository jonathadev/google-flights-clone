import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Grid, Typography, CircularProgress } from '@mui/material';

function FlightSearchForm() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const options = {
      method: 'GET',
      url: 'https://aviationstack.p.rapidapi.com/api/v1/flights/getPriceCalendar',
      params: {
        originSkyId: origin,
        destinationSkyId: destination,
        fromDate: fromDate,
        currency: 'USD',
      },
      headers: {
        'X-RapidAPI-Key': 'eec0e03bb2msh1191f69fb9ae0e9p1eabd8jsn5acebe40f6c3',
        'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      console.log('Resposta da API:', response.data);

      // Acessando as informações de voos
      const flightData = response.data.data.flights;
      if (flightData && flightData.days) {
        console.log('Dados de dias:', flightData.days); // Log para inspecionar a estrutura
        setFlights(flightData.days);
      } else {
        setFlights([]); // Nenhum voo encontrado
      }
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar voos:', error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Origem (IATA)"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Destino (IATA)"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Data de Partida"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Buscar Voos
            </Button>
          </Grid>
        </Grid>
      </form>

      {loading ? (
        <CircularProgress />
      ) : (
        flights.length > 0 && (
          <div>
            <Typography variant="h6" gutterBottom>
              Resultados da busca:
            </Typography>
            <ul>
              {flights.map((flight, index) => (
                <li key={index}>
                  Data: {flight.day} - Preço: {flight.price} USD - Grupo: {flight.group}
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </Container>
  );
}

export default FlightSearchForm;
