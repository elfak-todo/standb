import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function SelectPriceOrder() {
  return (
    <Box sx={{ width: 180 }}>
      <FormControl fullWidth>
        <InputLabel size="small">Cena</InputLabel>
        <Select size="small" label="Cena" defaultValue={''}>
          <MenuItem value={0}>Cene rastuće</MenuItem>
          <MenuItem value={1}>Cene opadajuće</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectPriceOrder;
