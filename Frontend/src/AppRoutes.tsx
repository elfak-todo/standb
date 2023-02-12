import { Route, Routes } from 'react-router-dom';
import ApartmentDetailsPage from './pages/details/ApartmentDetailsPage';
import FavouritesPage from './pages/favourites/FavouritesPage';
import HomePage from './pages/home/HomePage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/details/:apartmentId" element={<ApartmentDetailsPage />} />
      <Route path="/sacuvaniOglasi" element={<FavouritesPage />} />
    </Routes>
  );
}

export default AppRoutes;
