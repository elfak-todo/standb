import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function SelectCategory() {
  return (
    <Box sx={{ width: 180 }}>
      <FormControl fullWidth>
        <InputLabel size="small">Kategorija</InputLabel>
        <Select size="small" label="Kategorija" defaultValue={''}>
          <MenuItem value={0}>Garsonjera</MenuItem>
          <MenuItem value={1}>Jednosoban stan</MenuItem>
          <MenuItem value={2}>Jednoiposoban stan</MenuItem>
          <MenuItem value={3}>Dvosoban stan</MenuItem>
          <MenuItem value={4}>Dvoiposoban stan</MenuItem>
          <MenuItem value={5}>Trosoban stan</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectCategory;
