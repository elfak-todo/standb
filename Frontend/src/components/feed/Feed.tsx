import { Typography } from '@mui/material';
import Apartment from '../../models/Apartment.model';
import ApartmentTile from '../apartmentTile/ApartmentTile';
import './Feed.css';

interface FeedProps {
  feed: Apartment[];
}

function Feed({ feed }: FeedProps) {
  return (
    <div className="grid-div">
      {feed.length ? (
        feed.map((el) => <ApartmentTile key={el.id} apartment={el} />)
      ) : (
        <Typography variant="body1">Ništa za prikaz.</Typography>
      )}
    </div>
  );
}

export default Feed;
