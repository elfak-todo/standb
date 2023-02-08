import { useEffect, useState } from 'react';
import Feed from '../../components/feed/Feed';
import HomePageHeader from '../../components/header/HomePageHeader';
import Navbar from '../../components/navbar/Navbar';
import Apartment from '../../models/Apartment.model';
import { getApartments } from '../../services/apartment.service';
import './HomePage.css';

function HomePage() {
  const [feed, setFeed] = useState<Apartment[]>([]);

  useEffect(() => {
    getApartments()
      .then(({ data }) => setFeed(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar setFeed={setFeed} />
      <div className="home-main-cont">
        <HomePageHeader />
        <Feed feed={feed} />
      </div>
    </>
  );
}

export default HomePage;
