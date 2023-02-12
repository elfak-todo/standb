import { Box, Button, Divider, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Gallery from '../gallery/Gallery';
import Apartment from '../../models/Apartment.model';
import Options from '../options/Options';
import { getSingleApartment } from '../../services/apartment.service';

import './ApartmentDetails.css';
import CommentSection from '../commentSection/CommentSection';

function ApartmentDetails() {
  const { apartmentId } = useParams();
  const [apartment, setApartment] = useState<Apartment | null>(null);

  useEffect(() => {
    if (!apartmentId) return;

    getSingleApartment(apartmentId)
      .then(({ data }) => setApartment(data))
      .catch((err) => console.error(err));
  }, [apartmentId]);

  if (!apartment || !setApartment) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
      }}
    >
      <div className="details-main-div">
        <Gallery images={apartment.gallery as string[]} />
        <div className="details-header-div">
          <div className="details-title-div ">
            <Typography variant="h6">{apartment.title}</Typography>
            <Typography variant="subtitle1">{apartment.location}</Typography>
            <Typography variant="subtitle1" color="primary">
              <strong> {`${apartment.price} EUR`}</strong>
            </Typography>
          </div>
          <div>
            <Options
              apartment={apartment}
              setApartment={setApartment as Dispatch<SetStateAction<Apartment>>}
            />
            <Button
              variant="outlined"
              startIcon={<FavoriteBorderIcon />}
              sx={{ ml: 2 }}
            >
              Sačuvaj oglas
            </Button>
          </div>
        </div>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          <strong> Detalji</strong>
        </Typography>
        <Divider sx={{ mb: 1 }} />
        <div className="details-box-div">
          <div className="details-box-part">
            <span>
              <strong>Kvadratura:</strong> {`${apartment.squareFootage} m²`}
            </span>
            <span>
              <strong>Spratnost:</strong> {apartment.storey}
            </span>
            <span>
              <strong>Broj prostorija:</strong> {apartment.roomsCount}
            </span>
            <span>
              <strong>Grejanje:</strong> {apartment.heatingType}
            </span>
          </div>
          <div className="details-box-part">
            <span>
              <strong>Kategorija:</strong> {apartment.category}
            </span>
            <span>
              <strong>Uknjiženo:</strong> {apartment.isRegistered ? 'Da' : 'Ne'}
            </span>
            <span>
              <strong>Parking:</strong> {apartment.hasParking ? 'Da' : 'Ne'}
            </span>
          </div>
        </div>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          <strong> Opis </strong>
        </Typography>
        <Divider sx={{ mb: 1 }} />
        <Box sx={{ width: 750 }}>
          <Typography variant="body1">{apartment.description}</Typography>
        </Box>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          <strong> Lokacija</strong>
        </Typography>
        {/* //TODO fali... */}
        <Divider sx={{ mb: 1 }} />
        <Typography variant="body1">Vojvode Mišića 17, Niš 18000</Typography>
      </div>
      <CommentSection apartment={apartment} setApartment={setApartment} />
    </Box>
  );
}

export default ApartmentDetails;
