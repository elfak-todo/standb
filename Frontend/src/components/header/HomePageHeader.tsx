import { Box, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SearchParams } from '../../interfaces/SearchParams.interface';
import Apartment from '../../models/Apartment.model';
import { getApartments } from '../../services/apartment.service';

import Filter from '../filter/Filter';
import Search from '../search/Search';
import './HomePageHeader.css';

interface Props {
  setFeed: Dispatch<SetStateAction<Apartment[]>>;
}

function HomePageHeader({ setFeed }: Props) {
  const [searchParams, setSearchParams] = useState<SearchParams>({});

  useEffect(() => {
    getApartments(searchParams)
      .then(({ data }) => setFeed(data))
      .catch((err) => console.error(err));
  }, [searchParams]);

  return (
    <div className="header-main-div">
      <Box className="header-title-div" sx={{ color: 'primary.dark' }}>
        STAN DB
      </Box>
      <Typography variant="h6">Oglasi za prodaju nekretnina</Typography>
      <Search setSearchParams={setSearchParams} />
      <Filter searchParams={searchParams} setSearchParams={setSearchParams} />
    </div>
  );
}

export default HomePageHeader;
