import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { Category } from '../../enums/Category.enum';
interface SelectCategoryProps {
  defaultSelected?: string;
  setCategory: Dispatch<SetStateAction<string>>;
}

function SelectCategory({
  defaultSelected = '',
  setCategory,
}: SelectCategoryProps) {
  const categories = Object.values(Category);

  return (
    <Box sx={{ width: 200 }}>
      <FormControl fullWidth>
        <InputLabel size="small">Kategorija</InputLabel>
        <Select
          size="small"
          label="Kategorija"
          defaultValue={defaultSelected}
          onChange={(e) => setCategory(e.target.value)}
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
