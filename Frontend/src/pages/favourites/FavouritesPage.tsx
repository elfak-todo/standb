import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ApartmentTile from '../../components/apartmentTile/ApartmentTile';
import Navbar from '../../components/navbar/Navbar';
import Apartment from '../../models/Apartment.model';
import { getFavouriteApartments } from '../../services/apartment.service';
import './FavouritesPage.css';

function FavouritesPage() {
  const [apartments, setApartments] = useState<Apartment[]>([]);

  useEffect(() => {
    getFavouriteApartments()
      .then(({ data }) => setApartments(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="favourites-main-cont">
        <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
          Oglasi koje ste sačuvali
        </Typography>
        <div className="favourites-grid-div">
          {apartments.length ? (
            apartments.map((el) => <ApartmentTile key={el.id} apartment={el} />)
          ) : (
            <span>Trenutno nemate sačuvanih oglasa.</span>
          )}
        </div>
      </div>
    </>
  );
}

export default FavouritesPage;
