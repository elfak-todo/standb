import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function SelectLocation() {
  return (
    <Box sx={{ width: 150 }}>
      <FormControl fullWidth>
        <InputLabel size="small">Lokacija</InputLabel>
        <Select size="small" label="Lokacija" defaultValue={''}>
          <MenuItem value={0}>Niš</MenuItem>
          <MenuItem value={1}>Beograd</MenuItem>
          <MenuItem value={2}>Novi Sad</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectLocation;
