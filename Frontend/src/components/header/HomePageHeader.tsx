import { Box, Typography } from '@mui/material';

import Filter from '../filter/Filter';
import Search from '../search/Search';
import './HomePageHeader.css';

function HomePageHeader() {
  return (
    <div className="header-main-div">
      <Box className="header-title-div" sx={{ color: 'primary.dark' }}>
        STAN DB
      </Box>
      <Typography variant="h6">Oglasi za prodaju nekretnina</Typography>
      <Search />
      <Filter />
    </div>
  );
}

export default HomePageHeader;
