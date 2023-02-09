import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { Location } from '../../enums/Location.enum';
import { SearchParams } from '../../interfaces/SearchParams.interface';

interface SelectLocationProps {
  searchParams: SearchParams;
  setSearchParams: Dispatch<SetStateAction<SearchParams>>;
}

function SelectLocation({
  searchParams,
  setSearchParams,
}: SelectLocationProps) {
  const locations = Object.values(Location);

  const onChangeHandler = (e: SelectChangeEvent<Location>) => {
    setSearchParams((state) => {
      return { ...state, loc: e.target.value as Location };
    });
  };

  return (
    <Box sx={{ width: 150 }}>
      <FormControl fullWidth>
        <InputLabel size="small">Lokacija</InputLabel>
        <Select
          size="small"
          label="Lokacija"
          value={searchParams.loc ?? ''}
          onChange={onChangeHandler}
        >
          {locations.map((loc, i) => (
            <MenuItem key={i} value={loc}>
              {loc}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectLocation;
