import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { Location } from '../../enums/Location.enum';

interface SelectLocationProps {
  defaultSelected?: string;
  setLocation: Dispatch<SetStateAction<string>>;
}

function SelectLocation({
  defaultSelected = '',
  setLocation,
}: SelectLocationProps) {
  const locations = Object.values(Location);

  return (
    <Box sx={{ width: 150 }}>
      <FormControl fullWidth>
        <InputLabel size="small">Lokacija</InputLabel>
        <Select
          size="small"
          label="Lokacija"
          defaultValue={defaultSelected}
          onChange={(e) => setLocation(e.target.value)}
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
