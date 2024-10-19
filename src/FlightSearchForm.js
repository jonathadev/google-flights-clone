import React, { useState } from 'react';
import axios from 'axios';
import { 
  Button, 
  TextField, 
  Container, 
  Grid, 
  Typography, 
  CircularProgress, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper 
} from '@mui/material';

function FlightSearchForm() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState([]);
  const [filteredGroup, setFilteredGroup] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searched, setSearched] = useState(false); // Novo estado para rastrear se a busca foi feita

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true); // Define que a busca foi tentada

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

      if (
        response.data &&
        response.data.status === true &&
        response.data.data &&
        response.data.data.flights &&
        response.data.data.flights.days
      ) {
        setFlights(response.data.data.flights.days || []);
      } else {
        console.error('Dados de voo não disponíveis.');
        setFlights([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar voos:', error);
      setLoading(false);
    }
  };

  const handleFilterChange = (event) => {
    setFilteredGroup(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  // Filtra os voos com base no grupo selecionado
  const filteredFlights = (flights || []).filter(flight => 
    filteredGroup === 'all' || flight.group === filteredGroup
  );

  // Ordena os voos com base no preço
  const sortedFlights = filteredFlights.sort((a, b) => {
    return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
  });

  const saveSearch = () => {
    const searchData = { origin, destination, fromDate };
    const savedSearches = JSON.parse(localStorage.getItem('savedSearches')) || [];
    savedSearches.push(searchData);
    localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
    alert('Busca salva!');
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

      <FormControl fullWidth style={{ marginTop: '20px' }}>
        <InputLabel>Filtrar por Grupo</InputLabel>
        <Select
          value={filteredGroup}
          onChange={handleFilterChange}
          label="Filtrar por Grupo"
        >
          <MenuItem value="all">Todos</MenuItem>
          <MenuItem value="low">Baixo</MenuItem>
          <MenuItem value="medium">Médio</MenuItem>
          <MenuItem value="high">Alto</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth style={{ marginTop: '20px' }}>
        <InputLabel>Ordenar por Preço</InputLabel>
        <Select
          value={sortOrder}
          onChange={handleSortChange}
          label="Ordenar por Preço"
        >
          <MenuItem value="asc">Crescente</MenuItem>
          <MenuItem value="desc">Decrescente</MenuItem>
        </Select>
      </FormControl>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {searched && sortedFlights.length > 0 ? ( // Verifica se a busca foi feita e há voos
            <>
              <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Data</TableCell>
                      <TableCell>Preço (USD)</TableCell>
                      <TableCell>Grupo</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedFlights.map((flight, index) => (
                      <TableRow key={index}>
                        <TableCell>{flight.day}</TableCell>
                        <TableCell>{flight.price}</TableCell>
                        <TableCell>{flight.group}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button variant="outlined" onClick={saveSearch} fullWidth style={{ marginTop: '20px' }}>
                Salvar Busca
              </Button>
            </>
          ) : (
            searched && ( // Mostra a mensagem apenas se a busca foi feita
              <Typography variant="body1" style={{ marginTop: '20px' }}>
                Nenhum voo encontrado.
              </Typography>
            )
          )}
        </>
      )}
    </Container>
  );
}

export default FlightSearchForm;
