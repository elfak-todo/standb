import Feed from '../../components/feed/Feed';
import HomePageHeader from '../../components/header/HomePageHeader';
import Navbar from '../../components/navbar/Navbar';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-main-cont">
      <HomePageHeader />
      <Feed />
    </div>
  );
}

export default HomePage;
