import { Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Search() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: 350 }}>
      <SearchIcon color="primary" fontSize="large" sx={{ mt: 2.5, mr: 1 }} />
      <TextField label="Pretraga" variant="standard" fullWidth />
    </Box>
  );
}

export default Search;
