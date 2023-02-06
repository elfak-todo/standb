import { Route, Routes } from 'react-router-dom';
import ApartmentDetailsPage from './pages/details/ApartmentDetailsPage';
import HomePage from './pages/home/HomePage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/details" element={<ApartmentDetailsPage />} />
    </Routes>
  );
}

export default AppRoutes;
