import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { Category } from '../../enums/Category.enum';
import { SearchParams } from '../../interfaces/SearchParams.interface';

interface Props {
  searchParams: SearchParams;
  setSearchParams: Dispatch<SetStateAction<SearchParams>>;
}

function SelectCategory({ searchParams, setSearchParams }: Props) {
  const categories = Object.values(Category);

  const onChangeHandler = (e: SelectChangeEvent<Category>) => {
    setSearchParams((state) => {
      return { ...state, cat: e.target.value as Category };
    });
  };

  return (
    <Box sx={{ width: 200 }}>
      <FormControl fullWidth>
        <InputLabel size="small">Kategorija</InputLabel>
        <Select
          size="small"
          label="Kategorija"
          value={searchParams.cat ?? ''}
          onChange={onChangeHandler}
        >
          {categories.map((cat, i) => (
            <MenuItem key={i} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectCategory;
