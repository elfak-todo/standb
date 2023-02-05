import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import apImg from '../../assets/ap1.jpg';

import './ApartmentTile.css';

function ApartmentTile() {
  const navigate = useNavigate();

  return (
    <Card sx={{ width: 250, height: 350, margin: 2 }} className="tile-card">
      <Box className="badge-div" sx={{ backgroundColor: 'primary.dark' }}>
        <strong> 55 m² </strong>
      </Box>
      <CardMedia
        sx={{ height: 150, cursor: 'pointer' }}
        image={apImg}
        onClick={() => navigate('/details')}
      />
      <CardContent>
        <Typography>Dvoiposoban stan</Typography>
        <Typography variant="body2">Čair, Niš</Typography>
        <Typography color="primary">
          <strong> 64 500 EUR</strong>
        </Typography>
        <div className="desc-text-wrap">
          <Typography variant="body2" color="text.secondary">
            Prodaje se dvoiposoban stan u novogradnji sa PDV-om kod Čaira. Stan
            je površine 60 m² nalazi se na II spratu stambene zgrade sa liftom.
            Struktura stana: ulazni hodnik, dnevni boravak sa kuhinjom i
            trepazarijom, dve spavaće sobe, kupatilo, toalet i terasa.
          </Typography>
        </div>
        <Typography variant="caption" color="text.secondary">
          28.2.2023
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ApartmentTile;
