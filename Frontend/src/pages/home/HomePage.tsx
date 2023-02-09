import { useEffect, useState } from 'react';
import Feed from '../../components/feed/Feed';
import HomePageHeader from '../../components/header/HomePageHeader';
import Navbar from '../../components/navbar/Navbar';
import Apartment from '../../models/Apartment.model';
import './HomePage.css';

function HomePage() {
  const [feed, setFeed] = useState<Apartment[]>([]);

  return (
    <>
      <Navbar setFeed={setFeed} />
      <div className="home-main-cont">
        <HomePageHeader setFeed={setFeed} />
        <Feed feed={feed} />
      </div>
    </>
  );
}

export default HomePage;
