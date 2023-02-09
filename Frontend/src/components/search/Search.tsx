import { Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SearchParams } from '../../interfaces/SearchParams.interface';
import { ChangeEventHandler, Dispatch, SetStateAction } from 'react';

interface Props {
  setSearchParams: Dispatch<SetStateAction<SearchParams>>;
}

function Search({ setSearchParams }: Props) {
  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    let value = e.target.value;
    if (value && value.length < 3) {
      value = '';
    }

    setSearchParams((state) => {
      return { ...state, q: value };
    });
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: 350 }}>
      <SearchIcon color="primary" fontSize="large" sx={{ mt: 2.5, mr: 1 }} />
      <TextField
        label="Pretraga"
        variant="standard"
        fullWidth
        onChange={onChangeHandler}
      />
    </Box>
  );
}

export default Search;
