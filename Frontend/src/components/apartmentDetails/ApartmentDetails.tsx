import { Box, Button, Divider, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import Gallery from '../gallery/Gallery';
import './ApartmentDetails.css';

function ApartmentDetails() {
  return (
    <div className="details-main-div">
      <Gallery />
      <div className="details-header-div">
        <div className="details-title-div ">
          <Typography variant="h6">Dvoiposoban stan</Typography>
          <Typography variant="subtitle1">Čair, Niš</Typography>
          <Typography variant="subtitle1" color="primary">
            <strong> 64 500 EUR</strong>
          </Typography>
        </div>
        <>
          <Button variant="outlined" startIcon={<FavoriteBorderIcon />}>
            Sačuvaj oglas
          </Button>
        </>
      </div>
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        <strong> Detalji</strong>
      </Typography>
      <Divider sx={{ mb: 1 }} />
      <div className="details-box-div">
        <div className="details-box-part">
          <span>
            <strong>Kvadratura:</strong> 55 m²
          </span>
          <span>
            <strong>Spratnost:</strong> 1
          </span>
          <span>
            <strong>Broj prostorija:</strong> 5
          </span>
          <span>
            <strong>Grejanje:</strong> Da
          </span>
        </div>
        <div className="details-box-part">
          <span>
            <strong>Kategorija:</strong> Dvosoban stan
          </span>
          <span>
            <strong>Uknjiženo:</strong> Da
          </span>
          <span>
            <strong>Parking:</strong> Da
          </span>
        </div>
      </div>
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        <strong> Opis </strong>
      </Typography>
      <Divider sx={{ mb: 1 }} />
      <Box sx={{ width: 750 }}>
        <Typography variant="body1">
          Prodaje se dvoiposoban stan u novogradnji sa PDV-om kod Čaira. Stan je
          površine 60 m² nalazi se na II spratu stambene zgrade sa liftom.
          Struktura stana: ulazni hodnik, dnevni boravak sa kuhinjom i
          trepazarijom, dve spavaće sobe, kupatilo, toalet i terasa.
        </Typography>
      </Box>
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        <strong> Lokacija</strong>
      </Typography>
      <Divider sx={{ mb: 1 }} />
      <Typography variant="body1">Vojvode Mišića 17, Niš 18000</Typography>
    </div>
  );
}

export default ApartmentDetails;
