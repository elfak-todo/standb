import ApartmentDetails from '../../components/apartmentDetails/ApartmentDetails';
import Navbar from '../../components/navbar/Navbar';

import './ApartmentDetailsPage.css';

function ApartmentDetailsPage() {
  return (
    <>
      <Navbar />
      <div className="apartment-details-main-div">
        <ApartmentDetails />
      </div>
    </>
  );
}

export default ApartmentDetailsPage;
