import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

import { baseURL } from '../../config';
import Apartment from '../../models/Apartment.model';
import './ApartmentTile.css';

interface ApartmentTileProps {
  apartment: Apartment;
}

function ApartmentTile({ apartment }: ApartmentTileProps) {
  const navigate = useNavigate();

  return (
    <Card sx={{ width: 250, height: 350, margin: 2 }} className="tile-card">
      <Box className="badge-div" sx={{ backgroundColor: 'primary.dark' }}>
        <strong> {`${apartment.squareFootage} m²`} </strong>
      </Box>
      <CardMedia
        sx={{ height: 150, cursor: 'pointer' }}
        image={`${baseURL}${apartment.gallery[0]}`}
        onClick={() => navigate(`/details/${apartment.id}`)}
      />
      <CardContent>
        <Typography>{apartment.category}</Typography>
        <Typography variant="body2">{apartment.location}</Typography>
        <Typography color="primary">
          <strong>{`${apartment.price} EUR`}</strong>
        </Typography>
        <div className="desc-text-wrap">
          <Typography variant="body2" color="text.secondary">
            {apartment.description}
          </Typography>
        </div>
        {/* //TODO - fali date i adresa zaboravio sam... */}
        <Typography variant="caption" color="text.secondary">
          28.2.2023
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ApartmentTile;
