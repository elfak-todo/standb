import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { SortBy } from '../../enums/SortBy.enum';
import { SearchParams } from '../../interfaces/SearchParams.interface';

interface Props {
  setSearchParams: Dispatch<SetStateAction<SearchParams>>;
}

function SelectPriceOrder({ setSearchParams }: Props) {
  const onChangeHandler = (e: SelectChangeEvent<SortBy>) => {
    setSearchParams((state) => {
      return { ...state, sortBy: Number(e.target.value) };
    });
  };

  return (
    <Box sx={{ width: 180 }}>
      <FormControl fullWidth>
        <InputLabel size="small">Cena</InputLabel>
        <Select
          size="small"
          label="Cena"
          defaultValue={SortBy.Default}
          onChange={onChangeHandler}
        >
          <MenuItem value={SortBy.Default}>Podrazumenvano</MenuItem>
          <MenuItem value={SortBy.PriceAscending}>Cene rastuće</MenuItem>
          <MenuItem value={SortBy.PriceDescending}>Cene opadajuće</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectPriceOrder;
